import React, { useState } from 'react';
import { InputField, RadioGroupField, Button, Typography, Badge } from '@/components/ui';
import OptionsField from '@/components/ui/OptionsField';
import { required } from '@/utils/validators';
import { OptionItem, Question } from '@/types/Index';
import { useQuiz } from '@/hooks/useQuiz';
import { Add, Trash2, ShieldCheck } from '@/components/icons/Index';

interface EditQuestionFormProps {
  question: Question;
}

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({ question }) => {
  const { update, remove } = useQuiz();
  const [success, setSuccess] = useState(false);
  const [questionType, setQuestionType] = useState<'single' | 'multiple' | 'short'>(question.type);
  const [submitted, setSubmitted] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(question.title);
  const [options, setOptions] = useState<OptionItem[]>(question.options);

  const allOptionsFilled = options.every((o) => o.text.trim() !== '');
  const hasCorrectOption = options.some((o) => o.correct);
  const isFormValid = questionTitle.trim() !== '' && (
    questionType === 'short' || (allOptionsFilled && hasCorrectOption)
  );

  const handleQuestionTypeChange = (type: 'single' | 'multiple' | 'short') => {
    setSuccess(false);
    // selecting a new type shows/hides fields; reset validation state
    setSubmitted(false);
    setQuestionType(type);
    setOptions([
      { text: '', correct: false },
      { text: '', correct: false },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(false);
    update({
      ...question,
      title: questionTitle.trim(),
      type: questionType,
      options,
    });
    setSuccess(true);
  };

  const handleDelete = () => {
    if (confirm('Delete this question?')) {
      remove(question.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={styles.questionHeader}>
        <ShieldCheck className={styles.shieldCheck} />
        <Typography as="p" color="text-blue-600" weight={500}>{questionTitle}</Typography>
        <Badge state={success ? 'valid' : (isFormValid ? 'valid' : 'invalid')} text={success ? 'Saved' : (isFormValid ? 'Valid' : 'Invalid')} />
      </div>

      <InputField
        value={questionTitle}
        label="*Question Title"
        labelAs="h5"
        labelClassName="font-medium pb-2"
        name="questionTitle"
        placeholder="Enter question title"
        validators={[required()]}
        submitted={submitted}
        onChange={(e) => {
          setSuccess(false);
          setQuestionTitle((e.target as HTMLInputElement).value);
        }}
      />

      <RadioGroupField
        submitted={submitted}
        label="*Question Type"
        labelClassName="font-medium pb-2"
        labelAs="h5"
        name="questionType"
        id={`questionType-${question.id}`}
        options={[
          { label: 'Single Choice', value: 'single' },
          { label: 'Multiple Choices', value: 'multiple' },
          { label: 'Short Text', value: 'short' },
        ]}
        validators={[required()]}
        value={questionType}
        onChange={(e) => handleQuestionTypeChange(e.target.value as 'single' | 'multiple' | 'short')}
      />

      {questionType !== 'short' && (
        <OptionsField
          submitted={submitted}
          type={questionType as 'single' | 'multiple'}
          options={options}
          setOptions={(opts) => {
            setSuccess(false);
            setOptions(opts);
          }}
        />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="gradientBorder" size="lg" type="submit" className="gap-2">
          <Add className="h-4 w-4" /> Save Changes
        </Button>
        <Button variant="outline" type="button" className="gap-2" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>
    </form>
  );
};

const styles = {
  questionHeader: 'flex items-center gap-2',
  shieldCheck: 'h-4 w-4 text-blue-600',
};

export default EditQuestionForm;
