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
  outline:
    'me-2 mb-2 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700',
  gradient:
    'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 shadow-glow',
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
