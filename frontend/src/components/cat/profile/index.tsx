import ProfileFrame from '@/components/frame/profileFrame';

interface catProps {
  catId: number;
}

const ProfileCat = (catId: catProps) => {
  const imageUrl = `${import.meta.env.VITE_IMG_URL}/cat_profile_0${catId.catId}.PNG`;

  return (
    <>
      <ProfileFrame imageUrl={imageUrl} />
    </>
  );
};

export default ProfileCat;
