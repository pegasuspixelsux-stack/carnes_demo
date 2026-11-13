'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEFAULT_LOGO } from '@/src/components/BrandName';
import { useBusiness } from '@/src/context/BusinessContext';

/** Cover: a full-screen hero with the headline and the two entry buttons (working name, to be renamed). */
export default function CoverPage() {
  const router = useRouter();
  const { logo } = useBusiness();
  // The homepage sections (Quiénes somos, FAQ, Contacto) live in the catalog for phones: send those links there.
  useEffect(() => {
    const go = () => {
      const h = window.location.hash;
      if (h === '#vision' || h === '#faq' || h === '#contact') router.replace(`/items${h}`);
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, [router]);
  return (
    <div className="min-h-svh md:min-h-0 bg-[#2E7D32] text-white font-sans antialiased flex flex-col">
      <main className="flex-1 md:flex-none md:h-[50vh] flex">
        <section className="relative flex-1 w-full max-w-[1440px] mx-auto flex items-end">
          <div className="absolute top-0 inset-x-0 h-1/2 flex flex-col items-center justify-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo || DEFAULT_LOGO} alt="" aria-hidden="true" className="h-72 w-72 md:h-60 md:w-60 object-contain drop-shadow-lg" />
            <p className="mt-2 text-5xl md:text-4xl font-semibold tracking-wide">FRESCO</p>
            <p className="text-sm md:text-xs tracking-widest text-white/80">Desde 1998</p>
          </div>
          <div className="relative w-full px-6 md:px-14 pt-12 pb-12 md:pt-8 md:pb-10">
            <span className="block w-fit mx-auto rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
              Distribución hortifrutícola B2B
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.08]">
              El distribuidor hortifrutícola para la gastronomía de Punta del Este.
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/items"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1D1D1F] px-7 py-3.5 text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all"
              >
                Acceso Mayorista
              </Link>
              <Link
                href="/items#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/70 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all"
              >
                Solicitar Acceso
              </Link>
            </div>
          </div>
          <Link
            href="/"
            className="absolute bottom-3 inset-x-0 text-center text-xs text-white/70 hover:text-white transition-colors"
          >
            Merkado v 2.0
          </Link>
        </section>
      </main>
    </div>
  );
}
