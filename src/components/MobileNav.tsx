
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, Send, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MobileNav = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-background flex items-center justify-around px-4 md:hidden z-10">
      <Link to="/">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">検索</span>
        </Button>
      </Link>

      <Link to="/messages">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center ${isActive('/messages') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Send className="h-5 w-5" />
          <span className="text-xs mt-1">メッセージ</span>
        </Button>
      </Link>

      <Link to="/profile">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Avatar className="h-5 w-5">
            <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
            <AvatarFallback className="text-xs">
              {currentUser?.displayName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs mt-1">プロフィール</span>
        </Button>
      </Link>

      <Link to="/settings">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center ${isActive('/settings') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">設定</span>
        </Button>
      </Link>
    </div>
  );
};

export default MobileNav;
