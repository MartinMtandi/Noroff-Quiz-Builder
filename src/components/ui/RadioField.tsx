import React, { ChangeEvent, FocusEvent, useId } from 'react';
import Typography from './Typography';
import * as fs from '@/utils/fieldStyles';
import { useValidation } from '../../hooks/useValidation';
import { CheckboxFieldProps } from '@/types/Index';

// Re-use CheckboxFieldProps since both share same external API (except input type)
export type RadioFieldProps = CheckboxFieldProps & { name: string };

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  validators,
  className,
  onBlur,
  onChange,
  id,
  name,
  ...props
}) => {
  const inputId = id || useId();
  const { error, validate } = useValidation(validators);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.checked ? 'checked' : '');
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) validate(e.target.checked ? 'checked' : '');
    onChange?.(e);
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.radioGroup}>
        <input
          id={inputId}
          type="radio"
          name={name}
          {...props}
          checked={props.checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.radio}
        />
        <Typography as="label" htmlFor={inputId} className={fs.label}>
          {label}
        </Typography>
      </div>

      {error && (
        <Typography as="p" className={fs.errorText}>
          {error}
        </Typography>
      )}
    </div>
  );
};

const styles = {
  wrapper: '',
  radioGroup: 'inline-flex items-center gap-2',
  radio: 'h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500',
};

export default RadioField;
