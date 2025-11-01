import React from 'react';
function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantStyles: Record<string, string> = {
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  gradient: 'bg-gradient-primary text-white shadow-glow',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
