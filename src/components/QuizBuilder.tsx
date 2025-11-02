import React from 'react';
import { InputField, RadioGroupField } from '@/components/ui';
import { required } from '@/components/ui/validators';

const QuizBuilder: React.FC = () => {
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
            />
            {/* Future fields will go here */}
        </form>
    );
};

export default QuizBuilder;