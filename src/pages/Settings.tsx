
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { 
  Bell, 
  Lock, 
  UserRound, 
  Palette, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // この部分は実際のダークモード実装時に拡張
    toast.success(darkMode ? "ライトモードに切り替えました" : "ダークモードに切り替えました");
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("ログアウトしました");
      navigate('/login');
    } catch (error) {
      toast.error("ログアウトに失敗しました");
    }
  };
  
  const saveSettings = () => {
    toast.success("設定を保存しました");
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">アカウント設定</h1>
          <p className="text-muted-foreground">
            アカウント設定やプライバシー設定を管理します
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイドナビゲーション - モバイルでは非表示 */}
          <div className="hidden md:block">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary text-primary">
                    <UserRound size={18} />
                    <span>プロフィール</span>
                  </a>
                  <a href="#notifications" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                    <Bell size={18} />
                    <span>通知設定</span>
                  </a>
                  <a href="#privacy" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                    <Lock size={18} />
                    <span>プライバシー</span>
                  </a>
                  <a href="#appearance" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                    <Palette size={18} />
                    <span>表示設定</span>
                  </a>
                  <a href="#help" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                    <HelpCircle size={18} />
                    <span>ヘルプ</span>
                  </a>
                  <Separator className="my-3" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive w-full hover:bg-destructive/10"
                  >
                    <LogOut size={18} />
                    <span>ログアウト</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* メインコンテンツ */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            {/* プロフィール設定 */}
            <Card id="profile" className="shadow-sm border-border/60">
              <CardHeader>
                <CardTitle>プロフィール設定</CardTitle>
                <CardDescription>
                  あなたの基本情報とプロフィール設定を管理します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 circle-connection">
                    <img 
                      src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=3"} 
                      alt="Profile" 
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{currentUser?.displayName}</h3>
                    <p className="text-muted-foreground text-sm">
                      {currentUser?.role === 'graduate' ? '大学院生' : '進学希望者'}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      プロフィール画像を変更
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Button variant="outline" asChild>
                    <a href="/profile">プロフィールを編集する</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* 通知設定 */}
            <Card id="notifications" className="shadow-sm border-border/60">
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>
                  通知の受信設定を管理します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">メール通知</h3>
                    <p className="text-muted-foreground text-sm">
                      メッセージやアクティビティに関するメール通知を受け取る
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">プッシュ通知</h3>
                    <p className="text-muted-foreground text-sm">
                      ブラウザによるプッシュ通知を受け取る
                    </p>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* プライバシー設定 */}
            <Card id="privacy" className="shadow-sm border-border/60">
              <CardHeader>
                <CardTitle>プライバシー設定</CardTitle>
                <CardDescription>
                  プライバシーとアカウント公開レベルを設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">プロフィール公開</h3>
                    <p className="text-muted-foreground text-sm">
                      あなたのプロフィールを他のユーザーに表示する
                    </p>
                  </div>
                  <Switch 
                    checked={profileVisibility} 
                    onCheckedChange={setProfileVisibility} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">オンラインステータス</h3>
                    <p className="text-muted-foreground text-sm">
                      あなたがオンライン中であることを他のユーザーに表示する
                    </p>
                  </div>
                  <Switch 
                    checked={showOnlineStatus} 
                    onCheckedChange={setShowOnlineStatus} 
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* 表示設定 */}
            <Card id="appearance" className="shadow-sm border-border/60">
              <CardHeader>
                <CardTitle>表示設定</CardTitle>
                <CardDescription>
                  アプリの外観と表示方法をカスタマイズします
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">ダークモード</h3>
                    <p className="text-muted-foreground text-sm">
                      ダークカラーテーマに切り替える
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={toggleDarkMode} 
                    />
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* ヘルプとサポート */}
            <Card id="help" className="shadow-sm border-border/60">
              <CardHeader>
                <CardTitle>ヘルプとサポート</CardTitle>
                <CardDescription>
                  よくある質問とサポート情報
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">よくある質問</h3>
                  <p className="text-muted-foreground text-sm">
                    アプリの使い方や機能についての一般的な質問と回答
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/faq">FAQを表示する</a>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">お問い合わせ</h3>
                  <p className="text-muted-foreground text-sm">
                    さらに質問がある場合やサポートが必要な場合はお問い合わせください
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/contact">サポートに連絡する</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* 保存ボタン */}
            <div className="flex justify-end">
              <Button onClick={saveSettings} className="gradient-bg">
                設定を保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
