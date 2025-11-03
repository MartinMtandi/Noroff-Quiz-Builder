import React, { useState } from 'react';
import { InputField, RadioGroupField } from '@/components/ui';
import OptionsField from '@/components/ui/OptionsField';
import { required } from '@/components/ui/validators';

interface OptionItem { text: string; correct: boolean; }

const QuizBuilder: React.FC = () => {
    const [questionType, setQuestionType] = useState<'single' | 'multiple' | 'short' | ''>('');
    const [options, setOptions] = useState<OptionItem[]>([
        { text: '', correct: false },
        { text: '', correct: false },
    ]);

    const handleQuestionTypeChange = (type: 'single' | 'multiple' | 'short') => {
        setQuestionType(type);
        setOptions([
            { text: '', correct: false },
            { text: '', correct: false },
        ]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                label="*Question Title"
                name="questionTitle"
                placeholder="Enter question title"
                validators={[required()]}
            />
            <RadioGroupField
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
                <OptionsField type={questionType as 'single' | 'multiple'} options={options} setOptions={setOptions} />
            )}
            {/* Future fields will go here */}
        </form>
    );
};

export default QuizBuilder;