import Link from 'next/link';
import Image from 'next/image';
import type { Deal } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Flame, ShieldAlert } from 'lucide-react';
import { useSettings } from '@/contexts/settings-context';
import { getBestPriceDeal } from '@/lib/utils';

export function DealListItem({ deal }: { deal: Deal }) {
    const { keyshopsEnabled } = useSettings();
    const bestPriceDeal = getBestPriceDeal(deal, keyshopsEnabled);
    const storeLogoHint = bestPriceDeal.storeName.toLowerCase();

    return (
        <Link href={`/games/${deal.id}`} className="block p-2 rounded-md hover:bg-card">
            <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                    <Image
                        src={deal.boxArtUrl}
                        alt={deal.gameTitle}
                        width={100}
                        height={56}
                        className="object-cover aspect-video rounded-md"
                        data-ai-hint="gameplay screenshot"
                    />
                </div>
                <div className="flex-grow overflow-hidden">
                    <h4 className="text-sm truncate font-body">{deal.gameTitle}</h4>
                    <div className="flex items-center gap-2 mt-1">
                         <Image 
                            src={bestPriceDeal.storeLogoUrl} 
                            alt={bestPriceDeal.storeName} 
                            width={16} 
                            height={16}
                            className="object-contain h-4 w-auto"
                            data-ai-hint={storeLogoHint}
                        />
                        {deal.isHistoricLow && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Flame className="h-4 w-4 text-primary" />
                                    </TooltipTrigger>
                                    <TooltipContent>Historic Low</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                         {bestPriceDeal.isKeyshop && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ShieldAlert className="h-4 w-4 text-destructive" />
                                    </TooltipTrigger>
                                    <TooltipContent>Keyshop</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>
                <div className="shrink-0 text-right flex flex-col items-end">
                    <Badge variant="destructive" className="rounded-sm mb-1">-{deal.discount}%</Badge>
                    <p className="text-base text-accent font-headline">₹{bestPriceDeal.priceINR}</p>
                </div>
            </div>
        </Link>
    );
}
