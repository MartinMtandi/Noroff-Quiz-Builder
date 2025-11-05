import React, { ChangeEvent, FocusEvent, useId, useEffect } from 'react';
import Typography from './Typography';
import { InputFieldProps } from '@/types/Index';
import { useValidation } from '../../hooks/useValidation';
import * as fs from '@/utils/fieldStyles';

const InputField: React.FC<InputFieldProps> = ({
  label,
  validators,
  className,
  onBlur,
  onChange,
  submitted = false,
  id,
  value: controlledValue,
  ...props
}) => {
  const value = (controlledValue ?? '') as string;
  const { error, validate } = useValidation(validators);
  const inputId = id || useId();

  useEffect(() => {
    if (submitted) {
      validate(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, value]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className}>
      <Typography as="label" htmlFor={inputId} className={fs.label}>{label}</Typography>
      <input
        id={inputId}
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={error ? `${fs.baseInput} ${fs.baseError}` : fs.baseInput}
      />
      {error && (
        <Typography as="p" className={fs.errorText}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default InputField;
