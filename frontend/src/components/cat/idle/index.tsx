import { useEffect } from "react";

interface catProps {
  catId: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const IdleCat = ({ catId, onMouseEnter, onMouseLeave, onClick }: catProps) => {
  const imageUrl = `${import.meta.env.VITE_IMG_URL}/cat_idle_0${catId}.png`;

  const style = {
    backgroundImage: `url('${imageUrl}')`,
  };
  useEffect(() => {
    window.setClickableArea.make();
  }, [] 
  )
  return (
    <div
      className='character-idle fixed right-[0px] bottom-[0px] clickable-area'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    />
  );
};

export default IdleCat;
