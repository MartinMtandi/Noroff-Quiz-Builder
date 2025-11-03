import React, { useState } from 'react';
import { InputField, RadioGroupField, Button } from '@/components/ui';
import OptionsField from '@/components/ui/OptionsField';
import { required } from '@/utils/validators';
import { Add } from './icons/Index';

interface OptionItem { text: string; correct: boolean; }

const QuizBuilder: React.FC = () => {
    const [questionType, setQuestionType] = useState<'single' | 'multiple' | 'short' | ''>('');
    const [submitted, setSubmitted] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('');
    const [options, setOptions] = useState<OptionItem[]>([
        { text: '', correct: false },
        { text: '', correct: false },
    ]);

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
        // gather form values
        const payload = {
            questionTitle,
            questionType,
            options,
        };
        console.log('Form data:', payload);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
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
                    { label: 'Short text', value: 'short' },
                ]}
                validators={[required()]}
                onChange={(e) => handleQuestionTypeChange(e.target.value as 'single' | 'multiple' | 'short')}
            />

            {questionType !== '' && questionType !== 'short' && (
                <OptionsField submitted={submitted} type={questionType as 'single' | 'multiple'} options={options} setOptions={setOptions} />
            )}

            {/* Footer */}
            <div className="border-t pt-4 mt-4 flex justify-end -mx-6 px-6">
                <Button className="gap-2" variant="gradientBorder" size="lg" type="submit">
                    <Add className="h-4 w-4" /> Save Question
                </Button>
            </div>
        </form>
    );
};

export default QuizBuilder;