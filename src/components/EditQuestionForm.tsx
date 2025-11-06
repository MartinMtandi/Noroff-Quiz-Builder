import React, { useState } from 'react';
import { InputField, RadioGroupField, Button, Card } from '@/components/ui';
import OptionsField from '@/components/ui/OptionsField';
import { required } from '@/utils/validators';
import { OptionItem, Question } from '@/types/Index';
import { useQuiz } from '@/hooks/useQuiz';
import { Add, Trash2 } from '@/components/icons/Index';

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
    <Card className="relative">
      {/* Delete Button */}
      <Button
        variant="outline"
        size="sm"
        type="button"
        aria-label="Delete question"
        onClick={handleDelete}
        className={styles.btnDelete}
      >
        <Trash2 className={styles.iconDelete} />
      </Button>

      {/* Question Form */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <InputField
          value={questionTitle}
          label="*Question Title"
          labelAs="h5"
          labelClassName={styles.labelBase}
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
          labelClassName={styles.labelBase}
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
          onChange={(e) =>
            handleQuestionTypeChange(e.target.value as 'single' | 'multiple' | 'short')
          }
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
        <div className={styles.footerContainer}>
          <Button variant="gradientBorder" size="lg" type="submit" className="gap-2">
            <Add className={styles.iconSmall} /> Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

const styles = {
  btnDelete: 'absolute top-4 right-4 flex items-center justify-center gap-0',
  iconDelete: 'h-4 w-4 text-red-600',
  formContainer: 'space-y-4',
  labelBase: 'font-medium pb-2',
  footerContainer: 'flex items-center justify-end pt-6 -mx-6 px-6 border-t',
  iconSmall: 'h-4 w-4',
};


export default EditQuestionForm;
