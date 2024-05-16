import '@/components/frame/profileFrame/index.css';
import { useEffect } from 'react';

interface url {
  imageUrl: string;
}

const ProfileFrame = ({ imageUrl }: url) => {
  useEffect(() => {
    window.setClickableArea.make();
  }, []);
  return (
    <div className='circular-frame clickable-area'>
      <img src={imageUrl} alt='프로필 이미지' />
    </div>
  );
};

export default ProfileFrame;
