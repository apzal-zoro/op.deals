'use client';
import { useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { mockDeals, mockBanners } from '@/lib/data';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { MostPopular } from '@/components/home/most-popular';
import { DealList } from '@/components/home/deal-list';

export default function HomePage() {
  const allDeals = useMemo(() => mockDeals, []);

  const popularDeals = useMemo(() => {
    return [...allDeals].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 10);
  }, [allDeals]);

  const newDeals = useMemo(() => {
    return [...allDeals].sort((a, b) => new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime()).slice(0, 5);
  }, [allDeals]);

  const bestDeals = useMemo(() => {
    // 'Best' is subjective. Let's use votes for now.
    return [...allDeals].sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, 5);
  }, [allDeals]);

  const historicalLows = useMemo(() => {
    return allDeals.filter(deal => deal.isHistoricLow).slice(0, 5);
  }, [allDeals]);

  const indieGems = useMemo(() => {
    return allDeals.filter(deal => deal.category === 'indie').slice(0, 5);
  }, [allDeals]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <HeroCarousel banners={mockBanners} />
        
        <MostPopular deals={popularDeals} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DealList title="New Deals" deals={newDeals} />
            <DealList title="Best Deals" deals={bestDeals} />
            <DealList title="Historical Lows" deals={historicalLows} />
            <DealList title="Indie Gems" deals={indieGems} />
        </div>
      </div>
    </MainLayout>
  );
}
