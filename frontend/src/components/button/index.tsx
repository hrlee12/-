import React from 'react';
import { buttonColor, buttonSizeType } from '@/components/button/types';
import { BUTTON_SIZE } from '@/components/button/constatnts.ts';

interface buttonProps {
  text: string;
  size: buttonSizeType;
  color: buttonColor;
  addStyle?: string;
  onClick: () => void;
}

const Button = ({ text, size, color, addStyle, onClick }: buttonProps) => {
  const buttonSize: React.CSSProperties = {
    width: BUTTON_SIZE[size].width,
    height: BUTTON_SIZE[size].height,
    fontSize: BUTTON_SIZE[size].fontSize,
    padding: BUTTON_SIZE[size].padding,
    color: 'white',
  };

  const colorClasses = {
    blue: 'bg-btnBlue shadow-[0_6px_#0386A4] active:shadow-[0_2px_#0386A4]',
    green: 'bg-btnGreen shadow-[0_6px_#397D26] active:shadow-[0_2px_#397D26]',
    navy: 'bg-btnNavy shadow-[0_6px_#141221] active:shadow-[0_2px_#141221]',
    gray: 'bg-btnGray shadow-[0_6px_#565656] active:shadow-[0_2px_#565656]',
  };

  return (
    <button
      style={buttonSize}
      type='button'
      className={`font-dnf m-2 rounded-lg relative border-0 leading-4 transition-all duration-100 active:translate-y-[4px] ${colorClasses[color]} ${addStyle}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
