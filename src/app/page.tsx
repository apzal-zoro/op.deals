'use client';
import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { DealsGrid } from '@/components/deals/deals-grid';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockDeals } from '@/lib/data';
import { ShieldAlert } from 'lucide-react';

export default function HomePage() {
  const [showKeyshops, setShowKeyshops] = useState(true);

  const filteredDeals = useMemo(() => {
    if (showKeyshops) {
      return mockDeals;
    }
    return mockDeals.filter((deal) => !deal.isKeyshop);
  }, [showKeyshops]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-headline text-primary">Latest Game Deals</h1>
            <div className="flex items-center space-x-2">
                <Switch
                    id="keyshop-toggle"
                    checked={showKeyshops}
                    onCheckedChange={setShowKeyshops}
                    className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="keyshop-toggle" className="font-headline text-xs">Show Keyshops</Label>
            </div>
        </div>
        
        {showKeyshops && (
             <Alert variant="destructive" className="pixel-corners-sm bg-destructive/20 border-destructive/50 text-destructive-foreground">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle className="font-headline text-destructive">Warning!</AlertTitle>
                <AlertDescription className="text-xs">
                    Keyshops are not official distributors. Purchase at your own risk. Keys may be revoked.
                </AlertDescription>
            </Alert>
        )}

        <DealsGrid deals={filteredDeals} />
      </div>
    </MainLayout>
  );
}
