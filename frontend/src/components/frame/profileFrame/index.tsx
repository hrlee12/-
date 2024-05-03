import '@/components/frame/profileFrame/index.css';

interface url {
  imageUrl: string;
}

const ProfileFrame = ({ imageUrl }: url) => {
  return (
    <div className='circular-frame'>
      <img src={imageUrl} alt='프로필 이미지' />
    </div>
  );
};

export default ProfileFrame;
