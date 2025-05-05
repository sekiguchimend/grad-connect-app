
import { useState, useEffect } from 'react';
import { useAuth, getMockUsers } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import { SearchFilters, UserProfile, UserRole } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

const Index = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    role: undefined,
    acceptingConsultations: true,
    query: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  useEffect(() => {
    if (!isLoading && !currentUser) {
      // ログインしていない場合はログインページにリダイレクト
      navigate('/login');
    } else {
      // デモ用のモックデータを使用
      setUsers(getMockUsers().filter(user => user.id !== currentUser?.id));
    }
  }, [currentUser, isLoading, navigate]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredUsers = users.filter(user => {
    // ロールフィルターを適用
    if (filters.role && filters.role !== 'all' && user.role !== filters.role) {
      return false;
    }
    
    // 相談受付フィルターを適用
    if (filters.acceptingConsultations && user.role === 'graduate' && !user.acceptingConsultations) {
      return false;
    }
    
    // テキスト検索を適用
    if (filters.query && !user.displayName.toLowerCase().includes(filters.query.toLowerCase()) && 
        !user.institution?.toLowerCase().includes(filters.query.toLowerCase()) && 
        !user.department?.toLowerCase().includes(filters.query.toLowerCase()) && 
        !user.field?.toLowerCase().includes(filters.query.toLowerCase()) &&
        !user.researchInterests?.some(interest => 
          interest.toLowerCase().includes(filters.query!.toLowerCase())
        )
    ) {
      return false;
    }
    
    return true;
  });
  
  const resetFilters = () => {
    setFilters({
      role: undefined,
      acceptingConsultations: true,
      query: '',
    });
    setMobileFiltersOpen(false);
  };

  if (isLoading) {
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
  
  const hasActiveFilters = filters.role !== undefined || filters.query !== '';
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ユーザー検索</h1>
          <p className="text-muted-foreground">
            大学院生や進学希望者を検索して、つながりを作りましょう。
          </p>
        </div>
        
        {/* 検索とフィルター - PC表示 */}
        <Card className="mb-8 overflow-hidden border-border/40 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="名前、大学、専攻など..."
                className="pl-10 pr-4 py-2 bg-muted/30"
                value={filters.query || ''}
                onChange={(e) => handleFilterChange('query', e.target.value)}
              />
              {filters.query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
                  onClick={() => handleFilterChange('query', '')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="hidden md:flex items-end justify-between pt-2">
              <div className="grid grid-cols-2 gap-6 w-2/3">
                <div>
                  <Label htmlFor="role-filter" className="text-sm font-medium mb-1.5 block">
                    ユーザータイプ
                  </Label>
                  <Select
                    value={filters.role || 'all'}
                    onValueChange={(value) => handleFilterChange('role', value === 'all' ? undefined : value)}
                  >
                    <SelectTrigger id="role-filter" className="w-full">
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="graduate">大学院生</SelectItem>
                      <SelectItem value="prospect">進学希望者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 mt-8">
                  <Checkbox 
                    id="consultation-filter" 
                    checked={filters.acceptingConsultations}
                    onCheckedChange={(checked) => handleFilterChange('acceptingConsultations', checked)}
                  />
                  <Label htmlFor="consultation-filter">相談受付中のみ表示</Label>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {hasActiveFilters && (
                  <Button 
                    variant="ghost"
                    onClick={resetFilters}
                  >
                    <X className="mr-1 h-4 w-4" />
                    クリア
                  </Button>
                )}
                
                <Button 
                  variant="default"
                  className="gradient-bg"
                >
                  <Search className="mr-1 h-4 w-4" />
                  検索
                </Button>
              </div>
            </div>
            
            {/* モバイル用のフィルターボタン */}
            <div className="flex md:hidden justify-between pt-4">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    フィルター
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2">
                        {(filters.role ? 1 : 0) + (filters.acceptingConsultations ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>絞り込み検索</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <Label htmlFor="mobile-role-filter" className="text-sm font-medium mb-1.5 block">
                        ユーザータイプ
                      </Label>
                      <Select
                        value={filters.role || 'all'}
                        onValueChange={(value) => handleFilterChange('role', value === 'all' ? undefined : value)}
                      >
                        <SelectTrigger id="mobile-role-filter" className="w-full">
                          <SelectValue placeholder="すべて" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="graduate">大学院生</SelectItem>
                          <SelectItem value="prospect">進学希望者</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-consultation-filter" 
                        checked={filters.acceptingConsultations}
                        onCheckedChange={(checked) => handleFilterChange('acceptingConsultations', checked)}
                      />
                      <Label htmlFor="mobile-consultation-filter">相談受付中のみ表示</Label>
                    </div>
                  </div>
                  
                  <SheetFooter className="sm:justify-between border-t border-border pt-4 pb-2">
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="hidden sm:flex"
                    >
                      すべてクリア
                    </Button>
                    
                    <SheetClose asChild>
                      <Button className="gradient-bg">フィルターを適用</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="default"
                className="gradient-bg"
              >
                <Search className="mr-1 h-4 w-4" />
                検索
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* アクティブなフィルター */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">適用中のフィルター:</span>
            {filters.role && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.role === 'graduate' ? '大学院生' : '進学希望者'}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1" 
                  onClick={() => handleFilterChange('role', undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.query && (
              <Badge variant="secondary" className="flex items-center gap-1">
                検索: {filters.query}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1" 
                  onClick={() => handleFilterChange('query', '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.acceptingConsultations && (
              <Badge variant="secondary" className="flex items-center gap-1">
                相談受付中のみ
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1" 
                  onClick={() => handleFilterChange('acceptingConsultations', false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7" 
              onClick={resetFilters}
            >
              すべてクリア
            </Button>
          </div>
        )}
        
        {/* 検索結果 */}
        <div className="mb-4 text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-primary" />
            <span>
              {filteredUsers.length} 人のユーザーが見つかりました
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">検索結果がありません</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                検索条件に一致するユーザーが見つかりませんでした。フィルターを調整するか、別のキーワードで検索してみてください。
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
