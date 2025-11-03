import React, { ChangeEvent, FocusEvent, useId } from 'react';
import Typography from './Typography';
import * as fs from '@/utils/fieldStyles';
import { useValidation } from '../../hooks/useValidation';
import { CheckboxFieldProps } from '@/types/Index';

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  validators,
  className,
  onBlur,
  onChange,
  id,
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
      <div className={styles.checkboxGroup}>
        <input
          id={inputId}
          type="checkbox"
          {...props}
          checked={props.checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.checkbox}
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
  wrapper: "",
  checkboxGroup: "inline-flex items-center gap-2",
  checkbox: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
};

export default CheckboxField;
