import { useState } from 'react';
import { Validator, composeValidators } from './validators';

export const useValidation = (validators: Validator[] = []) => {
  const [error, setError] = useState<string | null>(null);

  const runValidation = (value: string) => {
    if (validators.length === 0) {
      setError(null);
      return null;
    }
    const err = composeValidators(...validators)(value);
    setError(err);
    return err;
  };

  return {
    error,
    validate: runValidation,
    setError,
  };
};
