'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, HardDrive, Library, Search, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { LoginDialog } from '../auth/login-dialog';

const navItems = [
  { href: '/', label: 'Game Deals', icon: Gamepad2 },
  { href: '/software', label: 'Software', icon: HardDrive },
  { href: '/digger', label: 'Deal Digger', icon: Swords },
  { href: '/library', label: 'My Library', icon: Library },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl text-primary font-bold">op.deals</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-2 text-sm transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
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
        <ThemeToggle />
        <LoginDialog />
      </div>
    </header>
  );
}
