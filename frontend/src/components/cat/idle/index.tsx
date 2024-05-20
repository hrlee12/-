import { useEffect } from 'react';

interface catProps {
  catId: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  position?: { right: number; bottom: number };
}

const IdleCat = ({
  catId,
  onMouseEnter,
  onMouseLeave,
  onClick,
  position = { right: 0, bottom: 0 },
}: catProps) => {
  const imageUrl = `${import.meta.env.VITE_IMG_URL}/cat_idle_0${catId}.png`;

  const style = {
    backgroundImage: `url('${imageUrl}')`,
    right: `${position.right}px`,
    bottom: `${position.bottom}px`,
  };

  useEffect(() => {
    window.setClickableArea.make();
  }, []);

  return (
    <div
      className='character-idle fixed clickable-area'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    />
  );
};

export default IdleCat;
