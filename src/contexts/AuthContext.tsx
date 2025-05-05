
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types';

// Mock authentication for MVP
// In a real app, we'd use Firebase Auth or another authentication provider
interface AuthContextType {
  currentUser: UserProfile | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: UserProfile[] = [
  {
    id: 'user1',
    displayName: '田中 太郎',
    email: 'tanaka@example.com',
    role: 'graduate',
    institution: '東京大学',
    department: '工学系研究科',
    field: '情報工学',
    bio: '情報工学を専攻する大学院生です。AIとデータサイエンスに興味があります。',
    researchInterests: ['人工知能', 'データサイエンス', '機械学習'],
    acceptingConsultations: true,
    createdAt: new Date(),
    photoURL: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 'user2',
    displayName: '鈴木 花子',
    email: 'suzuki@example.com',
    role: 'prospect',
    institution: '京都大学',
    department: '理学部',
    field: '物理学',
    bio: '物理学専攻の学部生です。大学院進学を検討しています。',
    researchInterests: ['量子物理学', '素粒子物理学'],
    acceptingConsultations: false,
    createdAt: new Date(),
    photoURL: 'https://i.pravatar.cc/150?img=5'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate auth initialization
  useEffect(() => {
    // For demo, we'll auto-login as the first user
    // In a real app, this would check if a user is already authenticated
    const timer = setTimeout(() => {
      setCurrentUser(null);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    // Mock sign in - in real app this would use Firebase Auth
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, just set the current user to the first mock user
    setCurrentUser(mockUsers[0]);
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentUser(null);
    setIsLoading(false);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
    }
    
    setIsLoading(false);
  };

  const value = {
    currentUser,
    isLoading,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Expose mock users for demo purposes
export const getMockUsers = () => mockUsers;
