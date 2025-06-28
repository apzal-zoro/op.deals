'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Switch } from '@/components/ui/switch';
import { Label } from './ui/label';
import { Skeleton } from "@/components/ui/skeleton";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor="dark-mode-switch" className="text-sm font-normal">Dark</Label>
        <Skeleton className="h-6 w-11 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="dark-mode-switch" className="text-sm font-normal">Dark</Label>
      <Switch 
        id="dark-mode-switch"
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}
