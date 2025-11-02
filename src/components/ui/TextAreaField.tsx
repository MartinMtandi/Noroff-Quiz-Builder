import React, { ChangeEvent, FocusEvent, useState, useId } from 'react';
import Typography from './Typography';
import { Validator } from './validators';
import { useValidation } from './useValidation';
import { TextAreaFieldProps } from '@/types/Index';

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  validators,
  className,
  onBlur,
  onChange,
  id,
  ...props
}) => {
  const [value, setValue] = useState('');
  const { error, validate } = useValidation(validators);
  const textAreaId = id || useId();

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    validate(e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  const base =
    'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none';
  const errorStyle = 'border-red-500 focus:border-red-500 focus:ring-red-500';

  return (
    <div className={className}>
      <Typography as="label" htmlFor={textAreaId} className="mb-1 block text-sm text-gray-700 font-medium">{label}</Typography>
      <textarea id={textAreaId}
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={error ? `${base} ${errorStyle}` : base}
      />
      {error && (
        <Typography as="p" className="mt-1 text-sm text-red-600">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TextAreaField;
