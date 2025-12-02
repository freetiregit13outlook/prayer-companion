import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto max-w-lg px-4 py-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
