import React from 'react';

// Utility to merge class names
function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export type TypographyVariant =
  | 'p'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label' | 'legend';

type FontWeight = 'normal' | 500;

interface TypographyProps extends Record<string, any> {
  /** HTML tag to render. Determines default sizing */
  as?: TypographyVariant;
  /** Font weight */
  weight?: FontWeight;
  /** Tailwind CSS color class or inline value */
  color?: string;
}

const sizeClasses: Record<TypographyVariant, string> = {
  p: 'text-base',
  span: 'text-base',
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base font-semibold',
  label: 'text-sm',
  legend: 'text-sm',
};

const weightClasses: Record<FontWeight, string> = {
  normal: 'font-normal',
  500: 'font-medium',
};

const Typography: React.FC<TypographyProps> = ({
  as = 'p',
  weight = 'normal',
  color,
  className,
  children,
  ...rest
}) => {
  const Tag: React.ElementType = as;
  const colorClass = color ? color : 'text-gray-900';

  return (
    <Tag
      className={cx(sizeClasses[as], weightClasses[weight], colorClass, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Typography;
