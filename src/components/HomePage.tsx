'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { HomeProperty } from '@/src/lib/homeData';
import { typeLabels } from '@/src/utils/format';
import SiteFooter from '@/src/components/SiteFooter';
import InfoSections from '@/src/components/InfoSections';
import SimilarItems from '@/src/components/SimilarItems';
import FitText from '@/src/components/FitText';
import { toBestSellers } from '@/src/utils/bestSellers';
import CartButton from '@/src/components/CartButton';
import { OPEN_CLIENT_LOGIN } from '@/src/components/SignInNotice';
import WholesaleAccess from '@/src/components/WholesaleAccess';
import SiteNavLinks from '@/src/components/SiteNavLinks';
import MobileNavMenu from '@/src/components/MobileNavMenu';
import { useClient } from '@/src/context/ClientContext';
import { applyBoxFirst, applyLevel } from '@/src/utils/pricing';
import {
  ArrowUpRight,
  KeyRound,
  Search,
  LogOut,
  Heart,
} from 'lucide-react';
import BrandName from '@/src/components/BrandName';
import { useBusiness } from '@/src/context/BusinessContext';

/** Greeting for the hour of the day on the visitor's device. */
const greeting = () => {
  const h = new Date().getHours();
  return h >= 6 && h < 12 ? 'Buenos días' : h >= 12 && h < 20 ? 'Buenas tardes' : 'Buenas noches';
};



const fallbackProperties: HomeProperty[] = [
  {
    id: 1,
    title: "Tomates perita",
    location: "Canelones, UY",
    price: "US$ 4,50 / lb",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Orgánico", "Cajón 12 lb", "Calidad A"],
    type: 'vegetable',
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Sandía sin semillas",
    location: "Salto, UY",
    price: "US$ 6,90 c/u",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Sin transgénicos", "18 lb c/u", "Calidad A"],
    type: 'fruit',
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mangos Ataulfo",
    location: "Rivera, UY",
    price: "US$ 18,00 / cajón",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Orgánico", "Cajón 10 lb", "Calidad A"],
    type: 'tropical',
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Ananás dorados",
    location: "Rivera, UY",
    price: "US$ 3,80 c/u",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Convencional", "4 lb c/u", "Calidad A"],
    type: 'tropical',
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Papas blancas",
    location: "San José, UY",
    price: "US$ 0,85 / lb",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Convencional", "Bolsa 50 lb", "Calidad B"],
    type: 'vegetable',
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Mandarinas clementinas",
    location: "Salto, UY",
    price: "US$ 2,20 / lb",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Orgánico", "Caja 5 lb", "Calidad A"],
    type: 'fruit',
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Mix de verduras de huerta",
    location: "Montevideo, UY",
    price: "US$ 32,00 / caja",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Orgánico", "Caja 20 lb", "Calidad A"],
    type: 'vegetable',
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Mix de frutos rojos y cítricos",
    location: "Paysandú, UY",
    price: "US$ 21,00 / caja",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Sin transgénicos", "Caja 8 lb", "Calidad A"],
    type: 'fruit',
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Hojas verdes para ensalada",
    location: "Canelones, UY",
    price: "US$ 3,20 / lb",
    beds: 0,
    baths: 0,
    area: "",
    stats: ["Orgánico", "Cajón 10 lb", "Calidad A"],
    type: 'leafy',
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
  },
];


/** Hero heading / subheading styles: on phones both are as wide as the buttons (max-w-sm). */
const HERO_HEADING_CLASS =
  'mt-4 max-md:mt-0 max-w-6xl max-md:text-center max-md:w-full max-md:max-w-sm max-md:text-[clamp(18px,calc((100vw-40px)/10.5),36px)] max-md:leading-[1.1] sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.1]';
const HERO_TEXT_CLASS =
  'mt-4 max-md:mt-1.5 md:mt-3 max-w-2xl max-md:w-full max-md:max-w-sm max-md:text-center text-[17px] max-md:text-[15px] max-md:leading-[1.35] max-md:tracking-[-0.022em] md:text-base text-white/95 font-normal leading-relaxed';

export default function FrescoHome({
  initialProperties = [],
}: {
  /** Active properties loaded on the server; the built-in samples show if there are none. */
  initialProperties?: HomeProperty[];
}) {
  // The built-in samples open /productos/sample-N, which the item page fills from the same sample data.
  const [baseProperties] = useState<HomeProperty[]>(
    initialProperties.length
      ? initialProperties
      : fallbackProperties.map((p) => ({ ...p, href: `/productos/sample-${p.id}` })),
  );
  // A customer who logged in with Acceso mayoristas sees their price level; everyone else sees list prices.
  const { client, level, signOutClient, favorites } = useClient();
  const business = useBusiness();
  const router = useRouter();
  const allowLoose = client?.allowLoose ?? false;
  const properties = useMemo(() => applyBoxFirst(applyLevel(baseProperties, level), level, allowLoose), [baseProperties, level, allowLoose]);
  const [query, setQuery] = useState('');
  // Pills: one per category that has items, in the order they first appear.
  const categories = Array.from(
    new Map(
      properties
        .filter((p) => p.type)
        .map((p) => [p.type as string, p.typeLabel ?? typeLabels[p.type as string] ?? (p.type as string)]),
    ),
    ([id, label]) => ({ id, label }),
  );

  // "Más vendidos": the items marked destacado in the dashboard (or the first ones).
  const bestSellers = useMemo(() => toBestSellers(properties), [properties]);

  return (
    <div className="min-h-screen bg-[#FBFBFD] max-md:bg-[var(--brand-bg,#2E7D32)] text-[#1D1D1F] selection:bg-[#000000] selection:text-[#FFFFFF] font-sans antialiased">

      {/* --- NAVIGATION --- */}
      <header className="hidden md:block sticky top-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-md">
        <div className="bg-[#2E7D32] text-white text-center text-[11px] sm:text-xs font-medium tracking-wide py-1.5 px-4 sm:px-6 leading-snug">
          <span className="md:hidden">Precios de mercado válidos por el día</span>
          <span className="hidden md:inline lg:hidden">Precios de mercado válidos por el día. Pueden cambiar en pedidos para el día siguiente.</span>
          <span className="hidden lg:inline">Precios de mercado válidos por el día. Si el pedido es para otro día, pueden cambiar: te lo confirmamos con precios ajustados antes del envío.</span>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-sm min-[420px]:text-base sm:text-lg tracking-tight"><BrandName /></span>
          <SiteNavLinks />
          <div className="flex items-center gap-1">
          <WholesaleAccess />
          <CartButton />
          <MobileNavMenu />
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-0 md:px-6 pt-0 md:pt-4">
        <section data-home-hero className="relative w-full max-md:h-[calc(50svh-clamp(8px,1.5svh,16px))] max-md:flex max-md:flex-col max-md:justify-start max-md:rounded-none overflow-hidden rounded-3xl border max-md:border-0 border-[var(--brand-bg,#2E7D32)] bg-[var(--brand-bg,#2E7D32)] text-white md:flex md:items-center md:portrait:h-[38.5svh] md:portrait:min-h-[360px] lg:landscape:block">
          {/* Background photo + green overlay: phones get one flat, fully opaque green layer; wider screens get a gradient, solid on the left (behind the text) and more transparent to the right */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center hidden md:block"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2000&auto=format&fit=crop)',
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center md:hidden" style={{ backgroundImage: 'url(/hero-mobile-2.webp)' }} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--brand-bg,#2E7D32)] md:bg-transparent md:bg-gradient-to-r md:from-[var(--brand-bg,#2E7D32)] md:from-[55%] md:via-[color-mix(in_srgb,var(--brand-bg,#2E7D32)_55%,transparent)] md:via-[80%] md:to-transparent"
          />
          {/* Desktop only: the logo on the right column, over the overlay */}
          <div aria-hidden="true" className="hidden xl:flex absolute inset-y-0 right-[calc(2.5rem+5%)] w-[16%] min-[1400px]:w-[20.8%] items-center justify-center pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fresco_footer_white.png" alt="" className="w-full max-h-[100%] object-contain drop-shadow-lg" />
          </div>
            {/* Phones: brand block, centered in the hero's flow (8pt spacing scale: 8 / 16 / 32) */}
            <div className="md:hidden relative flex flex-1 min-h-0 items-center justify-center px-5 pt-[env(safe-area-inset-top)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fresco_footer_white.png" alt="" aria-hidden="true" className="h-[40%] w-auto max-w-full object-contain drop-shadow-lg" />
          </div>
            <div className="relative w-full max-md:shrink-0 px-5 md:px-10 max-md:pt-0 pt-[clamp(16px,4svh,32px)] max-md:pb-[max(12px,env(safe-area-inset-bottom))] pb-[max(clamp(16px,4svh,32px),env(safe-area-inset-bottom))] max-md:flex max-md:flex-col max-md:items-center max-md:text-center md:pt-9 md:pb-9 md:landscape:max-xl:pt-7 md:landscape:max-xl:pb-7 md:portrait:pt-7 md:portrait:pb-7">
            <span className="max-md:hidden block w-fit max-md:mt-0 md:inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
              {business.heroEyebrow || 'Distribución hortifrutícola B2B'}
            </span>
            {business.heroHeading ? (
              <h1 className={HERO_HEADING_CLASS}>{business.heroHeading}</h1>
            ) : (
              // Phones: each line is scaled to be exactly as wide as the buttons below.
              <FitText as="h1" className={HERO_HEADING_CLASS} min={16} max={40}>
                <span className="block">Distribución Mayorista</span>
                <span className="block">de Frutas y Verduras</span>
              </FitText>
            )}
            {business.heroText ? (
              <p className={HERO_TEXT_CLASS}>{business.heroText}</p>
            ) : (
              <FitText as="p" className={HERO_TEXT_CLASS} min={11} max={20}>
                Abastecimiento directo para comercios y gastronomía.
              </FitText>
            )}
            <div className="mt-[clamp(16px,4svh,32px)] max-md:mt-3 md:mt-6 flex flex-col sm:flex-row gap-3 max-md:gap-2 md:gap-2.5 max-md:w-full max-md:max-w-sm">
              {client && level ? (
                <div className="flex flex-col sm:flex-row gap-3 md:gap-2.5 max-md:w-full">
                  <Link
                    href="/productos"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1D1D1F] max-md:bg-black max-md:text-white px-6 py-2.5 max-md:min-h-11 text-sm max-md:text-base max-md:tracking-[-0.022em] font-semibold hover:bg-white/90 max-md:hover:bg-black/85 active:scale-95 transition-all"
                  >
                    <span className="truncate max-w-56">Catálogo · {client.businessName}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={signOutClient}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 max-md:border-[var(--brand-bg,#2E7D32)] max-md:bg-transparent max-md:text-[var(--brand-bg,#2E7D32)] px-6 py-2.5 max-md:min-h-11 text-sm max-md:text-base max-md:tracking-[-0.022em] font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
              <Link
                href="/productos"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent(OPEN_CLIENT_LOGIN, { detail: { redirect: '/productos' } }));
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1D1D1F] max-md:bg-black max-md:text-white px-6 py-2.5 max-md:min-h-11 text-sm max-md:text-base max-md:tracking-[-0.022em] font-semibold hover:bg-white/90 max-md:hover:bg-black/85 active:scale-95 transition-all"
              >
                <span>Acceso al Catálogo Mayorista</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              )}
              {!(client && level) && (
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 max-md:border-[#1D1D1F]/15 max-md:bg-white max-md:text-[#1D1D1F] max-md:shadow-sm px-6 py-2.5 max-md:min-h-11 text-sm max-md:text-base max-md:tracking-[-0.022em] font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Solicitar acceso mayorista</span>
              </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* --- BODY: search, category pills and the "Más vendidos" slider. The full catalog (12 per page) lives at /productos --- */}
      <section id="properties" className="scroll-mt-4 pt-[clamp(16px,3svh,24px)] md:pt-8 pb-8 md:pb-44 px-3 md:px-6 max-w-[1440px] mx-auto max-md:bg-white max-md:rounded-3xl max-md:mt-[clamp(8px,1.5svh,16px)]">

        {/* Phones: the catalog is this page. Signed in: a greeting with a log-out arrow; signed out: nothing (login is in the hero buttons) */}
        <div className={`md:hidden ${client && level ? 'flex' : 'hidden'} flex-col items-center gap-2 mb-[clamp(16px,2.5svh,24px)] text-center`}>
          {client && level ? (
            <>
              <p className="text-[clamp(24px,7.5vw,28px)] font-semibold tracking-[-0.02em] leading-[1.15] text-[#1D1D1F] text-balance">
                {greeting()}, {(client.contactName || client.businessName).split(' ')[0]}
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/favoritos"
                  className="h-9 px-4 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-sm font-medium inline-flex items-center gap-2 hover:bg-[#E8E8ED] active:scale-95 transition"
                >
                  <Heart className="w-4 h-4" />
                  Favoritos
                  {favorites.length > 0 && (
                    <span className="min-w-4 h-4 px-1 rounded-full bg-[#2E7D32] text-white text-[10px] font-semibold flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={signOutClient}
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                  className="w-9 h-9 shrink-0 rounded-full bg-[#F5F5F7] text-[#1D1D1F] flex items-center justify-center hover:bg-[#E8E8ED] active:scale-95 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : null}
        </div>
        <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = query.trim();
              router.push(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos');
            }}
            className="w-full md:w-3/4 mx-auto mb-5 md:mb-8 bg-white rounded-2xl shadow-lg border border-[#000000]/5 p-3 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 pl-3">
              <Search className="hidden md:block w-5 h-5 text-[#515154] shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscá por nombre, categoría o precio…"
                aria-label="Buscar productos por nombre, categoría o precio"
                className="min-w-0 flex-1 bg-transparent px-2 md:px-4 py-3 text-base md:text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="shrink-0 bg-[#2E7D32] text-white text-xs font-medium w-11 h-11 md:w-auto md:h-auto md:px-6 md:py-3 rounded-full hover:bg-[#2E7D32]/85 transition-all flex items-center justify-center"
              >
                <Search className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">Buscar</span>
              </button>
            </div>
          </form>
        {/* Category pills: each one opens the catalog already filtered */}
        {categories.length > 0 && (
          <div
            role="group"
            aria-label="Categorías"
            className="flex flex-nowrap items-center gap-2 overflow-x-auto -ml-3 pl-3 md:mx-0 md:pl-0 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[{ id: 'all', label: 'Todas' }, ...categories].map((c) => (
              <Link
                key={c.id}
                href={c.id === 'all' ? '/productos' : `/productos?category=${encodeURIComponent(c.id)}`}
                className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 max-md:min-h-10 inline-flex items-center text-xs max-md:text-[15px] font-medium bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] active:scale-95 transition"
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}

        <SimilarItems title="Más vendidos" items={bestSellers} embedded />

        <div className="mt-8 flex justify-center">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E7D32] text-white px-8 py-3 max-md:min-h-12 text-sm max-md:text-base font-semibold hover:bg-[#2E7D32]/85 active:scale-95 transition-all"
          >
            Ver todo el catálogo <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <InfoSections />

      <SiteFooter />

    </div>
  );
}
