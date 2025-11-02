import React from 'react';

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card component
 * Adds a subtle bottom shadow on hover with smooth transition.
 */
const Card: React.FC<CardProps> = ({ children, className }) => {
  const baseStyles =
    'rounded-lg bg-white transition-shadow duration-300 ease-in-out';
  const hoverStyles = 'hover:shadow-[0_8px_6px_-6px_rgba(0,0,0,0.15)]';

  return <div className={cx(baseStyles, hoverStyles, className)}>{children}</div>;
};

export default Card;
