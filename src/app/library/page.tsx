import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockDeals } from '@/lib/data';
import { DealsGrid } from '@/components/deals/deals-grid';

// Simple SVG icons for brands
const SteamIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zM9.54 8.789l-2.02 1.614 1.135 1.51-1.39.993-2.12-2.82.915-.688 2.56 1.94-.08-3.08h2.09l-.1 3.535 4.28-3.535h2.46l-4.78 3.92 3.1 4.14-.91.68-2.31-3.08-2.61 2.12h-2.1l2.7-2.2-1.04-1.39zm3.83 2.055l.895-1.08.01.01 1.775 2.155-1.125.925-.875-1.065-.01-.01-1.78-2.155 1.11-.92z"/></svg>
const EpicGamesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.91 0H2.69C2.69 0 3 4.23 3 6.13c0 1.9-.38 5.4-3 6.12 2.62.73 3 4.28 3 6.19S2.69 24 2.69 24h9.22c4.97 0 9.09-4.04 9.09-9s-4.12-9-9.09-9zm-1.07 15.65c-.86 0-1.57-.42-1.57-1.19v-5.2c0-.77.7-1.18 1.57-1.18.88 0 1.56.41 1.56 1.18v5.2c0 .77-.68 1.19-1.56 1.19zm4.27 0c-.86 0-1.56-.42-1.56-1.19v-5.2c0-.77.7-1.18 1.56-1.18.88 0 1.57.41 1.57 1.18v5.2c0 .77-.7 1.19-1.57 1.19z"/></svg>
const GOGIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12h4v2h-4v-2zm0 4h4v2h-4v-2z"/></svg>

export default function LibraryPage() {
  // Mock owned games by taking a slice of the deals data
  const ownedGames = mockDeals.slice(0, 4);

  return (
    <MainLayout>
      <div className="space-y-8 pt-8">
        <div>
          <h1 className="text-2xl text-primary">My Game Library</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-2xl font-body">
            Connect your accounts to automatically sync your game library and get personalized insights.
          </p>
        </div>

        <Card className="rounded-lg bg-card/80">
          <CardHeader>
            <CardTitle>Connect Accounts</CardTitle>
            <CardDescription>Link your gaming accounts to see all your games in one place.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
             <Button className="w-full sm:w-auto justify-center text-base py-6 rounded-md">
                <SteamIcon />
                Connect Steam
              </Button>
              <Button className="w-full sm:w-auto justify-center text-base py-6 rounded-md">
                <EpicGamesIcon />
                Connect Epic Games
              </Button>
              <Button className="w-full sm:w-auto justify-center text-base py-6 rounded-md">
                <GOGIcon />
                Connect GOG
              </Button>
          </CardContent>
        </Card>

        <div>
            <h2 className="text-xl text-primary mb-4">Games You Own</h2>
            <DealsGrid deals={ownedGames} />
        </div>
      </div>
    </MainLayout>
  );
}
