'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { Deal } from '@/lib/types';
import { PopularGameCard } from './popular-game-card';
import Link from 'next/link';

const dataHints: { [key: string]: string } = {
    'Cyberpunk 2077': 'futuristic cityscape',
    'Baldur\'s Gate 3': 'fantasy rpg',
    'Elden Ring': 'dark fantasy',
    'Stardew Valley': 'pixel farm',
    'The Witcher 3': 'fantasy monster',
    'Hades': 'greek mythology',
};

export function MostPopular({ deals }: { deals: Deal[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl text-primary">Most Popular</h2>
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">See All &gt;</Link>
      </div>
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="-ml-4">
          {deals.map((deal) => (
            <CarouselItem key={deal.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
              <PopularGameCard deal={deal} hint={dataHints[deal.gameTitle] || 'video game'}/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
