import { ReactNode } from 'react';
import AppHeader from './AppHeader';
import MobileNav from './MobileNav';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/messages';
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className={`flex-1 ${isMessagesPage ? 'pb-20 md:pb-6' : 'py-6 pb-20 md:pb-6'}`}>
        <div className={isMessagesPage ? '' : 'container max-w-7xl'}>
          {children}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
};

export default Layout;