import type { HomeProperty } from '@/src/lib/homeData';
import type { SimilarItem } from '@/src/components/SimilarItems';

/**
 * The "Más vendidos" slider items. Orders are private, so sales can't be counted in the browser:
 * it shows the items marked "destacado" in the dashboard (or the first ones if none is marked).
 */
export function toBestSellers(items: HomeProperty[], max = 10): SimilarItem[] {
  const featured = items.filter((p) => p.featured);
  return (featured.length ? featured : items).slice(0, max).map((p) => ({
    id: String(p.id),
    title: p.title,
    image: p.image,
    price: p.price,
    salePrice: p.salePrice,
    quantity: p.area,
    inStock: p.inStock !== false,
  }));
}
