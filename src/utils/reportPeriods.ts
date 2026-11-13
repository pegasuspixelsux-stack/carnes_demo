import { dayKey } from './orders';

export type PeriodKind = 'day' | 'week' | 'month' | 'year';

export const periodLabels: Record<PeriodKind, string> = {
  day: 'Día',
  week: 'Semana',
  month: 'Mes',
  year: 'Año',
};

/** Parses a local YYYY-MM-DD date (never as UTC, so the day does not shift). */
export function parseDay(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export interface Period {
  /** Inclusive start, local midnight. */
  start: number;
  /** Exclusive end, local midnight. */
  end: number;
  /** Human label, e.g. "Semana del 3 al 9 de noviembre de 2026". */
  label: string;
}

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString('es-UY', opts);

/** The day / week (Monday to Sunday) / month / year that contains `ref`. */
export function periodOf(kind: PeriodKind, ref: string): Period {
  const d = parseDay(ref);
  if (kind === 'day') {
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    return { start: d.getTime(), end: end.getTime(), label: fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) };
  }
  if (kind === 'week') {
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    const last = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1);
    return {
      start: start.getTime(),
      end: end.getTime(),
      label: `Semana del ${fmt(start, { day: 'numeric', month: 'long' })} al ${fmt(last, { day: 'numeric', month: 'long', year: 'numeric' })}`,
    };
  }
  if (kind === 'month') {
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    return { start: start.getTime(), end: end.getTime(), label: fmt(start, { month: 'long', year: 'numeric' }) };
  }
  const start = new Date(d.getFullYear(), 0, 1);
  const end = new Date(d.getFullYear() + 1, 0, 1);
  return { start: start.getTime(), end: end.getTime(), label: String(d.getFullYear()) };
}

/** The date inside the previous (-1) or next (+1) period. */
export function shiftRef(kind: PeriodKind, ref: string, dir: 1 | -1): string {
  const d = parseDay(ref);
  const next =
    kind === 'day'
      ? new Date(d.getFullYear(), d.getMonth(), d.getDate() + dir)
      : kind === 'week'
        ? new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7 * dir)
        : kind === 'month'
          ? new Date(d.getFullYear(), d.getMonth() + dir, 1)
          : new Date(d.getFullYear() + dir, 0, 1);
  return dayKey(next.getTime());
}

export interface Bucket {
  key: string;
  label: string;
}

/** The rows of the breakdown: one per day for a week or month, one per month for a year (none for a single day). */
export function bucketsOf(kind: PeriodKind, period: Period): Bucket[] {
  const out: Bucket[] = [];
  if (kind === 'week' || kind === 'month') {
    for (let t = new Date(period.start); t.getTime() < period.end; t = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)) {
      out.push({ key: dayKey(t.getTime()), label: fmt(t, { weekday: 'short', day: 'numeric', month: 'short' }) });
    }
  } else if (kind === 'year') {
    for (let m = 0; m < 12; m++) {
      const t = new Date(new Date(period.start).getFullYear(), m, 1);
      out.push({ key: dayKey(t.getTime()).slice(0, 7), label: fmt(t, { month: 'long' }) });
    }
  }
  return out;
}

/** Which bucket a timestamp belongs to. */
export const bucketKeyOf = (kind: PeriodKind, ms: number) => (kind === 'year' ? dayKey(ms).slice(0, 7) : dayKey(ms));
