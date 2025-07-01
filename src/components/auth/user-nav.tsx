'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/settings-context';
import { useTheme } from 'next-themes';
import { ChevronRight, Moon, Sun, LogOut, Settings, Bell, Heart, Library, Trash2, BellRing } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const { keyshopsEnabled, setKeyshopsEnabled } = useSettings();
  const { theme, setTheme } = useTheme();

  // This prevents the dropdown from closing when interacting with switches
  const preventDefault = (e: Event) => e.preventDefault();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/40x40.png" alt="@apzal_rahman" data-ai-hint="user avatar" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/40x40.png" alt="@apzal_rahman" data-ai-hint="user avatar" />
                <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Apzal_Rahman</p>
                <p className="text-xs leading-none text-muted-foreground">
                Joined 7 months ago
                </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="#">
                <Heart className="mr-2" />
                Wishlist
                <Badge variant="secondary" className="ml-auto">24</Badge>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">
                <BellRing className="mr-2" />
                Alerts
                <Badge variant="secondary" className="ml-auto">10</Badge>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/library">
                <Library className="mr-2" />
                Collection
                <Badge variant="secondary" className="ml-auto">284</Badge>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="#">
                <Trash2 className="mr-2" />
                Ignorelist
                <Badge variant="secondary" className="ml-auto">1</Badge>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="#">
                <Bell className="mr-2" />
                Notifications
                <Badge variant="secondary" className="ml-auto">13</Badge>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="#">
                <Settings className="mr-2" />
                Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuItem asChild>
            <Link href="#">
                <LogOut className="mr-2" />
                Sign out
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem onSelect={preventDefault}>
                <span>Default Platform: PC</span>
                <ChevronRight className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={preventDefault}>
                 <span className="flex items-center">
                    <span className="mr-2 text-lg">🇮🇳</span> Region & Currency
                 </span>
                <ChevronRight className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
             <DropdownMenuItem onSelect={preventDefault} className="p-0">
                <Label htmlFor="keyshops-switch-dd" className="flex items-center justify-between w-full cursor-pointer p-2">
                    <span>Keyshops</span>
                    <Switch
                        id="keyshops-switch-dd"
                        checked={keyshopsEnabled}
                        onCheckedChange={setKeyshopsEnabled}
                    />
                </Label>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={preventDefault} className="p-0">
                <Label htmlFor="theme-switch-dd" className="flex items-center justify-between w-full cursor-pointer p-2">
                    <span className="flex items-center">
                        {theme === 'dark' ? <Moon className="mr-2"/> : <Sun className="mr-2"/>}
                        Theme
                    </span>
                    <Switch
                        id="theme-switch-dd"
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                </Label>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
