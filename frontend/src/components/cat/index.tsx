interface catProps {
  catId: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const IdleCat = ({ catId, onMouseEnter, onMouseLeave, onClick }: catProps) => {
  const imageUrl = `https://mogaknyan.s3.ap-northeast-2.amazonaws.com/cat_idle_0${catId}.png`;

  const style = {
    backgroundImage: `url('${imageUrl}')`,
  };

  return (
    <div
      className='character-idle fixed right-[0px] bottom-[0px]'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    />
  );
};

export default IdleCat;
