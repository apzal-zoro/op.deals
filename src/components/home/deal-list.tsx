import type { Deal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DealListItem } from './deal-list-item';
import Link from 'next/link';
import { Button } from '../ui/button';

export function DealList({ title, deals, seeAllLink = '#' }: { title: string, deals: Deal[], seeAllLink?: string }) {
    return (
        <Card className="rounded-lg bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                <CardTitle className="text-lg">{title}</CardTitle>
                <Button asChild variant="link" className="text-xs text-muted-foreground pr-0">
                    <Link href={seeAllLink}>See all &gt;</Link>
                </Button>
            </CardHeader>
            <CardContent className="p-2 pt-0">
                <div className="space-y-1">
                    {deals.map(deal => (
                         <DealListItem key={deal.id} deal={deal} storeLogoHint={deal.storeName.toLowerCase()} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
