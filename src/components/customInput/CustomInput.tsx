import { memo } from 'react';

import s from './CustomInputText.module.css';

import { ReturnComponentType } from 'types';

type InputProps = {
  placeholder: string;
  typeInput: string;
  className?: string;
  onChange: () => void;
  value: string;
  name?: string;
};

export const CustomInput = memo(
  ({
    placeholder,
    typeInput,
    className,
    value,
    onChange,
    name,
  }: InputProps): ReturnComponentType => (
    <div className={s.inputWrap}>
      <input
        size={40}
        type={typeInput}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className ?? s.input}
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
      />
    </div>
  ),
);
