import type { Viewport } from 'next';
import HomeSwitch from '@/src/components/HomeSwitch';
import { loadHomeData } from '@/src/lib/homeData';

// Rebuilt at most once a minute, so new or featured listings appear quickly
// without a database request for every visitor.
export const revalidate = 60;

// Mobile homepage hero is white at the top, so the Safari/Chrome toolbar matches.
export const viewport: Viewport = { themeColor: '#ffffff' };

export default async function Page() {
  const { properties } = await loadHomeData();
  return <HomeSwitch initialProperties={properties} />;
}
