
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました。もう一度お試しください。');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-4">
            <span className="text-4xl font-bold">G</span>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Grad Connect</h1>
          <p className="text-muted-foreground">大学院進学を目指す全ての人のためのプラットフォーム</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>ログイン / サインアップ</CardTitle>
            <CardDescription>
              アカウント作成またはログインして、大学院生とつながりましょう。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <LogIn className="w-5 h-5" />
                <span>{isLoading ? 'ログイン中...' : 'Google でログイン'}</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              ログインすることで、<a href="/terms" className="underline">利用規約</a>と
              <a href="/privacy" className="underline">プライバシーポリシー</a>に同意したことになります。
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>※テスト環境として、ユーザー登録なしでご利用いただけます。</p>
          <p>※実際のログイン情報は保存されません。</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
