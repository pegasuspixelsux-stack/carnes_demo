'use client';

/** The Fresco logo (public/fresco_footer.png), used until another one is uploaded in Ajustes. */
export const DEFAULT_LOGO = '/fresco_footer.png';

/**
 * The Fresco logo for the top nav (it already includes the name and "Desde 1998", so no title next to it).
 * `onDark`: the nav sits on a dark photo on phones (item page), so phones get the white logo.
 * Inline content: put it inside the heading / link.
 */
export default function BrandName({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center align-middle">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/fresco_footer.png" alt="Fresco" className={`h-11 w-auto shrink-0 ${onDark ? 'max-md:hidden' : ''}`} />
      {onDark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/fresco_footer_white.png" alt="Fresco" className="md:hidden h-11 w-auto shrink-0" />
      )}
    </span>
  );
}
