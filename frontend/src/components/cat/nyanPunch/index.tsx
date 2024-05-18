import { useEffect, useState } from 'react';

interface NyanPunchProps {
  pos: number;
}

const NyanPunch = ({ pos }: NyanPunchProps) => {
  const [position, setPosition] = useState(2);

  useEffect(() => {
    window.setClickableArea.make();
  }, []);

  useEffect(() => {
    if (pos) {
      setPosition(pos);
    }
  }, [pos]);

  const getPositionClass = (condition: number) => {
    switch (condition) {
      case 1:
        return 'right-[30px] bottom-[75px]';
      case 2:
        return 'right-[90px] bottom-[75px]';
      case 3:
        return 'right-[150px] bottom-[75px]';
      case 4:
        return 'right-[210px] bottom-[75px]';
      case 5:
        return 'right-[270px] bottom-[75px]';
      case 6:
        return 'right-[330px] bottom-[75px]';
      default:
        return 'right-[30px] bottom-[75px]';
    }
  };

  return (
    <>
      <img
        src='public/assets/white_paw_72.png'
        alt={'a'}
        className={`w-10 h-10 fixed ${getPositionClass(position)} clickable-area`}
      />
    </>
  );
};

export default NyanPunch;
