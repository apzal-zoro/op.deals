'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { mockDeals } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Wand2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { gamePageInsights, GamePageInsightsOutput } from '@/ai/flows';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data, in a real app this would come from user authentication
const mockUserLibrary = ['The Witcher 3'];
const mockUserWishlist = ["Baldur's Gate 3", 'Cyberpunk 2077'];

export default function GamePage({ params }: { params: { id: string } }) {
  const deal = useMemo(() => mockDeals.find((d) => d.id === params.id), [params.id]);
  
  const [insight, setInsight] = useState<GamePageInsightsOutput | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  if (!deal) {
    notFound();
  }

  const getInsight = async () => {
    setIsInsightLoading(true);
    setInsight(null);
    try {
        const result = await gamePageInsights({
            gameTitle: deal.gameTitle,
            currentPriceINR: deal.priceINR,
            isHistoricLow: !!deal.isHistoricLow,
            gameLibrary: mockUserLibrary,
            wishlist: mockUserWishlist,
            description: deal.description
        });
        setInsight(result);
    } catch (error) {
        console.error("Failed to get insight:", error);
    } finally {
        setIsInsightLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: `radial-gradient(ellipse at 70% 30%, hsla(var(--primary) / 0.1), transparent 50%), radial-gradient(ellipse at 30% 20%, hsla(var(--accent) / 0.1), transparent 50%), url(${deal.boxArtUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
  };

  const dataHints: { [key: string]: string } = {
    'Cyberpunk 2077': 'futuristic cityscape',
    'Baldur\'s Gate 3': 'fantasy rpg',
    'Elden Ring': 'dark fantasy',
    'Stardew Valley': 'pixel farm',
    'The Witcher 3': 'fantasy monster',
    'Hades': 'greek mythology',
  };
  const boxArtHint = dataHints[deal.gameTitle] || 'video game';
  const storeLogoHint = deal.storeName.toLowerCase();

  return (
    <>
      <div className="fixed inset-0 -z-10" style={backgroundStyle} />
      <div className="fixed inset-0 -z-10 bg-background/80 backdrop-blur-md" />
      <MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground">
          <div className="md:col-span-1">
            <Image
              src={deal.boxArtUrl}
              alt={deal.gameTitle}
              width={600}
              height={800}
              className="w-full object-cover aspect-[3/4] pixel-corners shadow-2xl shadow-black/50"
              data-ai-hint={boxArtHint}
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/70 backdrop-blur-sm pixel-corners">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h1 className="text-4xl font-headline text-primary">{deal.gameTitle}</h1>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="destructive" className="pixel-corners-sm font-headline text-lg">-{deal.discount}%</Badge>
                          {deal.isHistoricLow && (
                            <Badge variant="default" className="pixel-corners-sm text-lg font-headline bg-primary/90 flex items-center gap-1 animate-pulse">
                              <Flame className="h-5 w-5" /> HISTORIC LOW
                            </Badge>
                          )}
                        </div>
                    </div>
                     <Image 
                        src={deal.storeLogoUrl} 
                        alt={deal.storeName} 
                        width={120} 
                        height={48}
                        className="object-contain"
                        data-ai-hint={storeLogoHint}
                    />
                </div>
                
                <p className="text-base leading-relaxed">{deal.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                    <p className="text-5xl font-headline text-accent">₹{deal.priceINR}</p>
                    <Button size="lg" className="font-headline text-xl pixel-corners-sm w-full sm:w-auto hover:shadow-glow-primary">
                        <ShoppingCart className="mr-4 h-8 w-8"/>
                        Buy on {deal.storeName}
                    </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="pixel-corners bg-card/70 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                       <Wand2 className="text-primary"/> AI Assistant
                    </CardTitle>
                    <CardDescription>Get a personalized insight on this deal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Button onClick={getInsight} disabled={isInsightLoading} className="font-headline pixel-corners-sm">
                        {isInsightLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Get AI Insight
                    </Button>
                    {insight && (
                         <Alert className="pixel-corners-sm mt-4">
                            <AlertTitle className="font-headline text-primary">Insight:</AlertTitle>
                            <AlertDescription>{insight.insightMessage}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

          </div>
        </div>
      </MainLayout>
    </>
  );
}
