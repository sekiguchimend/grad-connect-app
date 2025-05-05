
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { Badge } from './ui/badge';

interface UserCardProps {
  user: UserProfile;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/users/${user.id}`}>
      <div className="bg-card border border-border rounded-lg p-5 card-hover">
        <div className="flex items-center space-x-4">
          <div className="circle-connection w-16 h-16">
            <img 
              src={"/image.png"} 
              alt={user.displayName}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{user.displayName}</h3>
            <p className="text-muted-foreground text-sm">{user.institution}</p>
            <p className="text-sm">{user.department || "学部未設定"}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mt-2">
            {user.researchInterests?.slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Badge variant={user.role === 'graduate' ? "default" : "outline"}>
            {user.role === 'graduate' ? '大学院生' : '進学希望者'}
          </Badge>
          
          {user.role === 'graduate' && (
            <Badge variant={user.acceptingConsultations ? "default" : "outline"}>
              {user.acceptingConsultations ? '相談受付中' : '相談停止中'}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
