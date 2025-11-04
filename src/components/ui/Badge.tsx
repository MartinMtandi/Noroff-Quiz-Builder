import React from 'react';
import { BadgeProps } from '@/types/Index';

/* ------------ Icon components ------------ */
const baseIconClass = 'h-4 w-4';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${baseIconClass} ${className || ''}`}
    {...rest}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${baseIconClass} ${className || ''}`}
    {...rest}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6" />
    <path d="M9 9l6 6" />
  </svg>
);

/* ------------ Styles ------------ */
const stateStyles: Record<BadgeProps['state'], string> = {
  valid: 'bg-success/10 text-success',
  invalid: 'bg-destructive/10 text-destructive',
  badge: 'bg-success/10 text-success',
};

/* ------------ Component ------------ */
const Badge: React.FC<BadgeProps> = ({ state, text, className }) => {
  const Icon = state === 'valid' ? CheckIcon : state === 'invalid' ? CrossIcon : null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full h-6 px-2 text-xs font-medium leading-none whitespace-nowrap ${stateStyles[state]} ${
        className || ''
      }`}
    >
      {Icon && <Icon className={state === 'valid' ? 'text-success' : 'text-destructive'} aria-label={state} />}
      {text}
    </span>
  );
};

export default Badge;
