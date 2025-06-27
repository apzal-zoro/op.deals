'use client';
import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { DealsGrid } from '@/components/deals/deals-grid';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockDeals } from '@/lib/data';
import { ShieldAlert, Gem } from 'lucide-react';

export default function HomePage() {
  const [showKeyshops, setShowKeyshops] = useState(true);

  const filteredDeals = useMemo(() => {
    if (showKeyshops) {
      return mockDeals;
    }
    return mockDeals.filter((deal) => !deal.isKeyshop);
  }, [showKeyshops]);
  
  const indieDeals = useMemo(() => {
    return filteredDeals.filter(deal => deal.category === 'indie');
  }, [filteredDeals]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline text-primary">Welcome to Pixel Vault</h1>
            <p className="text-muted-foreground">Your one-stop destination for all your gaming needs.</p>
        </div>

        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-headline text-accent flex items-center gap-2">
                    <Gem className="h-5 w-5" />
                    Indie Game Gems
                </h2>
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

            <DealsGrid deals={indieDeals} />
        </div>

        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-headline text-primary">Latest Game Deals</h2>
            </div>
            <DealsGrid deals={filteredDeals} />
        </div>

      </div>
    </MainLayout>
  );
}
