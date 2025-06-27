import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Deal } from '@/lib/types';
import { Badge } from '../ui/badge';

export function PopularGameCard({ deal, hint }: { deal: Deal, hint: string }) {
  return (
    <Link href={`/games/${deal.id}`} className="block group">
      <Card className="overflow-hidden rounded-lg bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src={deal.boxArtUrl}
              alt={deal.gameTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={hint}
            />
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-headline truncate">{deal.gameTitle}</h3>
            <div className="flex items-center justify-between text-xs mt-1">
              <Badge variant="destructive" className="rounded-md">-{deal.discount}%</Badge>
              <p className="text-lg text-accent font-headline">₹{deal.priceINR}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
