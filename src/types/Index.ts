import { Validator } from "@/utils/validators";
import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

// Common props for all field components
interface BaseFieldProps {
  label: string;
  /** Optional additional classes for label */
  labelClassName?: string;
  /** Typography 'as' tag for label element */
  labelAs?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'legend';
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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>,
    BaseFieldProps {
  /** Controlled value */
  value: string;
  /** Tailwind classes applied directly to the <input> element */
  inputClassName?: string;
}

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

export interface Answers {
  [questionId: string]: string | string[];
}

export interface AccordionItem {
  /** Unique id for the item */
  id: string;
  /** Header element shown for the item */
  header: React.ReactNode;
  /** Content revealed when the item is open */
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Items to render */
  items: AccordionItem[];
  /** Allow multiple items to stay open simultaneously */
  allowMultiple?: boolean;
  /** Optional additional utility classes */
  className?: string;
}

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Callback when backdrop or close button is clicked */
  onClose: () => void;
  /** Optional title shown at the top */
  title?: React.ReactNode;
  /** Content */
  children: React.ReactNode;
  /** Optional footer element; if omitted, a default Close button is rendered */
  footer?: React.ReactNode;
  /** Custom class for dialog */
  className?: string;
}

export interface EditQuestionFormProps {
  question: Question;
}

