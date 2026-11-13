/**
 * Puts items of the same category next to each other, keeping the incoming order inside each category
 * (so a price or name sort still applies within a section). Categories follow the order they first appear in.
 */
export function groupByCategory<T extends { type?: string | null }>(list: T[]): T[] {
  const order = new Map<string, number>();
  for (const p of list) {
    const key = p.type ?? '';
    if (!order.has(key)) order.set(key, order.size);
  }
  return list
    .map((p, i) => ({ p, i, g: order.get(p.type ?? '') ?? 0 }))
    .sort((a, b) => a.g - b.g || a.i - b.i)
    .map((x) => x.p);
}
