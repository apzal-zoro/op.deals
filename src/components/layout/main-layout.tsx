import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Header } from './header';
import { SidebarNav } from './sidebar-nav';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-xl font-headline text-primary">APD</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="size-4" />
            <span className="text-xs">LOGOUT</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
