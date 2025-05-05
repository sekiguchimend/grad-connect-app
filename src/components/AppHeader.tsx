
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Menu, Search, Send, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const { currentUser, logout } = useAuth();
  const [notifications] = useState(2);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="border-b border-border py-3 bg-background sticky top-0 z-10">
      <div className="container max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <div className="md:hidden mr-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    <Logo size="md" />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-2">
                  <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Search className="h-5 w-5" />
                    <span>検索</span>
                  </Link>
                  <Link to="/messages" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Send className="h-5 w-5" />
                    <span>メッセージ</span>
                  </Link>
                  <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                      <AvatarFallback>{currentUser?.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span>プロフィール</span>
                  </Link>
                  <Link to="/settings" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Settings className="h-5 w-5" />
                    <span>設定</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Logo />
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button variant="ghost" size="sm" className="rounded-full px-4">
              <Search className="h-4 w-4 mr-2" />
              検索
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="sm" className="rounded-full px-4">
              <Send className="h-4 w-4 mr-2" />
              メッセージ
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {notifications}
              </Badge>
            )}
          </Button>
        </nav>
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {currentUser?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">プロフィール</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">設定</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
