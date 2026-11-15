'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { HomeProperty } from '@/src/lib/homeData';
import { typeLabels } from '@/src/utils/format';
import SiteFooter from '@/src/components/SiteFooter';
import InfoSections from '@/src/components/InfoSections';
import SimilarItems from '@/src/components/SimilarItems';
import FitText from '@/src/components/FitText';
import SearchModal from '@/src/components/SearchModal';
import { toBestSellers } from '@/src/utils/bestSellers';
import CartButton from '@/src/components/CartButton';
import WholesaleAccess from '@/src/components/WholesaleAccess';
import SiteNavLinks from '@/src/components/SiteNavLinks';
import MobileNavMenu from '@/src/components/MobileNavMenu';
import { useClient } from '@/src/context/ClientContext';
import { applyBoxFirst, applyLevel } from '@/src/utils/pricing';
import {
  ArrowUpRight,
  Search,
} from 'lucide-react';
import HomeAccessButton from '@/src/components/HomeAccessButton';
import BrandName from '@/src/components/BrandName';
import { useBusiness } from '@/src/context/BusinessContext';



// The built-in samples now come from the server (loadHomeData falls back to src/data/sampleProperties.ts).
const fallbackProperties: HomeProperty[] = [];


/** Hero subheading style. */
const HERO_TEXT_CLASS =
  'text-left mt-2 max-md:mt-1 md:mt-1.5 max-w-2xl max-md:w-full max-md:max-w-sm text-[17px] max-md:text-[15px] max-md:leading-[1.35] max-md:tracking-[-0.022em] md:text-base text-white/95 font-normal leading-relaxed';

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
  const { client, level } = useClient();
  const business = useBusiness();
  const router = useRouter();
  // Phone top nav: transparent over the hero, blurred and tinted once the page scrolls.
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
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
    <div className="min-h-screen bg-[#FBFBFD] max-md:bg-[#450a0a] text-[#1D1D1F] selection:bg-[#000000] selection:text-[#FFFFFF] font-sans antialiased">

      {/* --- PHONE TOP NAV: burger on the left; search and "add to home screen" on the right --- */}
      <header
        className={`md:hidden fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background-color] duration-300 ${
          scrolled ? 'bg-[color-mix(in_srgb,#b91c1c_72%,transparent)]' : 'bg-transparent'
        }`}
      >
        <div className="bg-[#b91c1c] text-white text-center text-[11px] font-medium tracking-wide py-1.5 px-4 leading-snug pt-[calc(0.375rem+env(safe-area-inset-top))]">
          <span>Entregas diarias en Maldonado y Punta del Este</span>
        </div>
        <div className="h-14 px-3 grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2">
          <MobileNavMenu bare align="left" />
          <div className="flex justify-center min-w-0">
            <HomeAccessButton onDark noModal />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Búsqueda avanzada"
            title="Búsqueda avanzada"
            className="w-10 h-10 shrink-0 flex items-center justify-center text-white drop-shadow hover:opacity-80 active:scale-90 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={closeSearch} categories={categories} initialQuery={query} />

      {/* --- NAVIGATION --- */}
      <header className="hidden md:block sticky top-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-md">
        <div className="bg-[#b91c1c] text-white text-center text-[11px] sm:text-xs font-medium tracking-wide py-1.5 px-4 sm:px-6 leading-snug">
          <span>Entregas diarias en Maldonado y Punta del Este</span>
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
        <section data-home-hero className="relative w-full h-screen h-[100svh] flex flex-col items-center justify-start max-md:rounded-none overflow-hidden rounded-3xl border-0 bg-[radial-gradient(circle_at_50%_40%,#ef4444_0%,#b91c1c_45%,#7f1d1d_100%)] text-white">
          {/* Bottom shade: deeper red toward the bottom edge */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#450a0a] to-transparent" />
          {/* Cut of meat below the heading, filling the lower half of the hero */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carne_clear.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(20%+max(12px,env(safe-area-inset-bottom)))] left-1/2 z-[1] h-[46%] w-auto max-w-[90%] -translate-x-1/2 object-contain drop-shadow-2xl"
          />
          {/* Desktop only: the logo on the right column, over the overlay */}
            {/* Phones: brand block, centered in the hero's flow (8pt spacing scale: 8 / 16 / 32) */}
            <div className="relative w-full h-1/2 justify-center px-5 md:px-10 max-md:pt-0 pt-[clamp(16px,4svh,32px)] max-md:pb-[max(12px,env(safe-area-inset-bottom))] pb-[max(clamp(16px,4svh,32px),env(safe-area-inset-bottom))] flex flex-col items-start text-left md:pt-9 md:pb-9 md:landscape:max-xl:pt-7 md:landscape:max-xl:pb-7 md:portrait:pt-7 md:portrait:pb-7">
            <span className="max-md:hidden block w-fit max-md:mt-0 md:inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
              {business.heroEyebrow || 'Distribución hortifrutícola B2B'}
            </span>
            <h1 className="mt-4 max-md:mt-0 text-left self-start font-semibold tracking-tight leading-[0.85]">
              <span className="block text-[clamp(52px,18vw,260px)] font-extrabold leading-[0.8] tracking-[-0.04em]">Mercado</span>
              <span className="block text-[clamp(52px,18vw,260px)] font-extrabold leading-[0.8] tracking-[-0.04em] mt-[0.1em]">de Carnes</span>
            </h1>
            {business.heroText ? (
              <p className={HERO_TEXT_CLASS}>{business.heroText}</p>
            ) : (
              <FitText as="p" className={HERO_TEXT_CLASS} min={11} max={20}>
                Abastecimiento directo para comercios y gastronomía.
              </FitText>
            )}
          </div>
        </section>
      </div>

      {/* --- BODY: search, category pills and the "Más vendidos" slider. The full catalog (12 per page) lives at /productos --- */}
      <section id="productos" className="scroll-mt-4 pt-[clamp(16px,3svh,24px)] md:pt-8 pb-8 md:pb-44 px-3 md:px-6 max-w-[1440px] mx-auto max-md:bg-white max-md:rounded-3xl max-md:mt-[clamp(8px,1.5svh,16px)] max-md:mb-2">

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
                id="home-search"
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
