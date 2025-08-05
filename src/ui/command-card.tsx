import { useState } from 'react';
import type {
  ArgInput,
  CustomCommandUI,
  InputFieldValues,
} from '../shared/types';
import './command-card.css';

interface CommandCardProps {
  command: CustomCommandUI;
  onExecute: (payload: Record<string, string> | undefined) => void;
}

export const CommandCard = ({ command, onExecute }: CommandCardProps) => {
  const [inputs, setInputs] = useState<ArgInput[]>([]);

  const addInput = () => {
    setInputs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), keyName: '', value: '' },
    ]);
  };

  const updateInput = (id: string, field: InputFieldValues, newVal: string) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: newVal } : input
      )
    );
  };

  const removeInput = (id: string) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const preparePayload = () => {
    return inputs.reduce<Record<string, string>>((acc, curr) => {
      if (curr.keyName.trim() !== '') {
        acc[curr.keyName] = curr.value;
      }
      return acc;
    }, {});
  };

  const handleExecute = () => {
    const payload = preparePayload();
    onExecute(payload);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <div>
          <h3 className='card-title'>{command.title}</h3>
          <p className='card-description'>{command.description}</p>
        </div>
        <div className='add-button-container'>
          <button onClick={addInput} className='cta-button'>
            +
          </button>
        </div>
      </div>

      <div className='inputs-container'>
        {inputs.map(({ id, keyName, value }) => (
          <div key={id} className='input-pair'>
            <input
              type='text'
              placeholder='Key'
              value={keyName}
              onChange={(e) => updateInput(id, 'keyName', e.target.value)}
              className='input'
            />
            <input
              type='text'
              placeholder='Value'
              value={value}
              onChange={(e) => updateInput(id, 'value', e.target.value)}
              className='input'
            />
            <button
              onClick={() => removeInput(id)}
              className='cta-button remove-button'
              aria-label='Remove input'
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleExecute} className='execute-button'>
        Execute
      </button>
    </div>
  );
};
