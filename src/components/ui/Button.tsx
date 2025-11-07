import React from 'react';
function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'gradient' | 'gradientBorder' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantStyles: Record<string, string> = {
  outline:
    'me-2 mb-2 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700',
  gradient:
    'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-glow',
  gradientBorder:
    'relative inline-flex items-center justify-center p-0.5 overflow-hidden group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-gray-900 hover:text-white rounded-lg',
  ghost:
    'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-0 dark:text-gray-400 dark:hover:bg-gray-700 border-none',
};

const innerSpanStyles: Record<string, string> = {
  gradientBorder: 'relative inline-flex items-center justify-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent',
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
  if (variant === 'gradientBorder') {
    return (
      <button
        className={cx(baseStyles, variantStyles[variant])}
        {...rest}
      >
        <span className={cx(sizeStyles[size], innerSpanStyles.gradientBorder, className)}>
          {children}
        </span>
      </button>
    );
  }

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
