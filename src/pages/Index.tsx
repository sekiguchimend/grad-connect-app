
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
import { Search } from 'lucide-react';

const Index = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    role: undefined,
    acceptingConsultations: true,
    query: '',
  });
  
  useEffect(() => {
    if (!isLoading && !currentUser) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      // Use mock data for demonstration
      setUsers(getMockUsers().filter(user => user.id !== currentUser?.id));
    }
  }, [currentUser, isLoading, navigate]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredUsers = users.filter(user => {
    // Apply role filter
    if (filters.role && user.role !== filters.role) {
      return false;
    }
    
    // Apply accepting consultations filter
    if (filters.acceptingConsultations && user.role === 'graduate' && !user.acceptingConsultations) {
      return false;
    }
    
    // Apply text search
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
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ユーザー検索</h1>
          <p className="text-muted-foreground">
            大学院生や進学希望者を検索して、つながりを作りましょう。
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="bg-card border border-border rounded-lg p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="名前、大学、専攻で検索..."
                  className="pl-10"
                  value={filters.query || ''}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="role-filter">ユーザータイプ</Label>
              <Select
                value={filters.role || undefined}
                onValueChange={(value) => handleFilterChange('role', value || undefined)}
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
            
            <div>
              <div className="flex items-center space-x-2 mt-8">
                <Checkbox 
                  id="consultation-filter" 
                  checked={filters.acceptingConsultations}
                  onCheckedChange={(checked) => handleFilterChange('acceptingConsultations', checked)}
                />
                <Label htmlFor="consultation-filter">相談受付中のみ表示</Label>
              </div>
            </div>
            
            <div className="text-right">
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  role: undefined,
                  acceptingConsultations: true,
                  query: '',
                })}
              >
                フィルターをリセット
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredUsers.length} 人のユーザーが見つかりました
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12">
              <p className="text-muted-foreground">検索結果がありません。フィルターを調整してお試しください。</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
