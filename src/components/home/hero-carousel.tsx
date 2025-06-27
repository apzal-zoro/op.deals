'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { BannerDeal } from '@/lib/types';
import { Button } from '../ui/button';

export function HeroCarousel({ banners }: { banners: BannerDeal[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Link href={banner.link} passHref>
              <div className="relative aspect-[16/6] w-full overflow-hidden pixel-corners">
                <Image
                  src={banner.imageUrl}
                  alt={banner.gameTitle}
                  fill
                  className="object-cover"
                  data-ai-hint={`game banner ${banner.gameTitle}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-center items-start text-white">
                    <h2 className="text-3xl lg:text-5xl font-headline text-primary drop-shadow-lg">{banner.gameTitle}</h2>
                    <p className="mt-2 text-base lg:text-lg max-w-md drop-shadow-md">{banner.tagline}</p>
                    <Button className="mt-4 font-headline pixel-corners-sm">View Deal</Button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
