'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, HardDrive, Sparkles } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { GemIcon, SwordIcon } from '@/components/icons/pixel-icons';

const navItems = [
  { href: '/', label: 'Game Deals', icon: Gamepad2 },
  { href: '/software', label: 'Software', icon: HardDrive },
  { href: '/digger', label: 'Deal Digger', icon: SwordIcon },
  { href: '/recommendations', label: 'AI Picks', icon: Sparkles },
  { href: '/rewards', label: 'Rewards', icon: GemIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className="font-headline text-xs"
              tooltip={{ children: item.label, side: 'right' }}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
