import React from 'react';

const iconClass = 'inline-block';

export const Undo: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} ${className || ''}`}> <path d="M12 5v3a7 7 0 1 1-7 7H3a9 9 0 1 0 9-9V3l-5 4 5 4V5z" /> </svg>
);

export const Trash2: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} ${className || ''}`}> <path d="M3 6h18M9 6V4h6v2m3 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6h14z" /> </svg>
);

export const Eye: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} ${className || ''}`}> <circle cx="12" cy="12" r="3" /> <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /> </svg>
);

export const Edit: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} ${className || ''}`}> <path d="M4 20h4l10-10-4-4L4 16v4zM18 2l4 4-4-4z" /> </svg>
);
