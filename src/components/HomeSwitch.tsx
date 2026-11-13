'use client';

import HomePage from '@/src/components/HomePage';
import type { HomeProperty } from '@/src/lib/homeData';

/** The homepage is shown on every screen size (phones no longer open on the cover). */
export default function HomeSwitch({ initialProperties }: { initialProperties: HomeProperty[] }) {
  return <HomePage initialProperties={initialProperties} />;
}
