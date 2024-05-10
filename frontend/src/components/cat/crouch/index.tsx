import '@/components/cat/crouch/index.css';

interface catProps {
  catId: number;
  addStyle?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const CrouchCat = ({
  catId,
  addStyle,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: catProps) => {
  const imageUrl = `${import.meta.env.VITE_IMG_URL}/cat_crouch_0${catId}.png`;

  const style = {
    backgroundImage: `url('${imageUrl}')`,
    ...addStyle,
  };

  return (
    <div
      className='character-crouch absolute'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    />
  );
};

export default CrouchCat;
