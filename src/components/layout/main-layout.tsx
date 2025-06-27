import { Header } from './header';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4">{children}</main>
    </div>
  );
}
