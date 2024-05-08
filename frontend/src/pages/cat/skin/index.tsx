import { getMySkin } from '@/apis/member.ts';
import { useEffect, useState } from 'react';
import { MySkins } from '@/types/member';
import MyFrame from '@/components/frame/myFrame';

const MyCatSkin = () => {
  const [skins, setSkins] = useState<MySkins[]>([]);

  useEffect(() => {
    const getMySkins = async () => {
      try {
        const response = await getMySkin();
        setSkins(response);
        console.log(skins);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    getMySkins();
  }, []);

  return (
    <MyFrame>
      <div className='grid grid-cols-3 gap-4 p-4'>
        {' '}
        {skins.map((skin) => (
          <div
            key={skin.catId}
            className='border p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
          >
            <img
              src={skin.assetsUrl}
              alt={`Skin ${skin.catId}`}
              className='w-full h-40 object-cover rounded-md'
            />{' '}
            <div className='text-center mt-2'>
              <p>{`Cat ID: ${skin.catId}`}</p>
            </div>
          </div>
        ))}
      </div>
    </MyFrame>
  );
};

export default MyCatSkin;
