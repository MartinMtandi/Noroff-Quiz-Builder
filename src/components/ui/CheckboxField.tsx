import React, { ChangeEvent, FocusEvent, useState, useId } from 'react';
import Typography from './Typography';
import { useValidation } from './useValidation';
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
  const [checked, setChecked] = useState(false);
  const inputId = id || useId();
  const { error, validate } = useValidation(validators);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.checked ? 'checked' : '');
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
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
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.checkbox}
        />
        <Typography as="label" htmlFor={inputId} className={styles.label}>
          {label}
        </Typography>
      </div>

      {error && (
        <Typography as="p" className={styles.errorText}>
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
  label: "text-sm text-gray-700 cursor-pointer",
  errorText: "mt-1 text-sm text-red-600",
};

export default CheckboxField;
