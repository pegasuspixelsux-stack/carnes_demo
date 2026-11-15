import type { HomeProperty } from '@/src/lib/homeData';
import type { SimilarItem } from '@/src/components/SimilarItems';

/**
 * The "Más vendidos" slider items. Orders are private, so sales can't be counted in the browser:
 * it shows the items marked "destacado" in the dashboard (or the first ones if none is marked).
 * Meat products (the four meat categories) come first; other items only fill what is left.
 */
const MEAT = new Set(['cortes-parrilla-alta-gama', 'cortes-asadores-versatiles', 'cortes-cocina-rotiseria', 'achuras-complementos']);

export function toBestSellers(items: HomeProperty[], max = 10): SimilarItem[] {
  const meat = items.filter((p) => p.type && MEAT.has(p.type));
  const pool = meat.length ? meat : items;
  const featured = pool.filter((p) => p.featured);
  return (featured.length ? featured : pool).slice(0, max).map((p) => ({
    id: String(p.id),
    title: p.title,
    image: p.image,
    price: p.price,
    salePrice: p.salePrice,
    quantity: p.area,
    inStock: p.inStock !== false,
  }));
}
