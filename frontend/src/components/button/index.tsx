import React from 'react';
import { buttonColor, buttonSizeType } from '@/components/button/types';
import * as constants from '@/components/button/constatnts.ts';

interface buttonProps {
  text: string;
  size: buttonSizeType;
  color: buttonColor;
  addStyle?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, size, color, addStyle, onClick }: buttonProps) => {
  const buttonSize: React.CSSProperties = {
    width: constants.BUTTON_SIZE[size].width,
    height: constants.BUTTON_SIZE[size].height,
    fontSize: constants.BUTTON_SIZE[size].fontSize,
    padding: constants.BUTTON_SIZE[size].padding,
    color: constants.BUTTON_TEXT_COLOR,
  };

  const colorClasses = {
    blue: constants.BUTTON_COLOR.blue,
    green: constants.BUTTON_COLOR.green,
    navy: constants.BUTTON_COLOR.navy,
    gray: constants.BUTTON_COLOR.gray,
    red: constants.BUTTON_COLOR.red,
  };

  return (
    <button
      style={buttonSize}
      type='button'
      className={`${constants.BUTTON_DESIGN} ${colorClasses[color]} ${addStyle}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
