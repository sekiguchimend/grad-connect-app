
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import ChatList from '../components/ChatList';
import ChatMessage from '../components/ChatMessage';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Paperclip, 
  Send, 
  Search, 
  Image, 
  FileText, 
  Phone,
  Video,
  Info,
  Smile,
  Bell
} from 'lucide-react';
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock chat data
const mockChats = [
  {
    id: 'chat1',
    userId: 'user2',
    displayName: '鈴木 花子',
    photoURL: '/image.png',
    lastMessage: 'はじめまして！大学院について質問があります。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: true,
    online: true,
    university: '東京大学',
  },
  {
    id: 'chat2',
    userId: 'user3',
    displayName: '田中 太郎',
    photoURL: '/image2.png',
    lastMessage: '研究室の雰囲気についてもう少し詳しく教えていただけますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: false,
    online: false,
    university: '京都大学',
  },
  {
    id: 'chat3',
    userId: 'user4',
    displayName: '佐藤 美咲',
    photoURL: '/image3.png',
    lastMessage: '資料を送っていただきありがとうございます！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false,
    online: true,
    university: '大阪大学',
  },
];

// Mock messages by chat
const mockMessagesByChatId = {
  'chat1': [
    {
      id: 'msg1',
      senderId: 'user2',
      content: 'はじめまして！東京大学の情報工学研究科について質問があります。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      seen: true,
    },
    {
      id: 'msg2',
      senderId: 'user1',
      content: 'こんにちは！どのような質問でしょうか？',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      seen: true,
    },
    {
      id: 'msg3',
      senderId: 'user2',
      content: '研究室の雰囲気や、入試の難易度について教えていただけると嬉しいです。特に、プログラミングのスキルはどの程度必要ですか？',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      seen: true,
    },
    {
      id: 'msg4',
      senderId: 'user1',
      content: '研究室の雰囲気は和やかで、先輩方もとても親切です。入試については、基本的なアルゴリズムとデータ構造の知識が問われますが、特別高度なプログラミングスキルは必須ではありません。ただ、自分の研究テーマに関連する分野の基礎知識はしっかり押さえておくとよいでしょう。',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      seen: true,
    },
    {
      id: 'msg5',
      senderId: 'user2',
      content: 'なるほど、詳しい説明ありがとうございます！研究室の雰囲気が良いのは安心しました。入試対策としては、どのような勉強をすれば良いでしょうか？',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      seen: false,
    },
  ],
  'chat2': [
    {
      id: 'msg1',
      senderId: 'user3',
      content: 'こんにちは、京都大学の研究室について教えていただきたいです。',
      timestamp: new Date(Date.now() - 1000 * 60 * 200), // 200 minutes ago
      seen: true,
    },
    {
      id: 'msg2',
      senderId: 'user1',
      content: 'こんにちは！どのような点に興味がありますか？',
      timestamp: new Date(Date.now() - 1000 * 60 * 190), // 190 minutes ago
      seen: true,
    },
    {
      id: 'msg3',
      senderId: 'user3',
      content: '研究室の雰囲気についてもう少し詳しく教えていただけますか？',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      seen: false,
    }
  ],
  'chat3': [
    {
      id: 'msg1',
      senderId: 'user4',
      content: 'こんにちは、大阪大学の入試情報について教えてください。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
      seen: true,
    },
    {
      id: 'msg2',
      senderId: 'user1',
      content: 'こんにちは！こちらの資料が参考になると思います。ご確認ください。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
      seen: true,
    },
    {
      id: 'msg3',
      senderId: 'user4',
      content: '資料を送っていただきありがとうございます！',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      seen: true,
    }
  ]
};

const Messages = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeChat, setActiveChat] = useState(mockChats[0]?.id || null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Load the messages for the active chat
  useEffect(() => {
    if (activeChat && mockMessagesByChatId[activeChat]) {
      setMessages(mockMessagesByChatId[activeChat]);
    }
  }, [activeChat]);
  
  // メッセージが変更されたら最下部にスクロール
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // タイピングのシミュレーション
  useEffect(() => {
    if (message.length > 0) {
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
      
      setIsTyping(true);
      return () => clearTimeout(typingTimeout);
    } else {
      setIsTyping(false);
    }
  }, [message]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // メッセージ送信のシミュレーション
    setTimeout(() => {
      const newMessage = {
        id: `msg${messages.length + 1}`,
        senderId: currentUser?.id || 'user1',
        content: message,
        timestamp: new Date(),
        seen: false,
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsSending(false);
      
      // Update the mockMessagesByChatId for persistence during navigation
      if (activeChat) {
        mockMessagesByChatId[activeChat] = [...mockMessagesByChatId[activeChat], newMessage];
      }
      
      // 相手からの自動返信（デモ用）
      setTimeout(() => {
        // Get the active chat user
        const activeChatDetails = mockChats.find(chat => chat.id === activeChat);
        
        if (!activeChatDetails) return;
        
        const responseMessage = {
          id: `msg${messages.length + 2}`,
          senderId: activeChatDetails.userId,
          content: '返信ありがとうございます。もう少し詳しく教えていただけますか？',
          timestamp: new Date(),
          seen: false,
        };
        
        setMessages(prev => [...prev, responseMessage]);
        
        if (activeChat) {
          mockMessagesByChatId[activeChat] = [...mockMessagesByChatId[activeChat], responseMessage];
        }
        
        toast.success("新しいメッセージが届きました", {
          description: `${activeChatDetails.displayName}さんからメッセージが届きました`,
        });
      }, 10000); // 10秒後に返信
      
    }, 500);
  };
  
  const filteredChats = mockChats.filter(chat => 
    chat.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.university?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeChatDetails = mockChats.find(chat => chat.id === activeChat);
  
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨日';
    } else {
      return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
    }
  };
  
  if (isLoading || !currentUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary animate-pulse-slow mx-auto mb-4"></div>
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted/30 p-1">
            <TabsTrigger 
              value="chats" 
              className="rounded-full text-sm font-medium"
            >
              すべてのチャット
            </TabsTrigger>
            <TabsTrigger 
              value="unread" 
              className="rounded-full text-sm font-medium"
            >
              未読メッセージ
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="mt-4">
            <div className="bg-card rounded-xl overflow-hidden shadow-sm">
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="メッセージを検索..." 
                    className="pl-9 rounded-full bg-muted/30 border-none text-sm" 
                  />
                </div>
              </div>
              
              <ChatList 
                chats={filteredChats} 
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                formatTime={formatMessageTime}
              />
            </div>
            
            {activeChat ? (
              <div className="mt-4 bg-card rounded-xl overflow-hidden shadow-sm">
                <div className="bg-muted/20 p-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage 
                        src={activeChatDetails?.photoURL} 
                        alt={activeChatDetails?.displayName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {activeChatDetails?.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">
                        {activeChatDetails?.displayName}
                      </h2>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {activeChatDetails?.online ? 
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            オンライン
                          </span> : 
                          "オフライン"
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea 
                  className="h-[400px] px-4 py-4" 
                  id="message-list"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-xs bg-muted/30 px-3 py-1 rounded-full text-muted-foreground">
                        今日
                      </span>
                    </div>
                    
                    {messages.map(msg => (
                      <ChatMessage
                        key={msg.id}
                        message={msg}
                        currentUserId={currentUser?.id || 'user1'}
                        senderDetails={{
                          photoURL: activeChatDetails?.photoURL,
                          displayName: activeChatDetails?.displayName || 'User'
                        }}
                        formatTime={formatMessageTime}
                      />
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <Avatar className="w-8 h-8 mr-2 mt-1">
                          <AvatarImage 
                            src={activeChatDetails?.photoURL} 
                            alt={activeChatDetails?.displayName}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {activeChatDetails?.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-none">
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messageEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="p-3 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="rounded-full"
                        >
                          <Paperclip className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-card">
                        <DropdownMenuItem className="flex items-center">
                          <Image className="mr-2 h-4 w-4" />
                          <span>画像を送信</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>ファイルを送信</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="flex-1 relative">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="メッセージを入力..."
                        className="pr-10 rounded-full bg-muted/30 border-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                      >
                        <Smile className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    <Button
                      size="icon"
                      className="bg-primary rounded-full h-10 w-10"
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 bg-card rounded-xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">メッセージを選択</h3>
                <p className="text-muted-foreground">
                  左側のリストからチャットを選択してください
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread">
            <Card className="p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">未読メッセージなし</h3>
              <p className="text-muted-foreground">
                現在、未読メッセージはありません。新しいメッセージが届くとここに表示されます。
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Messages;
