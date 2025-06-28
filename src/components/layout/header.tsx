'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Search, MoreVertical, Tag, TrendingUp, Users, ChevronDown, Heart, Bell, Library } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { LoginDialog } from '../auth/login-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useSettings } from '@/contexts/settings-context';

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
  { name: 'Argentina', flag: '🇦🇷' }, { name: 'Australia', flag: '🇦🇺' }, { name: 'Belgium', flag: '🇧🇪' }, { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Canada', flag: '🇨🇦' }, { name: 'Chile', flag: '🇨🇱' }, { name: 'China', flag: '🇨🇳' }, { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Denmark', flag: '🇩🇰' }, { name: 'Europe', flag: '🇪🇺' }, { name: 'Finland', flag: '🇫🇮' }, { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' }, { name: 'Hong Kong', flag: '🇭🇰' }, { name: 'India', flag: '🇮🇳' }, { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Ireland', flag: '🇮🇪' }, { name: 'Israel', flag: '🇮🇱' }, { name: 'Italy', flag: '🇮🇹' }, { name: 'Japan', flag: '🇯🇵' },
  { name: 'Mexico', flag: '🇲🇽' }, { name: 'Netherlands', flag: '🇳🇱' }, { name: 'New Zealand', flag: '🇳🇿' }, { name: 'Norway', flag: '🇳🇴' },
  { name: 'Poland', flag: '🇵🇱' }, { name: 'Romania', flag: '🇷🇴' }, { name: 'Russia', flag: '🇷🇺' }, { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Singapore', flag: '🇸🇬' }, { name: 'South Africa', flag: '🇿🇦' }, { name: 'South Korea', flag: '🇰🇷' }, { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sweden', flag: '🇸🇪' }, { name: 'Switzerland', flag: '🇨🇭' }, { name: 'Taiwan', flag: '🇹🇼' }, { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Ukraine', flag: '🇺🇦' }, { name: 'United Kingdom', flag: '🇬🇧' }, { name: 'United States', flag: '🇺🇸' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' }, { code: 'EUR', name: 'Euro', symbol: '€' }, { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' }, { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }, { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' }, { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }, { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }, { code: 'KRW', name: 'South Korean Won', symbol: '₩' }, { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
];


export function Header() {
  const pathname = usePathname();
  const { keyshopsEnabled, setKeyshopsEnabled } = useSettings();

  return (
    <header className="sticky top-0 z-20 flex flex-col border-b bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="w-full">
        <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center justify-end gap-6 px-6 text-sm text-muted-foreground">
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                        Default platform: PC <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>PC</DropdownMenuItem>
                    <DropdownMenuItem>PlayStation</DropdownMenuItem>
                    <DropdownMenuItem>Xbox</DropdownMenuItem>
                    <DropdownMenuItem>Nintendo Switch</DropdownMenuItem>
                </DropdownMenuContent>
           </DropdownMenu>
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                        Region: <span className="text-xl">🇮🇳</span> IN <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[40rem] p-2">
                    <div className="grid grid-cols-4 gap-1">
                        {regions.map(region => (
                             <DropdownMenuItem key={region.name}>
                                <span className="mr-2 text-lg">{region.flag}</span> {region.name}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
           </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                        Currency: INR <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[40rem] p-2">
                     <div className="grid grid-cols-3 gap-1">
                        {currencies.map(currency => (
                             <DropdownMenuItem key={currency.code} className="text-xs">
                                <span className="mr-2 inline-block w-6 text-center font-bold">{currency.symbol}</span>
                                <span>{currency.name} ({currency.code})</span>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
           </DropdownMenu>
            <div className="flex items-center space-x-2">
                <Label htmlFor="keyshops-switch" className="text-sm font-normal">Keyshops</Label>
                <Switch id="keyshops-switch" checked={keyshopsEnabled} onCheckedChange={setKeyshopsEnabled} />
            </div>
            <ThemeToggle />
        </div>
      </div>

      <div className="border-t" />

      {/* Main header */}
      <div className="w-full">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-6">
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
                    <LoginDialog />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
