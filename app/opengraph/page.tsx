import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import SiteFooter from '@/src/components/SiteFooter';

// Link preview (WhatsApp, Facebook, LinkedIn): rendered on the server so the crawler, which does not run JavaScript, sees it.
// The image is 2400x1260 (the 1.91:1 size the previews use, kept well under WhatsApp's 600 KB limit) and its file name carries a
// version: WhatsApp caches previews hard, so a changed image needs a new file name (opengraph-flyer-v2.jpg ...).
const APP_TITLE = 'Tus clientes piden solos. Siempre con tu margen.';
const APP_DESCRIPTION =
  'Fresco, la app de pedidos para distribuidores de frutas y verduras: pedidos fáciles de procesar, precios por cliente y clientes que repiten en un clic.';
const APP_IMAGE = '/opengraph-flyer-v1.jpg';
const APP_IMAGE_ALT = 'Fresco, la app de pedidos para distribuidores de frutas y verduras: el catálogo en un celular';

export const metadata: Metadata = {
  title: 'Open Graph',
  description: APP_DESCRIPTION,
  alternates: { canonical: '/opengraph' },
  openGraph: {
    type: 'website',
    url: '/opengraph',
    siteName: 'Fresco',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [{ url: APP_IMAGE, width: 2400, height: 1260, alt: APP_IMAGE_ALT, type: 'image/jpeg' }],
  },
  twitter: { card: 'summary_large_image', title: APP_TITLE, description: APP_DESCRIPTION, images: [APP_IMAGE] },
};

// Short on purpose: the page is a flyer that is opened from WhatsApp on a phone and has to fit one screen.
const benefits = [
  'Pedidos fáciles de procesar',
  'Precios dinámicos, cambios en segundos',
  'Niveles de precio por cliente',
  'Protegé tu margen en cada venta',
  'Tus clientes repiten su pedido en un clic',
  'Fidelizá con favoritos y app propia',
];

/**
 * Open Graph page, used as a flyer (shared on WhatsApp): it sells the Fresco app to produce distributors.
 * A green full-screen (100vh) hero. Desktop: two columns, the pitch on the left and the catalog on a phone on the right.
 * Phone: one column, with the top of the catalog phone peeking in at the bottom so everything fits one screen.
 */
export default function OpenGraphPage() {
  return (
    <div className="bg-[var(--brand-bg,#2E7D32)] text-white font-sans antialiased">
      <main className="min-h-[100vh] min-h-[100svh] flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 pt-8 lg:py-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6 lg:gap-16 items-center">
          {/* Left column: logo, heading, support text, benefits */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fresco_footer_white.png" alt="Fresco, desde 1998" className="h-12 lg:h-16 w-auto drop-shadow-lg" />
            <h1 className="mt-4 lg:mt-6 text-[clamp(1.5rem,6.4vw,3rem)] font-semibold tracking-tight leading-[1.1]">
              <span className="block whitespace-nowrap">Tus clientes piden solos.</span>
              <span className="block whitespace-nowrap">Siempre con tu margen.</span>
            </h1>
            <p className="mt-3 lg:mt-4 text-lg lg:text-xl leading-snug text-white/90">
              <span className="block">La app de pedidos para</span>
              <span className="block">distribuidores de frutas y verduras.</span>
            </p>

            <ul className="mt-5 lg:mt-7 space-y-2.5 lg:space-y-3">
              {benefits.map((text) => (
                <li key={text} className="flex items-center gap-3 text-base lg:text-lg font-medium leading-snug">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: a screen of the catalog, on a phone (on a phone screen only its top shows, cut off at the bottom edge) */}
          <div className="flex justify-center lg:justify-end max-lg:h-[200px] max-lg:overflow-hidden">
            <div className="relative h-fit w-[240px] lg:w-[320px] rounded-[2.5rem] lg:rounded-[2.75rem] bg-[#0B1F10] p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/20">
              <div className="absolute left-1/2 top-4 z-10 h-5 w-20 lg:w-24 -translate-x-1/2 rounded-full bg-[#0B1F10]" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/catalog-screen.webp"
                alt="Pantalla del catálogo de Fresco: búsqueda, categorías y productos con precio"
                width={720}
                height={1440}
                className="block w-full h-auto rounded-[2rem] lg:rounded-[2.25rem]"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
