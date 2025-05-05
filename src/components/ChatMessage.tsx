
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    seen: boolean;
  };
  currentUserId: string;
  senderDetails: {
    photoURL?: string;
    displayName: string;
  };
  formatTime: (date: Date) => string;
}

const ChatMessage = ({ message, currentUserId, senderDetails, formatTime }: ChatMessageProps) => {
  const isOwnMessage = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {!isOwnMessage && (
        <Avatar className="w-8 h-8 mr-2 mt-1">
          <AvatarImage 
            src={senderDetails?.photoURL} 
            alt={senderDetails?.displayName}
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {senderDetails?.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%]`}>
        <div 
          className={`rounded-2xl py-2 px-4 text-sm shadow-sm ${
            isOwnMessage 
              ? 'bg-primary text-white rounded-br-none' 
              : 'bg-secondary rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        
        <div 
          className={`flex items-center mt-1 text-xs ${
            isOwnMessage ? 'justify-end' : 'justify-start'
          }`}
        >
          <span className="text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          
          {isOwnMessage && (
            <span className="ml-1 text-muted-foreground">
              {message.seen ? ' • 既読' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
