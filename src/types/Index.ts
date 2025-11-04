import { Validator } from "@/utils/validators";
import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

// Common props for all field components
interface BaseFieldProps {
  label: string;
  validators?: Validator[];
  submitted?: boolean;
}

// Shared type for option-based fields
export interface Option {
  label: string;
  value: string;
}

// Layout props
export interface LayoutProps {
  children: ReactNode;
}

// Field-specific props extending the base
export interface CheckboxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    BaseFieldProps {}

export interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export interface RadioGroupFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    BaseFieldProps {
  /** group name */
  name: string;
  /** options to render */
  options: Option[];
  /** controlled value */
  value: string;
}

export interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    BaseFieldProps {
  options: Option[];
}

export interface OptionItem {
  text: string;
  correct: boolean;
}

export interface OptionsFieldProps {
  type: 'single' | 'multiple';
  options: OptionItem[];
  setOptions: (opts: OptionItem[]) => void;
  submitted?: boolean;
}

/**
 * Question model – extend as needed.
 */
export interface Question {
  id: string;
  title: string;
  type: 'single' | 'multiple' | 'short';
  options: OptionItem[];
}

export interface State {
  questions: Question[];
  history: Question[][]; // stack of previous questions for simple undo
}

/* ---------- Context ---------- */
export interface QuizContextValue {
  questions: Question[];
  add: (q: Question) => void;
  update: (q: Question) => void;
  remove: (id: string) => void;
  clear: () => void;
  undo: () => void;
}

export interface BadgeProps {
  /** CSS utility classes */
  className?: string;
  /** Visual state of the badge */
  state: 'valid' | 'invalid' | 'badge';
  /** Text content to display inside the badge */
  text: string;
}
