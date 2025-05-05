
import { ReactNode } from 'react';
import AppHeader from './AppHeader';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 py-6 pb-20 md:pb-6">
        <div className="container max-w-7xl">
          {children}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
};

export default Layout;
