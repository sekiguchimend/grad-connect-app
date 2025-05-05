
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Send } from 'lucide-react';

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
  },
];

// Mock messages
const mockMessages = [
  {
    id: 'msg1',
    senderId: 'user2',
    content: 'はじめまして！東京大学の情報工学研究科について質問があります。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 'msg2',
    senderId: 'user1',
    content: 'こんにちは！どのような質問でしょうか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 'msg3',
    senderId: 'user2',
    content: '研究室の雰囲気や、入試の難易度について教えていただけると嬉しいです。特に、プログラミングのスキルはどの程度必要ですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
];

const Messages = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeChat, setActiveChat] = useState(mockChats[0]?.id || null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    // Scroll to bottom of message list when messages change
    const messageList = document.getElementById('message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending a message
    setTimeout(() => {
      const newMessage = {
        id: `msg${messages.length + 1}`,
        senderId: currentUser?.id || 'user1',
        content: message,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsSending(false);
    }, 500);
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">メッセージ</h1>
          <p className="text-muted-foreground">
            他のユーザーとのメッセージをここで管理します。
          </p>
        </div>
        
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="chats">すべてのチャット</TabsTrigger>
            <TabsTrigger value="unread">未読メッセージ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(80vh-200px)]">
              {/* Chat list */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/30 p-3 border-b border-border">
                  <h2 className="font-medium">メッセージ一覧</h2>
                </div>
                
                <ScrollArea className="h-[calc(80vh-240px)]">
                  {mockChats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-3 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${
                        activeChat === chat.id ? 'bg-muted/50' : ''
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="circle-connection w-12 h-12">
                          <img 
                            src={chat.photoURL} 
                            alt={chat.displayName}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{chat.displayName}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {chat.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm truncate text-muted-foreground">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                      
                      {chat.unread && (
                        <div className="flex justify-end mt-1">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {mockChats.length === 0 && (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>メッセージがありません</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {/* Chat window */}
              <div className="col-span-2 border border-border rounded-lg overflow-hidden flex flex-col">
                {activeChat ? (
                  <>
                    <div className="bg-muted/30 p-3 border-b border-border flex items-center space-x-3">
                      <div className="circle-connection w-10 h-10">
                        <img 
                          src={mockChats.find(chat => chat.id === activeChat)?.photoURL} 
                          alt={mockChats.find(chat => chat.id === activeChat)?.displayName}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="font-medium">
                        {mockChats.find(chat => chat.id === activeChat)?.displayName}
                      </h2>
                    </div>
                    
                    <ScrollArea 
                      className="flex-1 p-4" 
                      id="message-list"
                    >
                      <div className="space-y-4">
                        {messages.map(msg => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-3 text-sm ${
                                msg.senderId === currentUser.id 
                                  ? 'gradient-bg text-white' 
                                  : 'bg-secondary'
                              }`}
                            >
                              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                              <div 
                                className={`text-xs mt-1 ${
                                  msg.senderId === currentUser.id 
                                    ? 'text-white/70' 
                                    : 'text-muted-foreground'
                                }`}
                              >
                                {msg.timestamp.toLocaleTimeString('ja-JP', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="p-3 border-t border-border">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          title="ファイルを添付（開発中）"
                        >
                          <Paperclip className="w-5 h-5" />
                        </Button>
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="メッセージを入力..."
                          className="flex-1"
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button
                          className="gradient-bg"
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isSending}
                        >
                          <Send className="w-5 h-5 mr-2" />
                          送信
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
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">
                    現在、未読メッセージはありません。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Messages;
