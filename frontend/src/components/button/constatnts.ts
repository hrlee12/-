export const BUTTON_SIZE = {
  admin: {
    width: '100px',
    height: '60px',
    fontSize: '24px',
    padding: '8px',
  },
  modal: {
    width: '80px',
    height: '50px',
    fontSize: '20px',
    padding: '8px',
  },
  square: {
    width: '80px',
    height: '80px',
    fontSize: '20px',
    padding: '12px',
  },
  small: {
    width: '100px',
    height: '40px',
    fontSize: '18px',
    padding: '8px',
  },
  alarm: {
    width: '40px',
    height: '30px',
    fontSize: '14px',
    padding: '6px',
  },
} as const;

export const BUTTON_TEXT_COLOR = 'white';

export const BUTTON_COLOR = {
  blue: 'bg-btnBlue shadow-[0_6px_#0386A4] active:shadow-[0_2px_#0386A4]',
  green: 'bg-btnGreen shadow-[0_6px_#397D26] active:shadow-[0_2px_#397D26]',
  navy: 'bg-btnNavy shadow-[0_6px_#141221] active:shadow-[0_2px_#141221]',
  gray: 'bg-btnGray shadow-[0_6px_#565656] active:shadow-[0_2px_#565656]',
  red: 'bg-btnRed shadow-[0_6px_#B6190A] active:shadow-[0_2px_#B6190A]',
};

export const BUTTON_DESIGN =
  'font-dnf m-2 rounded-lg relative border-0 leading-4 transition-all duration-100 active:translate-y-[4px]';
