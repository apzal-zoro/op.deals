'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from './ui/label';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

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
