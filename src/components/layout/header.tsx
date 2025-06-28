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
  { href: '#', label: 'Deals' },
  { href: '#', label: 'News' },
  { href: '/software', label: 'Games' },
  { href: '#', label: 'Prepaids' },
];

const moreNavItems = [
    { href: '#', label: 'Vouchers', icon: Tag },
    { href: '#', label: 'Rankings', icon: TrendingUp },
    { href: '#', label: 'Franchises', icon: Gamepad2 },
    { href: '#', label: 'Community', icon: Users },
];

export function Header() {
  const pathname = usePathname();
  const { keyshopsEnabled, setKeyshopsEnabled } = useSettings();

  return (
    <header className="sticky top-0 z-20 flex flex-col border-b bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-10 items-center justify-end gap-6 text-sm text-muted-foreground">
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
                        Region: IN <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>India (INR)</DropdownMenuItem>
                    <DropdownMenuItem>United States (USD)</DropdownMenuItem>
                    <DropdownMenuItem>United Kingdom (GBP)</DropdownMenuItem>
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
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                    <h1 className="text-xl text-primary font-bold">op.deals</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-4">
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.href}
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
