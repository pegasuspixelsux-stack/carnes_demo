'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, House, LayoutGrid, ShoppingCart } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';

/**
 * Bottom navigation for the installed app (home-screen icon). In a browser the browser's own toolbar does this job,
 * but an installed web app has no browser bar, so this one appears only on phones in standalone mode
 * (the CSS in globals.css decides: `.app-bottom-nav`). It is on every page, including the dashboard.
 */
export default function BottomNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();

  const item = (active: boolean) =>
    `relative flex flex-1 flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-medium transition-colors active:scale-95 ${
      active ? 'text-[#2E7D32]' : 'text-[#515154]'
    }`;

  return (
    <nav aria-label="Navegación de la app" className="app-bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-[#000000]/10 bg-white/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <Link href="/" className={item(pathname === '/')} aria-current={pathname === '/' ? 'page' : undefined}>
        <House className="w-6 h-6" aria-hidden="true" />
        Inicio
      </Link>
      <Link href="/productos" className={item(pathname.startsWith('/productos'))} aria-current={pathname.startsWith('/productos') ? 'page' : undefined}>
        <LayoutGrid className="w-6 h-6" aria-hidden="true" />
        Catálogo
      </Link>
      <Link href="/favoritos" className={item(pathname.startsWith('/favoritos'))} aria-current={pathname.startsWith('/favoritos') ? 'page' : undefined}>
        <Heart className="w-6 h-6" aria-hidden="true" />
        Favoritos
      </Link>
      <button type="button" onClick={() => setOpen(true)} className={item(false)} aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`}>
        <span className="relative">
          <ShoppingCart className="w-6 h-6" aria-hidden="true" />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-[#2E7D32] text-white text-[10px] font-semibold flex items-center justify-center">
              {count}
            </span>
          )}
        </span>
        Carrito
      </button>
    </nav>
  );
}
