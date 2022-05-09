import './FormInput.scss';
import React, { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  maxlength?: number;
}

export const FormInput: React.FC<Props> = props => {
  return (
    <label className={['form-input', [props.className]].join(' ')}>
      <span className="form-input__input-label">{props.label}</span>
      <input
        maxLength={props.maxlength}
        type={props.type || 'text'}
        className="form-input__input"
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
};
