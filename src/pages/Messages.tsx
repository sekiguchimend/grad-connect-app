
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Paperclip, 
  Send, 
  Search, 
  Image, 
  FileText, 
  MoreVertical, 
  Phone,
  Video,
  Info,
  Smile,
  Bell
} from 'lucide-react';
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';
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
    photoURL: 'https://i.pravatar.cc/150?img=5',
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
    photoURL: 'https://i.pravatar.cc/150?img=8',
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
    photoURL: 'https://i.pravatar.cc/150?img=9',
    lastMessage: '資料を送っていただきありがとうございます！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false,
    online: true,
    university: '大阪大学',
  },
];

// Mock messages
const mockMessages = [
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
];

const Messages = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeChat, setActiveChat] = useState(mockChats[0]?.id || null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
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
      
      // 相手からの自動返信（デモ用）
      setTimeout(() => {
        const responseMessage = {
          id: `msg${messages.length + 2}`,
          senderId: 'user2',
          content: '返信ありがとうございます。もう少し詳しく教えていただけますか？',
          timestamp: new Date(),
          seen: false,
        };
        
        setMessages(prev => [...prev, responseMessage]);
        toast.success("新しいメッセージが届きました", {
          description: `${mockChats[0]?.displayName}さんからメッセージが届きました`,
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
            <div className="w-12 h-12 rounded-full gradient-bg animate-pulse-slow mx-auto mb-4"></div>
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">メッセージ</h1>
          <p className="text-muted-foreground">
            他のユーザーとのメッセージをここで管理します。
          </p>
        </div>
        
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="chats" className="px-6">すべてのチャット</TabsTrigger>
            <TabsTrigger value="unread" className="px-6">未読メッセージ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(80vh-200px)]">
              {/* チャットリスト */}
              <div className="border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-muted/20 p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="メッセージを検索..." 
                      className="pl-10" 
                    />
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(80vh-280px)]">
                  {filteredChats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-all ${
                        activeChat === chat.id ? 'bg-muted/40' : ''
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                            <AvatarImage src={chat.photoURL} alt={chat.displayName} />
                            <AvatarFallback className="font-medium">
                              {chat.displayName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`font-semibold truncate ${chat.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {chat.displayName}
                            </h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatMessageTime(chat.timestamp)}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${chat.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            {chat.lastMessage}
                          </p>
                          <p className="text-xs truncate text-muted-foreground">
                            {chat.university}
                          </p>
                        </div>
                      </div>
                      
                      {chat.unread && (
                        <div className="flex justify-end mt-1">
                          <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center bg-primary">
                            1
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {filteredChats.length === 0 && (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>メッセージがありません</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {/* チャットウィンドウ */}
              <div className="col-span-2 border border-border rounded-lg overflow-hidden flex flex-col shadow-sm">
                {activeChat ? (
                  <>
                    <div className="bg-muted/20 p-4 border-b border-border flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-white">
                          <AvatarImage 
                            src={activeChatDetails?.photoURL} 
                            alt={activeChatDetails?.displayName}
                          />
                          <AvatarFallback>
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
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                          <Info className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <ScrollArea 
                      className="flex-1 p-6" 
                      id="message-list"
                    >
                      <div className="space-y-6">
                        <div className="text-center">
                          <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                            今日
                          </span>
                        </div>
                        
                        {messages.map(msg => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                          >
                            {msg.senderId !== currentUser.id && (
                              <Avatar className="w-8 h-8 mr-2 mt-1">
                                <AvatarImage 
                                  src={activeChatDetails?.photoURL} 
                                  alt={activeChatDetails?.displayName}
                                />
                                <AvatarFallback>
                                  {activeChatDetails?.displayName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`max-w-[70%]`}>
                              <div 
                                className={`rounded-2xl py-2 px-4 text-sm shadow-sm ${
                                  msg.senderId === currentUser.id 
                                    ? 'gradient-bg text-white rounded-br-none' 
                                    : 'bg-secondary rounded-bl-none'
                                }`}
                              >
                                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                              </div>
                              
                              <div 
                                className={`flex items-center mt-1 text-xs ${
                                  msg.senderId === currentUser.id 
                                    ? 'justify-end' 
                                    : 'justify-start'
                                }`}
                              >
                                <span className="text-muted-foreground">
                                  {formatMessageTime(msg.timestamp)}
                                </span>
                                
                                {msg.senderId === currentUser.id && (
                                  <span className="ml-1 text-muted-foreground">
                                    {msg.seen ? ' • 既読' : ''}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex justify-start">
                            <Avatar className="w-8 h-8 mr-2 mt-1">
                              <AvatarImage 
                                src={activeChatDetails?.photoURL} 
                                alt={activeChatDetails?.displayName}
                              />
                              <AvatarFallback>
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
                    
                    <div className="p-4 border-t border-border">
                      <div className="flex items-end space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="rounded-full"
                            >
                              <Paperclip className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
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
                            className="pr-10 rounded-full"
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                          >
                            <Smile className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        </div>
                        
                        <Button
                          size="icon"
                          className="gradient-bg rounded-full"
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isSending}
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">
                        左側のリストからチャットを選択してください
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="unread">
            <Card className="shadow-sm">
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">未読メッセージなし</h3>
                <p className="text-muted-foreground">
                  現在、未読メッセージはありません。新しいメッセージが届くとここに表示されます。
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Messages;
