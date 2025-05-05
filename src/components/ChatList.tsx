
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: string;
  userId: string;
  displayName: string;
  photoURL: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  online: boolean;
  university?: string;
}

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  formatTime: (date: Date) => string;
}

const ChatList = ({ chats, activeChat, setActiveChat, formatTime }: ChatListProps) => {
  return (
    <ScrollArea className="h-[400px]">
      {chats.map(chat => (
        <div 
          key={chat.id}
          className={`px-4 py-3 hover:bg-muted/30 cursor-pointer transition-all ${
            activeChat === chat.id ? 'bg-muted/40' : ''
          }`}
          onClick={() => setActiveChat(chat.id)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={chat.photoURL} alt={chat.displayName} />
                <AvatarFallback className="font-medium bg-primary/10 text-primary">
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
                  {formatTime(chat.timestamp)}
                </span>
              </div>
              <p className={`text-sm truncate ${chat.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                {chat.lastMessage}
              </p>
              {chat.university && (
                <p className="text-xs truncate text-muted-foreground">
                  {chat.university}
                </p>
              )}
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
      
      {chats.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          <p>メッセージがありません</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatList;
