
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  LogOut, 
  Search, 
  MessageCircle, 
  User, 
  UserPlus, 
  Settings, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("ログアウトしました");
    } catch (error) {
      toast.error("ログアウトに失敗しました");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {currentUser && (
              <Sheet>
                <SheetTrigger asChild className="block md:hidden">
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                  <div className="flex flex-col h-full">
                    <div className="py-4 border-b border-border">
                      <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                          <span className="text-xl font-bold">G</span>
                        </div>
                        <h1 className="text-xl font-bold gradient-text">Grad Connect</h1>
                      </Link>
                    </div>
                    
                    <ScrollArea className="flex-1 py-4">
                      <nav className="space-y-1 px-2">
                        <Link 
                          to="/" 
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Search className="h-5 w-5" />
                          <span>ユーザー検索</span>
                        </Link>
                        
                        <Link 
                          to="/messages" 
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/messages') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>メッセージ</span>
                          <Badge variant="default" className="ml-auto">2</Badge>
                        </Link>
                        
                        <Link 
                          to="/profile" 
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/profile') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="h-5 w-5" />
                          <span>プロフィール</span>
                        </Link>
                        
                        {currentUser.role === 'graduate' && (
                          <Link 
                            to="/consultations" 
                            className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/consultations') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <UserPlus className="h-5 w-5" />
                            <span>相談管理</span>
                          </Link>
                        )}
                        
                        <Link 
                          to="/settings" 
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${isActive('/settings') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="h-5 w-5" />
                          <span>設定</span>
                        </Link>
                      </nav>
                      
                      <Separator className="my-4" />
                      
                      <div className="px-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          ログアウト
                        </Button>
                      </div>
                    </ScrollArea>
                    
                    {/* ユーザー情報 */}
                    <div className="p-4 border-t border-border mt-auto">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage 
                            src={currentUser.photoURL || "https://i.pravatar.cc/150?img=1"} 
                            alt={currentUser.displayName}
                          />
                          <AvatarFallback>
                            {currentUser.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{currentUser.displayName}</p>
                          <p className="text-xs text-muted-foreground">
                            {currentUser.role === 'graduate' ? '大学院生' : '進学希望者'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-xl font-bold">G</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">Grad Connect</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full relative hidden md:flex">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                
                <Link to="/profile" className="hidden md:block">
                  <Button variant="ghost" className="rounded-full">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage 
                        src={currentUser.photoURL || "https://i.pravatar.cc/150?img=1"} 
                        alt={currentUser.displayName}
                      />
                      <AvatarFallback>
                        {currentUser.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {currentUser.displayName}
                    </span>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleSignOut}
                  className="rounded-full hidden md:flex"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="gradient-bg rounded-full">ログイン</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* メインコンテンツ */}
      <div className="flex flex-1">
        {/* サイドバー - PC表示のみ */}
        {currentUser && (
          <aside className="w-64 border-r border-border bg-sidebar p-4 hidden md:block">
            <nav className="space-y-1 sticky top-24">
              <Link 
                to="/" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${isActive('/') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
              >
                <Search className="h-5 w-5" />
                <span>ユーザー検索</span>
              </Link>
              
              <Link 
                to="/messages" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${isActive('/messages') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>メッセージ</span>
                <Badge variant="default" className="ml-auto">2</Badge>
              </Link>
              
              <Link 
                to="/profile" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${isActive('/profile') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
              >
                <User className="h-5 w-5" />
                <span>プロフィール</span>
              </Link>
              
              {currentUser.role === 'graduate' && (
                <Link 
                  to="/consultations" 
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${isActive('/consultations') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>相談管理</span>
                </Link>
              )}
              
              <Link 
                to="/settings" 
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${isActive('/settings') ? 'bg-secondary text-primary font-medium' : 'text-foreground/70 hover:bg-secondary/50'}`}
              >
                <Settings className="h-5 w-5" />
                <span>設定</span>
              </Link>
            </nav>
            
            {/* ロールバッジ */}
            <div className="mt-8 px-3">
              <div className="rounded-full bg-secondary py-1.5 px-3 text-sm text-center font-medium text-secondary-foreground">
                {currentUser.role === 'graduate' ? '大学院生' : '進学希望者'}
              </div>
            </div>
            
            {/* ユーザー情報 */}
            <div className="mt-auto pt-6 px-3 fixed bottom-4 w-56">
              <div className="p-3 rounded-lg bg-muted/50 flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage 
                    src={currentUser.photoURL || "https://i.pravatar.cc/150?img=1"} 
                    alt={currentUser.displayName} 
                  />
                  <AvatarFallback>
                    {currentUser.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{currentUser.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentUser.email}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        )}
        
        {/* モバイルナビゲーション - ログイン時のみ表示 */}
        {currentUser && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-10 shadow-md">
            <div className="flex justify-around items-center">
              <Link to="/" className={`p-3 flex flex-col items-center ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
                <Search className={`h-5 w-5 ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs mt-1">検索</span>
              </Link>
              <Link to="/messages" className={`p-3 flex flex-col items-center ${isActive('/messages') ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className="relative">
                  <MessageCircle className={`h-5 w-5 ${isActive('/messages') ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                </div>
                <span className="text-xs mt-1">メッセージ</span>
              </Link>
              <Link to="/profile" className={`p-3 flex flex-col items-center ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}>
                <User className={`h-5 w-5 ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs mt-1">プロフィール</span>
              </Link>
              <Link to="/settings" className={`p-3 flex flex-col items-center ${isActive('/settings') ? 'text-primary' : 'text-muted-foreground'}`}>
                <Settings className={`h-5 w-5 ${isActive('/settings') ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs mt-1">設定</span>
              </Link>
            </div>
          </div>
        )}
        
        {/* メインコンテンツ */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
