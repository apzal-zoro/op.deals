'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { mockDeals } from '@/lib/data';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Wand2, Tag, History, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { gamePageInsights, GamePageInsightsOutput } from '@/ai/flows';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

// Mock data, in a real app this would come from user authentication
const mockUserLibrary = ['The Witcher 3'];
const mockUserWishlist = ["Baldur's Gate 3", 'Cyberpunk 2077'];

export default function GamePage() {
  const params = useParams() as { id: string };
  const deal = useMemo(() => mockDeals.find((d) => d.id === params.id), [params.id]);
  
  const [insight, setInsight] = useState<GamePageInsightsOutput | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(true);

  const getInsight = useCallback(async () => {
    if (!deal) return;
    setIsInsightLoading(true);
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
  }, [deal]);

  useEffect(() => {
    getInsight();
  }, [getInsight]);

  if (!deal) {
    notFound();
  }

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

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig

  const formattedPriceHistory = useMemo(() => {
    return deal.priceHistory?.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    }));
  }, [deal.priceHistory]);

  return (
    <>
      <div className="fixed inset-0 -z-10" style={backgroundStyle} />
      <div className="fixed inset-0 -z-10 bg-background/80 backdrop-blur-md" />
      <MainLayout>
        <div className="space-y-6 text-foreground">
            {isInsightLoading ? (
                <Skeleton className="h-12 w-full rounded-md" />
            ) : insight && (
                 <Alert className="rounded-md bg-card/70 backdrop-blur-sm border-primary/50">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">AI Insight</AlertTitle>
                    <AlertDescription>{insight.insightMessage}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Image
                    src={deal.boxArtUrl}
                    alt={deal.gameTitle}
                    width={600}
                    height={800}
                    className="w-full object-cover aspect-[3/4] rounded-lg shadow-2xl shadow-black/50"
                    data-ai-hint={boxArtHint}
                    />
                </div>
                <div className="lg:col-span-2">
                     <Card className="bg-card/70 backdrop-blur-sm rounded-lg h-full flex flex-col">
                        <CardContent className="p-6 space-y-4 flex-grow">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h1 className="text-4xl text-primary">{deal.gameTitle}</h1>
                                    <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="destructive" className="rounded-md text-lg">-{deal.discount}%</Badge>
                                    {deal.isHistoricLow && (
                                        <Badge variant="default" className="rounded-md text-lg bg-primary/90 flex items-center gap-1 animate-pulse">
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
                            
                            <p className="text-base leading-relaxed font-body">{deal.description}</p>
                        </CardContent>
                        <CardFooter className="p-6 border-t border-border/50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                                <p className="text-5xl text-accent">₹{deal.priceINR}</p>
                                <Button size="lg" className="text-xl rounded-md w-full sm:w-auto hover:shadow-glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
                                    <ShoppingCart className="mr-4 h-8 w-8"/>
                                    Buy on {deal.storeName}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {deal.priceHistory && deal.priceHistory.length > 0 && (
                 <Card className="rounded-lg bg-card/70 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                        <History className="text-primary"/> Price History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <AreaChart data={formattedPriceHistory} margin={{ left: -20, right: 20, top: 10, bottom: 0}}>
                                <defs>
                                    <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'var(--font-body)'}} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `₹${value}`} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'var(--font-body)'}} />
                                <ChartTooltip 
                                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                                    content={<ChartTooltipContent indicator="line" labelClassName="font-headline" wrapperClassName="rounded-lg" />} 
                                />
                                <Area dataKey="priceINR" type="monotone" fill="url(#fillPrice)" stroke="hsl(var(--accent))" strokeWidth={2} name="Price" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}

            {deal.otherStores && deal.otherStores.length > 0 && (
                <Card className="rounded-lg bg-card/70 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Tag className="text-primary"/> Compare Prices
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Store</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deal.otherStores.map((storeDeal) => (
                                <TableRow key={storeDeal.storeName}>
                                    <TableCell className="flex items-center gap-4">
                                        <Image
                                            src={storeDeal.storeLogoUrl}
                                            alt={storeDeal.storeName}
                                            width={80}
                                            height={30}
                                            className="object-contain"
                                            data-ai-hint={storeDeal.storeName.toLowerCase()}
                                        />
                                        <span className="font-body">{storeDeal.storeName}</span>
                                    </TableCell>
                                    <TableCell className="text-right text-accent">₹{storeDeal.priceINR}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="secondary" className="rounded-md">
                                            <a href={storeDeal.dealLink} target="_blank" rel="noopener noreferrer">
                                                Go to deal <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
      </MainLayout>
    </>
  );
}
