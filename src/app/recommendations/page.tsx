'use client';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { dealRecommendations, DealRecommendationsOutput, smartDealAlerts, SmartDealAlertsOutput } from '@/ai/flows';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// Mock data to send to the AI
const mockRecommendationInput = {
    wishlist: ["Cyberpunk 2077", "Starfield"],
    gameLibrary: ["The Witcher 3", "Stardew Valley"],
    purchaseHistory: ["Elden Ring"],
    discountLevel: "50% or higher",
    preferredStores: ["Steam", "GOG"]
};

const mockAlertInput = {
    gameTitle: "Baldur's Gate 3",
    userWishlist: ["Baldur's Gate 3", "Hollow Knight: Silksong"],
    gameLibrary: [],
    purchaseHistory: ["Divinity: Original Sin 2"],
    discountPercentage: 10,
    storeName: "GOG",
    storeReputation: "trusted"
};

export default function RecommendationsPage() {
    const [recommendations, setRecommendations] = useState<DealRecommendationsOutput | null>(null);
    const [alert, setAlert] = useState<SmartDealAlertsOutput | null>(null);
    const [isRecsLoading, setIsRecsLoading] = useState(false);
    const [isAlertLoading, setIsAlertLoading] = useState(false);

    const getRecommendations = async () => {
        setIsRecsLoading(true);
        setRecommendations(null);
        try {
            const result = await dealRecommendations(mockRecommendationInput);
            setRecommendations(result);
        } catch (error) {
            console.error("Failed to get recommendations:", error);
        } finally {
            setIsRecsLoading(false);
        }
    };
    
    const getSmartAlert = async () => {
        setIsAlertLoading(true);
        setAlert(null);
        try {
            const result = await smartDealAlerts(mockAlertInput);
            setAlert(result);
        } catch (error) {
            console.error("Failed to get smart alert:", error);
        } finally {
            setIsAlertLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="space-y-8 pt-8">
                <div>
                    <h1 className="text-2xl text-primary">AI-Powered Insights</h1>
                    <p className="text-muted-foreground text-sm mt-2 max-w-2xl font-body">
                        Let our AI assistant find personalized deals and craft smart alerts just for you.
                    </p>
                </div>

                <Card className="rounded-lg bg-card/80">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Wand2 className="text-primary"/> Personal Deal Recommendations
                        </CardTitle>
                        <CardDescription>Based on your wishlist, library, and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button onClick={getRecommendations} disabled={isRecsLoading} className="rounded-md">
                            {isRecsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate My Deals
                        </Button>

                        {recommendations && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                {recommendations.recommendations.map((rec, i) => (
                                    <a href={rec.dealLink} target="_blank" rel="noopener noreferrer" key={i} className="block border border-border p-4 rounded-md hover:bg-accent/10 hover:border-accent transition-colors">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base text-accent">{rec.gameTitle}</h3>
                                            <Badge variant="secondary" className="rounded-md">{rec.discount} off</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2 font-body">Price: {rec.price} on {rec.store}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-lg bg-card/80">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Wand2 className="text-primary"/> Smart Deal Alerts
                        </CardTitle>
                        <CardDescription>Simulate receiving a smart, context-aware deal notification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button onClick={getSmartAlert} disabled={isAlertLoading} className="rounded-md">
                            {isAlertLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate Smart Alert
                        </Button>
                        {alert && (
                             <Alert className="rounded-md mt-4">
                                <AlertTitle className="text-primary">New Alert!</AlertTitle>
                                <AlertDescription>{alert.alertMessage}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
