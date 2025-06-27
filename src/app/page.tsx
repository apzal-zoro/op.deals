'use client';
import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { DealsGrid } from '@/components/deals/deals-grid';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockDeals, mockBanners } from '@/lib/data';
import { ShieldAlert } from 'lucide-react';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const [showKeyshops, setShowKeyshops] = useState(true);

  const allDeals = useMemo(() => {
    if (showKeyshops) {
      return mockDeals;
    }
    return mockDeals.filter((deal) => !deal.isKeyshop);
  }, [showKeyshops]);

  const indieDeals = useMemo(() => {
    return allDeals.filter(deal => deal.category === 'indie');
  }, [allDeals]);
  
  const bundleDeals = useMemo(() => {
    return allDeals.filter(deal => deal.category === 'bundle');
  }, [allDeals]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <HeroCarousel banners={mockBanners} />
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-headline text-primary">Game Deals</h2>
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

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="pixel-corners-sm">
              <TabsTrigger value="all" className="font-headline text-xs">All Deals</TabsTrigger>
              <TabsTrigger value="indie" className="font-headline text-xs">Indie Gems</TabsTrigger>
              <TabsTrigger value="bundles" className="font-headline text-xs">Bundles</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <DealsGrid deals={allDeals} />
            </TabsContent>
            <TabsContent value="indie" className="mt-4">
              <DealsGrid deals={indieDeals} />
            </TabsContent>
             <TabsContent value="bundles" className="mt-4">
              <DealsGrid deals={bundleDeals} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
