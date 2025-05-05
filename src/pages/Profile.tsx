
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile, UserRole } from '../types';
import { X, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, isLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Partial<UserProfile>>(currentUser || {});
  const [newInterest, setNewInterest] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  if (isLoading || !currentUser) {
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
  
  const handleInputChange = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };
  
  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    
    const interests = profile.researchInterests || [];
    if (!interests.includes(newInterest)) {
      setProfile(prev => ({
        ...prev,
        researchInterests: [...interests, newInterest.trim()]
      }));
    }
    setNewInterest('');
  };
  
  const handleRemoveInterest = (interest: string) => {
    const interests = profile.researchInterests || [];
    setProfile(prev => ({
      ...prev,
      researchInterests: interests.filter(i => i !== interest)
    }));
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      await updateUserProfile(profile);
      alert('プロフィールが保存されました。');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('プロフィールの保存に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">プロフィール編集</h1>
          <p className="text-muted-foreground">
            あなたのプロフィール情報を更新します。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main profile info */}
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="displayName">名前</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName || ''}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    placeholder="名前を入力"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="institution">所属大学 / 機関</Label>
                  <Input
                    id="institution"
                    value={profile.institution || ''}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    placeholder="〇〇大学"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="department">学部 / 研究科</Label>
                    <Input
                      id="department"
                      value={profile.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="〇〇学部 / 〇〇研究科"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="field">専攻 / 分野</Label>
                    <Input
                      id="field"
                      value={profile.field || ''}
                      onChange={(e) => handleInputChange('field', e.target.value)}
                      placeholder="〇〇学科 / 〇〇専攻"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="自己紹介を書いてください"
                    rows={5}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>研究分野・興味</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.researchInterests?.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button 
                          onClick={() => handleRemoveInterest(interest)}
                          className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/30"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    
                    {(!profile.researchInterests || profile.researchInterests.length === 0) && (
                      <p className="text-sm text-muted-foreground">興味のある分野を追加してください</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="新しい研究分野を追加"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleAddInterest}
                      disabled={!newInterest.trim()}
                    >
                      <PlusCircle className="w-5 h-5 mr-1" /> 追加
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="gradient-bg w-full"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? '保存中...' : 'プロフィールを保存'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Side panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>アカウント設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>アカウントタイプ</Label>
                  <div className="flex items-center">
                    <Badge variant={profile.role === 'graduate' ? "default" : "outline"}>
                      {profile.role === 'graduate' ? '大学院生' : '進学希望者'}
                    </Badge>
                  </div>
                </div>
                
                {profile.role === 'graduate' && (
                  <div className="space-y-4">
                    <Label htmlFor="consultation-toggle">相談受付ステータス</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="consultation-toggle"
                        checked={profile.acceptingConsultations || false}
                        onCheckedChange={(checked) => handleInputChange('acceptingConsultations', checked)}
                      />
                      <span>{profile.acceptingConsultations ? '相談受付中' : '相談停止中'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      相談を受け付けない場合はオフにしてください。プロフィールに表示されます。
                    </p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/users/${currentUser.id}`)}
                  >
                    公開プロフィールを表示
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>アカウント切替</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    現在のアカウントタイプ:
                    <Badge className="ml-2" variant="outline">
                      {profile.role === 'graduate' ? '大学院生' : '進学希望者'}
                    </Badge>
                  </p>
                  
                  <Select
                    value={profile.role}
                    onValueChange={(value) => handleInputChange('role', value as UserRole)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="アカウントタイプを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">進学希望者</SelectItem>
                      <SelectItem value="graduate">大学院生</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <p className="text-xs text-muted-foreground">
                    ※アカウントタイプを変更すると、表示される情報や機能が変わります。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
