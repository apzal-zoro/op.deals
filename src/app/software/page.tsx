import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSoftware } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const softwareHints: { [key: string]: string } = {
    'PixelOS Pro': 'pixel software',
    'Chiptune Composer': 'music software',
    'SpriteVault': 'pixel art',
    'RetroFilter Suite': 'photo effect'
};

export default function SoftwarePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-headline text-primary">Software Keys</h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
            Power up your creative toolkit with our curated selection of software. Instant delivery, just like our game deals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSoftware.map(item => (
                <Card key={item.id} className="flex flex-col overflow-hidden pixel-corners bg-card/80 backdrop-blur-sm transition-all hover:shadow-glow-accent">
                    <CardHeader className="p-0">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={400}
                            height={200}
                            className="w-full object-cover aspect-video pixel-corners"
                            data-ai-hint={softwareHints[item.name] || 'software'}
                        />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                        <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
                        <p className="text-muted-foreground text-xs mt-2">{item.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 border-t mt-auto flex justify-between items-center">
                        <p className="text-xl font-headline text-accent">₹{item.priceINR}</p>
                        <Button className="font-headline text-xs pixel-corners-sm hover:shadow-glow-primary">
                            <ShoppingCart className="mr-2 h-4 w-4"/>
                            Buy Now
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
