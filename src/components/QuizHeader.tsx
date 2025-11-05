import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Undo, Trash2, Eye, Edit } from '@/components/icons/Index';
import { Button, Badge, Typography } from '@/components/ui';
import LogoBanner from '@/components/LogoBanner';
import { useQuiz } from '@/hooks/useQuiz';

const useQuizHeaderState = () => {
  const { questions, undo, clear } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = React.useState<'edit' | 'preview'>(location.pathname === '/quiz-preview' ? 'preview' : 'edit');
  const [showClearDialog, setShowClearDialog] = React.useState(false);

  const handleUndo = () => undo();
  const canUndo = questions.length > 0; // disable if no questions (approx. history empty)

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'edit' ? 'preview' : 'edit';
      navigate(next === 'preview' ? '/quiz-preview' : '/');
      return next;
    });
  };

  const clearQuiz = () => {
    clear();
    setShowClearDialog(false);
  };

  return {
    questions,
    mode,
    toggleMode,
    handleUndo,
    canUndo,
    setShowClearDialog,
    clearQuiz,
    showClearDialog,
  };
};

const QuizHeader: React.FC = () => {
  const {
    questions,
    mode,
    toggleMode,
    handleUndo,
    canUndo,
    setShowClearDialog,
  } = useQuizHeaderState();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoBanner />
        <div className={styles.banner}>
          {/* Left */}
          <div className={styles.left}>
            <div className={styles.title}>
              <Typography as="h1" weight={500}>Quiz Builder</Typography>
              <div className={styles.subtitle}>
                <Typography as="p" color="text-gray-500">Create and preview accessible quizzes</Typography>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={styles.actions}>
            <Button
              variant="outline"
              size="md"
              onClick={handleUndo}
              disabled={!canUndo}
              className={styles.iconButton}
            >
              <Undo className="h-4 w-4" /> Undo
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => setShowClearDialog(true)}
              disabled={questions.length === 0}
              className={styles.dangerButton}
            >
              <Trash2 className="h-4 w-4" /> Clear Quiz
            </Button>

            <Button
              variant={mode === "preview" ? "gradient" : "outline"}
              size="md"
              onClick={toggleMode}
              disabled={questions.length === 0}
              className={styles.iconButton}
            >
              {mode === "edit" ? (
                <>
                  <Eye className="h-4 w-4" /> Preview
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" /> Edit
                </>
              )}
              {questions.length > 0 && (
                <span className={styles.badge}>
                  {questions.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: "w-full bg-gradient-card shadow-elegant backdrop-blur-sm",
  container: "container mx-auto",
  banner: "bg-gradient-primary flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between",
  left: "flex gap-3",
  title: "text-left",
  subtitle: "mt-1 flex gap-2",
  actions: "flex flex-wrap gap-2",
  iconButton: "gap-2",
  dangerButton: "gap-2 hover:text-destructive hover:bg-destructive/10",
   badge:
    "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full",
};

export default QuizHeader;
