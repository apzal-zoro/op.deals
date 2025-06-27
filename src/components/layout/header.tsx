'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CoinIcon } from '@/components/icons/pixel-icons';
import { useState } from 'react';

export function Header() {
  // Mock loyalty points
  const [coins, setCoins] = useState(1337);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-headline hidden sm:block">Arthy Pixel Deals</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-card p-1 pr-3 pixel-corners-sm">
          <CoinIcon className="h-6 w-6" />
          <span className="font-headline text-sm text-primary">{coins}</span>
        </div>
        <Avatar className="h-8 w-8 pixel-corners">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="pixel avatar" />
            <AvatarFallback>AP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
