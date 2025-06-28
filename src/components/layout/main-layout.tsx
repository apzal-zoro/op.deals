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

      {/* This new container holds the ad. It is outside the 3-column structure. */}
      {showTopAd && (
        <div className="w-full flex justify-center pt-6">
            {/* This inner div constrains the ad to the content width */}
            <div className="w-full max-w-[1200px]">
                <TopAdPlaceholder />
            </div>
        </div>
      )}

      <div className="w-full flex-grow flex justify-center">
        <div className="flex w-full max-w-screen-2xl px-6 gap-6">
          <aside className="hidden lg:block w-[160px] shrink-0 pt-6">
            <div className="sticky top-20">
              <AdPlaceholder side="left" />
            </div>
          </aside>
          <main className="w-full min-w-0 max-w-[1200px] flex-grow pt-6 pb-12">
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
