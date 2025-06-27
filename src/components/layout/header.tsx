'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Gamepad2, HardDrive, Sparkles, Search } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CoinIcon, GemIcon, SwordIcon } from '@/components/icons/pixel-icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Game Deals', icon: Gamepad2 },
  { href: '/software', label: 'Software', icon: HardDrive },
  { href: '/digger', label: 'Deal Digger', icon: SwordIcon },
  { href: '/recommendations', label: 'AI Picks', icon: Sparkles },
  { href: '/rewards', label: 'Rewards', icon: GemIcon },
];

export function Header() {
  const pathname = usePathname();
  const [coins, setCoins] = useState(1337);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-headline text-primary">Pixel Vault</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-2 text-sm font-headline transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-sm">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for games..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-card p-1 pr-3 pixel-corners-sm">
          <CoinIcon className="h-6 w-6" />
          <span className="font-headline text-sm text-primary">{coins}</span>
        </div>
        <Avatar className="h-8 w-8 pixel-corners">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="pixel avatar" />
            <AvatarFallback>PV</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
