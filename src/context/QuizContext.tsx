import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Question, QuizContextValue, State } from '@/types/Index';

type Action =
  | { type: 'LOAD'; payload: Question[] }
  | { type: 'ADD'; payload: Question }
  | { type: 'UPDATE'; payload: Question }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'UNDO' };

/* ---------- Persistence helpers ---------- */
const LS_KEY = 'quiz-builder-questions';

const saveToStorage = (questions: Question[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify(questions));
};

const loadFromStorage = (): Question[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Question[]) : [];
  } catch (_) {
    return [];
  }
};

/* ---------- Reducer ---------- */
const withHistory = (state: State, next: Question[]): State => ({
  questions: next,
  history: [...state.history, state.questions],
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD':
      return { questions: action.payload, history: [] };
    case 'ADD':
      return withHistory(state, [...state.questions, action.payload]);
    case 'UPDATE':
      return withHistory(
        state,
        state.questions.map((q) => (q.id === action.payload.id ? action.payload : q)),
      );
    case 'REMOVE':
      return withHistory(state, state.questions.filter((q) => q.id !== action.payload));
    case 'CLEAR':
      return withHistory(state, []);
    case 'UNDO': {
      const prev = state.history.at(-1);
      if (!prev) return state; // nothing to undo
      return { questions: prev, history: state.history.slice(0, -1) };
    }
    default:
      return state;
  }
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { questions: [], history: [] });

  // initial load
  useEffect(() => {
    dispatch({ type: 'LOAD', payload: loadFromStorage() });
  }, []);

  // persist whenever questions change
  useEffect(() => {
    saveToStorage(state.questions);
  }, [state.questions]);

  // action creators exposed to components
  const value: QuizContextValue = {
    questions: state.questions,
    add: (q) => dispatch({ type: 'ADD', payload: q }),
    update: (q) => dispatch({ type: 'UPDATE', payload: q }),
    remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    undo: () => dispatch({ type: 'UNDO' }),
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

/* ---------- Hook ---------- */
export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within <QuizProvider>');
  return ctx;
};
