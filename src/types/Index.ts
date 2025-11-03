import { Validator } from "@/components/ui/validators";
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
  name: string;
  options: Option[];
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
