import React, { ChangeEvent, FocusEvent, useState } from "react";
import Typography from "./Typography";
import { useValidation } from "./useValidation";
import { RadioGroupFieldProps } from "@/types/Index";

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  name,
  options,
  validators,
  className,
  onBlur,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState("");
  const { error, validate } = useValidation(validators);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(value);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) validate(e.target.value);
    onChange?.(e);
  };

  return (
    <fieldset className={className}>
      <Typography as="label" htmlFor={name} className={styles.legend}>
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
        <Typography as="p" className={styles.errorText}>
          {error}
        </Typography>
      )}
    </fieldset>
  );
};

const styles = {
  legend: "mb-1 block text-sm font-medium text-gray-700",
  optionGroup: "flex flex-col gap-2",
  optionLabel: "inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer",
  radioInput: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
  errorText: "mt-1 text-sm text-red-600",
};

export default RadioGroupField;
