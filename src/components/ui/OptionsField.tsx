import React from 'react';
import { InputField, Button, Typography } from '@/components/ui';
import { Trash2 } from '@/components/icons/Index';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import { Add } from '../icons/Index';
import { required } from '../../utils/validators';
import { OptionsFieldProps } from '@/types/Index';

const OptionsField: React.FC<OptionsFieldProps> = ({ type, options, setOptions, submitted = false }) => {
  const canDelete = options.length > 2;

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

  const removeOption = (idx: number) => {
    if (!canDelete) return;
    const newOpts = options.filter((_, i) => i !== idx);
    setOptions(newOpts);
  };

  const addOption = () => {
    setOptions([...options, { text: '', correct: false }]);
  };

  return (
    <div className="space-y-3">
      <Typography as="h5" weight={500}>*Options</Typography>
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
          <div className="relative flex-1">
            <InputField
              label=""
              placeholder={`Option ${idx + 1}`}
              value={opt.text}
              onChange={(e) => handleTextChange(idx, e.target.value)}
              validators={[required()]}
              submitted={submitted}
            />
            <Button
              variant="ghost"
              size="sm"
              type="button"
              aria-label="Delete option"
              disabled={!canDelete}
              onClick={() => removeOption(idx)}
              className={styles.deleteButton}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      ))}
      <Button className='gap-2' variant="gradient" size="md" type="button" onClick={addOption}>
         <Add className="h-4 w-4" /> Add Option
      </Button>
    </div>
  );
};

const styles = {
  deleteButton: "absolute inset-y-0 right-1.5 top-1 my-auto p-2 flex items-center justify-center gap-0 disabled:opacity-40",
}

export default OptionsField;
