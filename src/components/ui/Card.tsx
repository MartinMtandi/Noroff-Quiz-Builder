import { CardProps } from '@/types/Index';
import React, { useEffect, useRef, useState } from 'react';

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Card component
 * Adds a subtle bottom shadow on hover with smooth transition.
 */
const Card: React.FC<CardProps> = ({ children, className }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Observe when the card enters the viewport
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const base =
    'rounded-lg bg-white p-6 border border-gray-200 mx-6 mb-6 transition-all duration-500 ease-out transform';
  const hover = 'hover:shadow-[0_8px_6px_-6px_rgba(0,0,0,0.15)] hover:-translate-y-1';
  const hidden = 'opacity-0 scale-95';
  const shown = 'opacity-100 scale-100';

  return (
    <div ref={ref} className={cx(base, hover, visible ? shown : hidden, className)}>
      {children}
    </div>
  );
};

export default Card;
