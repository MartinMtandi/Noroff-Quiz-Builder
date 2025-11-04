import React, { useState } from 'react';
import { InputField, RadioGroupField, Button, Typography, Badge } from '@/components/ui';
import { useQuiz } from '@/hooks/useQuiz';
import OptionsField from '@/components/ui/OptionsField';
import { required } from '@/utils/validators';
import { Add, ShieldCheck } from './icons/Index';
import { OptionItem } from '@/types/Index';

const QuizBuilder: React.FC = () => {
    const { add, questions } = useQuiz();
    const [questionType, setQuestionType] = useState<'single' | 'multiple' | 'short' | ''>('');
    const [submitted, setSubmitted] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('');
    const [options, setOptions] = useState<OptionItem[]>([
        { text: '', correct: false },
        { text: '', correct: false },
    ]);

    const allOptionsFilled = options.every((o) => o.text.trim() !== '');
  const hasCorrectOption = options.some((o) => o.correct);
  const isFormValid = questionTitle.trim() !== '' && questionType !== '' && (
    questionType === 'short' || (allOptionsFilled && hasCorrectOption)
  );

    const handleQuestionTypeChange = (type: 'single' | 'multiple' | 'short') => {
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
        if (!questionType) return; // type safety – don't save if not chosen
        add({
            id: crypto.randomUUID(),
            title: questionTitle.trim(),
            type: questionType as 'single' | 'multiple' | 'short',
            options,
        });
        // clear form for next question
        setQuestionTitle('');
        setQuestionType('');
        setOptions([
            { text: '', correct: false },
            { text: '', correct: false },
        ]);
        setSubmitted(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className={styles.question}>
                <ShieldCheck className={styles.shieldCheck} />
                <Typography as="p" color="text-blue-600" weight={500}>{(questions?.length ?? 0) + 1}</Typography>
                <Badge state={isFormValid ? 'valid' : 'invalid'} text={isFormValid ? 'Valid' : 'Invalid'} />
            </div>
                <InputField
                    value={questionTitle}
                    label="*Question Title"
                    name="questionTitle"
                    placeholder="Enter question title"
                validators={[required()]}
                submitted={submitted}
                onChange={(e) => setQuestionTitle((e.target as HTMLInputElement).value)}
            />
            <RadioGroupField
                submitted={submitted}
                label="*Question Type"
                name="questionType"
                id="questionType"
                options={[
                    { label: 'Single Choice', value: 'single' },
                    { label: 'Multiple Choices', value: 'multiple' },
                    { label: 'Short Text', value: 'short' },
                ]}
                validators={[required()]}
                onChange={(e) => handleQuestionTypeChange(e.target.value as 'single' | 'multiple' | 'short')}
            />

            {questionType !== '' && questionType !== 'short' && (
                <OptionsField submitted={submitted} type={questionType as 'single' | 'multiple'} options={options} setOptions={setOptions} />
            )}

            {/* Footer */}
            <div className={styles.footer}>
                <Button className="gap-2" variant="gradientBorder" size="lg" type="submit">
                    <Add className="h-4 w-4" /> Save Question
                </Button>
            </div>
        </form>
    );
};

const styles = {
  footer: "border-t pt-4 mt-4 flex justify-end -mx-6 px-6",
  question: "flex items-center gap-2",
  shieldCheck: "h-4 w-4 text-blue-600",
};

export default QuizBuilder;