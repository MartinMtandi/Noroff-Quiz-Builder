import React, { ChangeEvent, FocusEvent, useState, useId } from 'react';
import Typography from './Typography';
import { useValidation } from './useValidation';
import { SelectFieldProps } from '@/types/Index';

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  validators,
  className,
  onBlur,
  onChange,
  id,
  ...props
}) => {
  const [value, setValue] = useState('');
  const { error, validate } = useValidation(validators);
  const selectId = id || useId();

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    validate(e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className}>
      <Typography as="label" htmlFor={selectId} className={styles.label}>{label}</Typography>
      <select id={selectId}
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={error ? `${styles.base} ${styles.errorStyle}` : styles.base}
      >
        <option value="" disabled hidden>
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
  label: "mb-1 block text-sm text-gray-700 font-medium",
};

export default SelectField;
