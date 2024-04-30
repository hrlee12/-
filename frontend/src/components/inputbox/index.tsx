import React from 'react';

import { INPUT_TEXT_BOX_SIZE } from '@/components/inputbox/constants';
import { inputSizeType, inputType } from '@/components/inputbox/types';

interface InputBoxProps {
  name: string;
  addStyle?: string; // 추가 style이 필요할시 addstyle을 추가 가능함.
  size: inputSizeType; // small : 일반 inputBox, medium : 로그인, large : 채팅
  type: inputType;
  placeholder: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  name,
  addStyle,
  size,
  type,
  placeholder,
  value,
  onChange,
}: InputBoxProps) => {
  const boxSize: React.CSSProperties = {
    width: INPUT_TEXT_BOX_SIZE[size].width,
    height: INPUT_TEXT_BOX_SIZE[size].height,
    lineHeight: INPUT_TEXT_BOX_SIZE[size].height,
  };

  return (
    <input
      name={name}
      className={`font-neo bg-inputBoxColor shadow-inputBoxShadow rounded-full p-1 pl-5 text-3xl ${addStyle}`}
      style={boxSize}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputBox;
