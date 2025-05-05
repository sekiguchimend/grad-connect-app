
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, getMockUsers } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, Flag, Calendar, MapPin, Bookmark, Book } from 'lucide-react';
import { UserProfile } from '../types';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
      return;
    }
    
    // Get user detail from mock data
    const foundUser = getMockUsers().find(u => u.id === id);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [id, currentUser, isLoading, navigate]);
  
  const handleStartChat = () => {
    setIsConnecting(true);
    
    // Simulate a network request
    setTimeout(() => {
      setIsConnecting(false);
      navigate('/messages');
    }, 1000);
  };
  
  const handleReportUser = () => {
    alert('ユーザーを報告する機能は現在開発中です。');
  };
  
  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-bg animate-pulse-slow mx-auto mb-4"></div>
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            &larr; 戻る
          </Button>
          
          {/* Profile header */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="circle-connection w-32 h-32 md:w-40 md:h-40">
              <img 
                src={user.photoURL || "https://i.pravatar.cc/150?img=1"} 
                alt={user.displayName}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold mb-2">{user.displayName}</h1>
                
                <div className="flex space-x-3 justify-center md:justify-end">
                  <Button
                    onClick={handleStartChat}
                    disabled={isConnecting}
                    className="gradient-bg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {isConnecting ? '接続中...' : 'メッセージを送る'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleReportUser}
                  >
                    <Flag className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 justify-center md:justify-start mb-2 text-muted-foreground">
                <Badge variant={user.role === 'graduate' ? "default" : "outline"}>
                  {user.role === 'graduate' ? '大学院生' : '進学希望者'}
                </Badge>
                
                {user.role === 'graduate' && (
                  <Badge variant={user.acceptingConsultations ? "default" : "outline"}>
                    {user.acceptingConsultations ? '相談受付中' : '相談停止中'}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {user.institution && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{user.institution}</span>
                  </div>
                )}
                
                {user.department && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Book className="w-4 h-4" />
                    <span>{user.department} / {user.field || '未設定'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">自己紹介</h2>
                <p className="whitespace-pre-wrap">{user.bio || 'まだ自己紹介はありません。'}</p>
                
                <h2 className="text-xl font-bold mt-8 mb-4">研究分野・興味</h2>
                <div className="flex flex-wrap gap-2">
                  {user.researchInterests?.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                  
                  {(!user.researchInterests || user.researchInterests.length === 0) && (
                    <p className="text-muted-foreground">研究分野・興味は設定されていません。</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">ステータス</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">アカウントタイプ</span>
                    <Badge variant={user.role === 'graduate' ? "default" : "outline"}>
                      {user.role === 'graduate' ? '大学院生' : '進学希望者'}
                    </Badge>
                  </div>
                  
                  {user.role === 'graduate' && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">相談</span>
                      <Badge variant={user.acceptingConsultations ? "default" : "outline"}>
                        {user.acceptingConsultations ? '受付中' : '停止中'}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">登録日</span>
                    <span className="text-sm">{new Date().toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>
                
                {user.role === 'graduate' && user.acceptingConsultations && (
                  <Alert className="mt-6">
                    <AlertDescription>
                      このユーザーは大学院生で、現在相談を受け付けています。メッセージを送って質問しましょう。
                    </AlertDescription>
                  </Alert>
                )}
                
                {user.role === 'graduate' && !user.acceptingConsultations && (
                  <Alert className="mt-6">
                    <AlertDescription>
                      このユーザーは現在相談を受け付けていません。プロフィールを確認することはできますが、メッセージへの返信が遅れる可能性があります。
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;
