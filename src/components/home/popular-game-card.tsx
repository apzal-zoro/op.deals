import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Deal } from '@/lib/types';
import { Badge } from '../ui/badge';
import { Flame, ShieldAlert } from 'lucide-react';
import { useSettings } from '@/contexts/settings-context';
import { getBestPriceDeal } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function PopularGameCard({ deal, hint }: { deal: Deal, hint: string }) {
  const { keyshopsEnabled } = useSettings();
  const bestPriceDeal = getBestPriceDeal(deal, keyshopsEnabled);

  return (
    <Link href={`/games/${deal.id}`} className="block group">
      <Card className="overflow-hidden rounded-lg bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
            <Image
              src={deal.boxArtUrl}
              alt={deal.gameTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={hint}
            />
             {deal.rank && <Badge className="absolute top-2 left-2 z-10 rounded-md bg-black/50 text-white border-none">#{deal.rank}</Badge>}
          </div>
          <div className="mt-2 space-y-1">
            <h3 className="text-sm font-headline truncate">{deal.gameTitle}</h3>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {bestPriceDeal.isKeyshop ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ShieldAlert className="w-4 h-4 text-destructive" />
                      </TooltipTrigger>
                      <TooltipContent>Keyshop</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="w-4 h-4" /> 
                )}
                {deal.isHistoricLow && (
                   <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Flame className="w-4 h-4 text-primary" />
                      </TooltipTrigger>
                      <TooltipContent>Historic Low</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="rounded-md">-{deal.discount}%</Badge>
                <p className="text-lg text-accent font-headline">₹{bestPriceDeal.priceINR}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
