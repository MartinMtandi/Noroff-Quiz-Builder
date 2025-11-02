export type Validator = (value: string) => string | null;

// Basic validators
export const required = (message = 'This field is required'): Validator => (value) =>
  value.trim() ? null : message;

export const minLength = (length: number, message?: string): Validator => (value) =>
  value.length >= length ? null : message || `Must be at least ${length} characters`;

export const email = (message = 'Invalid email address'): Validator => (value) =>
  /^[\w.+\-]+@[\w-]+\.[\w.-]+$/.test(value) ? null : message;

export const pattern = (regex: RegExp, message: string): Validator => (value) =>
  regex.test(value) ? null : message;

// Compose multiple validators into one
export const composeValidators = (...validators: Validator[]): Validator => (value) => {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return null;
};
