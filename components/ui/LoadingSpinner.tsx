import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = ''
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-primary ${sizes[size]} ${className}`}
        role="status"
      >
        <span className="sr-only">加载中...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 