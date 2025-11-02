import React, { ChangeEvent, FocusEvent, useState } from 'react';
import Typography from './Typography';
import { useValidation } from './useValidation';
import { RadioGroupFieldProps } from '@/types/Index';

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
  const [value, setValue] = useState('');
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
      <Typography as="legend" className="mb-1 block text-sm text-gray-700 font-medium">{label}</Typography>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              {...props}
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Typography as="span">{opt.label}</Typography>
          </label>
        ))}
      </div>
      {error && (
        <Typography as="p" className="mt-1 text-sm text-red-600">
          {error}
        </Typography>
      )}
    </fieldset>
  );
};

export default RadioGroupField;
