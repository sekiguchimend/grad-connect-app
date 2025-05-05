
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo = ({ size = 'md', withText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link to="/" className="flex items-center gap-3 cursor-pointer">
      <div className={`rounded-full bg-primary flex items-center justify-center ${sizeClasses[size]}`}>
        <span className="text-white font-bold">G</span>
      </div>
      
      {withText && (
        <h1 className={`font-bold text-primary ${textClasses[size]}`}>
          Grad Connect
        </h1>
      )}
    </Link>
  );
};

export default Logo;
