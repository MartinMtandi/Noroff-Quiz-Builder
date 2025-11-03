import { useContext } from 'react';
import { QuizContext } from '@/context/QuizContext';

/**
 * Convenience hook to access quiz context from anywhere.
 */
export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within <QuizProvider>');
  return ctx;
};
