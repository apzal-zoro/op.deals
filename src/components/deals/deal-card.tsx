'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowBigUp, ArrowBigDown, MessageCircle, Flame, ShieldAlert } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Deal } from '@/lib/types';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function DealCard({ deal, boxArtHint, storeLogoHint }: { deal: Deal, boxArtHint: string, storeLogoHint: string }) {
  const [votes, setVotes] = useState(deal.votes);

  const handleVote = (e: React.MouseEvent, amount: number) => {
    e.preventDefault();
    e.stopPropagation();
    setVotes(v => v + amount);
  }

  return (
    <Link href={`/games/${deal.id}`} passHref className="h-full block">
      <Card className="flex flex-col overflow-hidden pixel-corners bg-card/80 backdrop-blur-sm h-full transition-all hover:shadow-glow-primary">
        <CardHeader className="relative p-0">
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 z-10 pixel-corners-sm text-sm font-headline"
          >
            -{deal.discount}%
          </Badge>
          {deal.isHistoricLow && (
               <Badge
                  variant="default"
                  className="absolute top-2 left-2 z-10 pixel-corners-sm text-sm font-headline bg-primary/90 flex items-center gap-1 animate-pulse"
               >
                  <Flame className="h-4 w-4" />
                  HISTORIC LOW
              </Badge>
          )}
          <Image
            src={deal.boxArtUrl}
            alt={deal.gameTitle}
            width={300}
            height={400}
            className="w-full object-cover aspect-[3/4] pixel-corners"
            data-ai-hint={boxArtHint}
          />
        </CardHeader>
        <CardContent className="flex-grow p-3 space-y-2">
          <CardTitle className="font-headline text-base leading-tight truncate">{deal.gameTitle}</CardTitle>
          <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-headline text-accent">₹{deal.priceINR}</p>
              <div className="flex items-center gap-2">
                {deal.isKeyshop && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1 text-xs text-destructive cursor-help">
                          <ShieldAlert className="h-4 w-4" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs pixel-corners-sm">
                        <p className="font-sans text-sm">Risk: {deal.keyshopRiskLevel}/5. Keyshops aren't official distributors. Purchase at your own risk.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Image 
                    src={deal.storeLogoUrl} 
                    alt={deal.storeName} 
                    width={80} 
                    height={32}
                    className="object-contain"
                    data-ai-hint={storeLogoHint}
                />
              </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 border-t mt-auto">
          <div className="flex w-full justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={(e) => handleVote(e, 1)} aria-label="Upvote">
                      <ArrowBigUp className="h-5 w-5" />
                  </Button>
                  <span className="font-headline text-base w-10 text-center">{votes}</span>
                  <Button variant="ghost" size="sm" onClick={(e) => handleVote(e, -1)} aria-label="Downvote">
                      <ArrowBigDown className="h-5 w-5" />
                  </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" aria-label="Comments" onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-headline text-base">{deal.comments}</span>
              </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
