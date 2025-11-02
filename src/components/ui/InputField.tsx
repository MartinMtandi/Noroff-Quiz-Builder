import React, { ChangeEvent, FocusEvent, useState, useId } from 'react';
import Typography from './Typography';
import { InputFieldProps } from '@/types/Index';
import { useValidation } from './useValidation';

const InputField: React.FC<InputFieldProps> = ({
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
  const inputId = id || useId();

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className}>
      <Typography as="label" htmlFor={inputId}>{label}</Typography>
      <input
        id={inputId}
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={error ? `${styles.base} ${styles.errorStyle}` : styles.base}
      />
      {error && (
        <Typography as="p" className={styles.errorText}>
          {error}
        </Typography>
      )}
    </div>
  );
};

const styles = {
  errorText: "mt-1 text-sm text-red-600",
  errorStyle : 'border-red-500 focus:border-red-500 focus:ring-red-500',
  base : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
};

export default InputField;
