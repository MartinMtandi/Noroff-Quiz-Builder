import React from 'react';

interface BadgeProps {
  className?: string;
  variant?: 'secondary' | 'primary';
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  secondary: 'bg-muted text-muted-foreground',
  primary: 'bg-gradient-primary text-white shadow-glow',
};

const Badge: React.FC<BadgeProps> = ({ variant = 'secondary', className, children }) => {
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className || ''}`}>
      {children}
    </span>
  );
};

export default Badge;
