import React from 'react';
import { InputField, Button, Typography } from '@/components/ui';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import { Add } from '../icons/Index';

interface OptionItem {
  text: string;
  correct: boolean;
}

interface OptionsFieldProps {
  type: 'single' | 'multiple';
  options: OptionItem[];
  setOptions: (opts: OptionItem[]) => void;
}

const OptionsField: React.FC<OptionsFieldProps> = ({ type, options, setOptions }) => {
  const handleTextChange = (idx: number, value: string) => {
    const newOpts = [...options];
    newOpts[idx].text = value;
    setOptions(newOpts);
  };

  const handleCorrectChange = (idx: number, checked: boolean) => {
    const newOpts = options.map((opt, i) => {
      if (type === 'single') {
        return { ...opt, correct: i === idx ? checked : false };
      }
      // multiple
      if (i === idx) return { ...opt, correct: checked };
      return opt;
    });
    setOptions(newOpts);
  };

  const addOption = () => {
    setOptions([...options, { text: '', correct: false }]);
  };

  return (
    <div className="space-y-3">
      <Typography as="label" weight={500}>*Options</Typography>
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-start gap-2">
          {type === 'single' ? (
            <RadioField
              label=""
              name="correctOption"
              checked={opt.correct}
              onChange={(e) => handleCorrectChange(idx, (e.target as HTMLInputElement).checked)}
              className="mt-3"
            />
          ) : (
            <CheckboxField
              label=""
              checked={opt.correct}
              onChange={(e) => handleCorrectChange(idx, (e.target as HTMLInputElement).checked)}
              className="mt-3"
            />
          )}
          <div className="flex-1">
            <InputField
              label=""
              placeholder={`Option ${idx + 1}`}
              value={opt.text}
              onChange={(e) => handleTextChange(idx, e.target.value)}
            />
          </div>
        </div>
      ))}
      <Button className='gap-2' variant="gradient" size="md" type="button" onClick={addOption}>
         <Add className="h-4 w-4" /> Add Option
      </Button>
    </div>
  );
};

export default OptionsField;
