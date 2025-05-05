
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, Search, MessageCircle, User, UserPlus, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-secondary text-primary' : 'hover:bg-secondary/50';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-xl font-bold">G</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Grad Connect</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/profile">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full circle-connection">
                      <img 
                        src={currentUser.photoURL || "https://i.pravatar.cc/150?img=1"} 
                        alt={currentUser.displayName}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <span className="hidden md:block font-medium">
                      {currentUser.displayName}
                    </span>
                  </div>
                </Link>
                <Button variant="outline" size="icon" onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="gradient-bg">ログイン</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar - only show if logged in */}
        {currentUser && (
          <aside className="w-20 md:w-64 border-r border-border bg-sidebar p-4 hidden md:block">
            <nav className="space-y-2">
              <Link 
                to="/" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/')}`}
              >
                <Search className="h-5 w-5" />
                <span className="hidden md:inline-block">ユーザー検索</span>
              </Link>
              
              <Link 
                to="/messages" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/messages')}`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden md:inline-block">メッセージ</span>
              </Link>
              
              <Link 
                to="/profile" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/profile')}`}
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline-block">プロフィール</span>
              </Link>
              
              {currentUser.role === 'graduate' && (
                <Link 
                  to="/consultations" 
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/consultations')}`}
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="hidden md:inline-block">相談管理</span>
                </Link>
              )}
              
              <Link 
                to="/settings" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/settings')}`}
              >
                <Settings className="h-5 w-5" />
                <span className="hidden md:inline-block">設定</span>
              </Link>
            </nav>
            
            {/* Role badge */}
            <div className="mt-8">
              <div className="rounded-full bg-secondary/70 py-1 px-3 text-sm text-center">
                {currentUser.role === 'graduate' ? '大学院生' : '進学希望者'}
              </div>
            </div>
          </aside>
        )}
        
        {/* Mobile navigation - only show if logged in */}
        {currentUser && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-10">
            <div className="flex justify-around items-center p-2">
              <Link to="/" className="p-2">
                <Search className="h-6 w-6" />
              </Link>
              <Link to="/messages" className="p-2">
                <MessageCircle className="h-6 w-6" />
              </Link>
              <Link to="/profile" className="p-2">
                <User className="h-6 w-6" />
              </Link>
              <Link to="/settings" className="p-2">
                <Settings className="h-6 w-6" />
              </Link>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
