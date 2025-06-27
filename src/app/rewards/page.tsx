import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRewards } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';

export default function RewardsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Loyalty Rewards</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Redeem your coins for awesome rewards! Earn coins by voting and engaging with deals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockRewards.map((reward) => (
            <Card key={reward.id} className="text-center flex flex-col items-center justify-between p-4 rounded-lg bg-card/80">
              <CardHeader>
                <div className="mx-auto bg-background p-4 rounded-full w-20 h-20 flex items-center justify-center border-2 border-border">
                  <reward.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-lg font-bold mt-4">{reward.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <Button className="w-full text-xs rounded-md hover:shadow-glow-accent">
                <Coins className="mr-2 h-4 w-4" />
                Redeem for {reward.cost}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
