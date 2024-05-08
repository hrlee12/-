import { getMySkin } from '@/apis/member.ts';
import { useEffect } from 'react';

const MyCatSkin = () => {
  useEffect(() => {
    const getMySkins = async () => {
      try {
        const response = await getMySkin();
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    getMySkins();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default MyCatSkin;
