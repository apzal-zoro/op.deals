'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Gamepad2, Search, Tag, TrendingUp, Users, ChevronDown, Heart, Bell, Library, Moon, Sun, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { UserNav } from '../auth/user-nav';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useSettings } from '@/contexts/settings-context';
import { useState } from 'react';

const mainNavItems = [
  { href: '/', label: 'Deals' },
  { href: '#', label: 'Bundles' },
  { href: '#', label: 'Freebies' },
  { href: '#', label: 'News' },
];

const moreNavItems = [
    { href: '#', label: 'Vouchers', icon: Tag },
    { href: '#', label: 'Rankings', icon: TrendingUp },
    { href: '#', label: 'Franchises', icon: Gamepad2 },
    { href: '#', label: 'Community', icon: Users },
];

const regions = [
  { name: 'India', flag: '🇮🇳', currency: 'INR' },
  { name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { name: 'Europe', flag: '🇪🇺', currency: 'EUR' },
  { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
];

export function Header() {
  const pathname = usePathname();
  const { keyshopsEnabled, setKeyshopsEnabled } = useSettings();
  const { theme, setTheme } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  return (
    <header className="sticky top-0 z-20 flex flex-col border-b bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="bg-muted/30 py-1 text-xs text-muted-foreground">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto flex items-center gap-1 text-xs">
                      <span className="text-lg">{selectedRegion.flag}</span>
                      <span>{selectedRegion.name} &bull; {selectedRegion.currency}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      {regions.map((region) => (
                        <DropdownMenuItem key={region.name} onSelect={() => setSelectedRegion(region)}>
                          <span className="text-lg mr-2">{region.flag}</span>
                          <span>{region.name} ({region.currency})</span>
                          {selectedRegion.name === region.name && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center gap-4">
                 <div className="flex items-center space-x-2">
                    <Label htmlFor="keyshops-switch" className="cursor-pointer">Keyshops</Label>
                    <Switch
                        id="keyshops-switch"
                        checked={keyshopsEnabled}
                        onCheckedChange={setKeyshopsEnabled}
                    />
                </div>
                 <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                        id="theme-switch"
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                    <Moon className="h-4 w-4" />
                </div>
            </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="w-full">
        <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between gap-6 px-6">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                    <h1 className="text-xl text-primary font-bold">op.deals</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-4">
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary text-foreground p-0 h-auto">
                                More <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                {moreNavItems.map(item => (
                                    <DropdownMenuItem key={item.label}>
                                        <item.icon className="mr-2 h-4 w-4"/>
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for games..." className="pl-10" />
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Heart />
                        <span className="sr-only">Wishlist</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell />
                        <span className="sr-only">Alerts</span>
                    </Button>
                     <Link href="/library">
                        <Button variant="ghost" size="icon">
                                <Library />
                                <span className="sr-only">My Library</span>
                        </Button>
                     </Link>
                    <UserNav />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
