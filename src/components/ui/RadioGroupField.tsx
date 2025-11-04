import React, { ChangeEvent, FocusEvent, useEffect } from "react";
import Typography from './Typography';
import * as fs from '@/utils/fieldStyles';
import { useValidation } from "../../hooks/useValidation";
import { RadioGroupFieldProps } from "@/types/Index";

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  name,
  options,
  validators,
  className,
  onBlur,
  onChange,
  value,
  submitted = false,
  ...props
}) => {
  const { error, validate } = useValidation(validators);

  useEffect(() => {
    if (submitted) validate(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, value]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  return (
    <fieldset className={className}>
      <Typography as="label" htmlFor={name} className={fs.label}>
        {label}
      </Typography>

      <div className={styles.optionGroup}>
        {options.map((opt) => (
          <label key={opt.value} className={styles.optionLabel}>
            <input
              {...props}
              type="radio"
              id={opt.value}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.radioInput}
            />
            <Typography as="span" htmlFor={opt.value}>{opt.label}</Typography>
          </label>
        ))}
      </div>

      {error && (
        <Typography as="p" className={fs.errorText}>
          {error}
        </Typography>
      )}
    </fieldset>
  );
};

const styles = {
  optionGroup: "flex flex-col gap-2 items-start",
  optionLabel: "inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer",
  radioInput: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
};

export default RadioGroupField;
