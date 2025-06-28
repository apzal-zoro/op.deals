'use client';
import { useMemo, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { mockDeals, mockBanners } from '@/lib/data';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { MostPopular } from '@/components/home/most-popular';
import { DealList } from '@/components/home/deal-list';
import { useSettings } from '@/contexts/settings-context';
import type { Deal } from '@/lib/types';
import { getBestPriceDeal } from '@/lib/utils';
import { PlatformSelector } from '@/components/home/platform-selector';

export default function HomePage() {
  const { keyshopsEnabled } = useSettings();
  
  const allDeals = useMemo(() => {
    // This is where you would filter deals based on keyshopsEnabled if the API supported it.
    // For now, we pass the toggle to each component to decide which price to show.
    return mockDeals;
  }, []);

  const popularDeals = useMemo(() => {
    return [...allDeals].sort((a, b) => (a.rank || 99) - (b.rank || 99)).slice(0, 10);
  }, [allDeals]);

  const newDeals = useMemo(() => {
    return [...allDeals].sort((a, b) => new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime()).slice(0, 5);
  }, [allDeals]);

  const bestDeals = useMemo(() => {
    // 'Best' is subjective. Let's use votes for now.
    return [...allDeals].sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, 5);
  }, [allDeals]);

  const historicalLows = useMemo(() => {
    return allDeals.filter(deal => {
        const bestPrice = getBestPriceDeal(deal, keyshopsEnabled);
        return deal.isHistoricLow && bestPrice.priceINR === deal.priceINR;
    }).slice(0, 5);
  }, [allDeals, keyshopsEnabled]);

  const indieGems = useMemo(() => {
    return allDeals.filter(deal => deal.category === 'indie').slice(0, 5);
  }, [allDeals]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <HeroCarousel banners={mockBanners} />
        
        <PlatformSelector />
        
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
