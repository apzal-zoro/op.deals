'use client';
import { DealCard } from './deal-card';
import type { Deal } from '@/lib/types';
import { cn } from '@/lib/utils';

const dataHints: { [key: string]: string } = {
  'Cyberpunk 2077': 'futuristic cityscape',
  'Baldur\'s Gate 3': 'fantasy rpg',
  'Elden Ring': 'dark fantasy',
  'Stardew Valley': 'pixel farm',
  'The Witcher 3': 'fantasy monster',
  'Hades': 'greek mythology',
};

export function DealsGrid({ deals, className }: { deals: Deal[], className?: string }) {
  if (deals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-border pixel-corners">
        <p className="text-muted-foreground font-headline">No deals found!</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", className)}>
      {deals.map((deal) => (
        <DealCard 
            key={deal.id} 
            deal={deal} 
            boxArtHint={dataHints[deal.gameTitle] || 'video game'} 
            storeLogoHint={deal.storeName.toLowerCase()}
        />
      ))}
    </div>
  );
}
