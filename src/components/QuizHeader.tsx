import React from 'react';
import { Undo, Trash2, Eye, Edit } from '@/components/icons/Index';
import { Button, Badge, Typography } from '@/components/ui';
import NoroffLogo from '@/assets/noroff-logo.png';

/**
 * Temporary internal state and handlers to make the component self-contained.
 * Replace with your own state-management / context implementation later.
 */
const useQuizHeaderState = () => {
  const [quiz, setQuiz] = React.useState({ questions: [] as unknown[] });
  const [history, setHistory] = React.useState<typeof quiz[]>([]);
  const [mode, setMode] = React.useState<'edit' | 'preview'>('edit');
  const [showClearDialog, setShowClearDialog] = React.useState(false);

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setQuiz(previous);
    setHistory(history.slice(0, -1));
  };

  const canUndo = history.length > 0;

  const toggleMode = () => setMode((m) => (m === 'edit' ? 'preview' : 'edit'));

  const clearQuiz = () => {
    setHistory((h) => [...h, quiz]);
    setQuiz({ questions: [] });
    setShowClearDialog(false);
  };

  return {
    quiz,
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
    quiz,
    mode,
    toggleMode,
    handleUndo,
    canUndo,
    setShowClearDialog,
  } = useQuizHeaderState();

  return (
    <header className="w-full bg-gradient-card shadow-elegant backdrop-blur-sm">
      <div className="container mx-auto">
        <div
          className="relative flex justify-center border-b p-6"
        >
          <img src={NoroffLogo} alt="Noroff logo" className="h-8 relative z-10" />
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex gap-3">
            <div className="text-left">
              <Typography as="h1" weight={500}>Quiz Builder</Typography>
              <div className="mt-1 flex gap-2">
                <Typography as="p" color="text-gray-500">Create and preview accessible quizzes</Typography>
                {quiz.questions.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {quiz.questions.length}{' '}
                    {quiz.questions.length === 1 ? 'Question' : 'Questions'}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
              className="gap-2"
            >
              <Undo className="h-4 w-4" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              disabled={quiz.questions.length === 0}
              className="gap-2 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Clear Quiz
            </Button>
            <Button
              variant={mode === 'preview' ? 'gradient' : 'outline'}
              size="sm"
              onClick={toggleMode}
              disabled={quiz.questions.length === 0}
              className="gap-2"
            >
              {mode === 'edit' ? (
                <>
                  <Eye className="h-4 w-4" /> Preview
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" /> Edit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default QuizHeader;
