import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import Typography from '@/components/ui/Typography';
import RadioGroupField from '@/components/ui/RadioGroupField';
import CheckboxField from '@/components/ui/CheckboxField';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import { Answers } from '@/types/Index';
import { required } from '@/utils/validators';

const QuizPreview: React.FC = () => {
  const { questions } = useQuiz();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSingleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleMultipleChange = (qid: string, value: string, checked: boolean) => {
    setAnswers((prev) => {
      const prevArr = Array.isArray(prev[qid]) ? (prev[qid] as string[]) : [];
      const nextArr = checked ? [...prevArr, value] : prevArr.filter((v) => v !== value);
      return { ...prev, [qid]: nextArr };
    });
  };

  const handleShortChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Currently we just log answers; scoring can be implemented later.
    console.log('User answers', answers);
  };

  if (!questions.length) {
    return <Typography as="p" className="p-6">No questions available. Please build a quiz first.</Typography>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {questions.map((q, idx) => (
        <div key={q.id} className="space-y-3">
          <Typography as="h5" weight={500}>{idx + 1}. {q.title}</Typography>

          {q.type === 'single' && (
            <RadioGroupField
              submitted={submitted}
              validators={[required()]}
              label=""
              name={`q-${q.id}`}
              value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
              onChange={(e) => handleSingleChange(q.id, e.target.value)}
              options={q.options.map((o) => ({ label: o.text, value: o.text }))}
            />
          )}

          {q.type === 'multiple' && (
            <div className="space-y-2">
              {q.options.map((opt) => (
                <CheckboxField
                  key={opt.text}
                  label={opt.text}
                  checked={Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).includes(opt.text) : false}
                  onChange={(e) => handleMultipleChange(q.id, opt.text, e.target.checked)}
                  validators={[required('Please select at least one option')]}
                />
              ))}
            </div>
          )}

          {q.type === 'short' && (
            <InputField
              label="Your answer"
              submitted={submitted}
              validators={[required()]}
              value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
              onChange={(e) => handleShortChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="form-footer">
        <Button type="submit" variant="gradient" size="lg">Submit Answers</Button>
      </div>

      {submitted && (
        <Typography as="p" className="text-center text-green-600 font-medium">Thank you! Your answers have been recorded.</Typography>
      )}
    </form>
  );
};

export default QuizPreview