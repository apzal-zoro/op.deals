'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { AdPlaceholder } from './ad-placeholder';
import { TopAdPlaceholder } from './top-ad-placeholder';
import { PlatformSelector } from '../home/platform-selector';

const platformSelectorPaths = ['/', '/recommendations'];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showPlatformSelector = platformSelectorPaths.includes(pathname);
  const showTopAd = pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex-grow flex justify-center">
        <div className="flex w-full max-w-screen-2xl px-6 gap-6">
          <aside className="hidden lg:block w-[160px] shrink-0 pt-6">
            <div className="sticky top-20">
              <AdPlaceholder side="left" />
            </div>
          </aside>
          <main className="w-full min-w-0 max-w-[1200px] flex-grow pt-6 pb-12">
            {showTopAd && <TopAdPlaceholder />}
            {showPlatformSelector && <PlatformSelector />}
            {children}
          </main>
          <aside className="hidden lg:block w-[160px] shrink-0 pt-6">
            <div className="sticky top-20">
              <AdPlaceholder side="right" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
