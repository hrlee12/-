import { getMySkin, patchMySkin } from '@/apis/member.ts';
import { useEffect, useState } from 'react';
import { MySkins } from '@/types/member';
import MyFrame from '@/components/frame/myFrame';
import Button from '@/components/button';
import { useSkinStore } from '@/stores/useSkinStore.ts';
import { useNavigate } from 'react-router-dom';

const MyCatSkin = () => {
  const navigate = useNavigate();
  const [skins, setSkins] = useState<MySkins[]>([]);
  const mySkinId = useSkinStore.getState().skinId;
  const [boxId, setBoxId] = useState<number>(mySkinId);

  useEffect(() => {
    const getMySkins = async () => {
      try {
        const response = await getMySkin();
        setSkins(response.cats);
      } catch (error) {
        console.log(error);
      }
    };

    getMySkins();
  }, []);

  const selectSkin = async (catId: number) => {
    await patchMySkin(catId);
    useSkinStore.getState().setSkinId(catId);
    console.log(catId);
    navigate(-1);
  };

  return (
    <MyFrame>
      <div className={'font-dnf text-4xl pt-16 pb-5 text-center'}>
        냥이 목록
      </div>
      <div className='grid grid-cols-3 gap-2 px-16'>
        {skins.map((skin) => (
          <div
            key={skin.catId}
            className={`border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${boxId === skin.catId ? 'border-btnBlue' : ''}`}
            style={{
              borderWidth: boxId === skin.catId ? '3px' : '1px',
            }}
            onClick={() => setBoxId(skin.catId)}
          >
            <div
              className='character-idle'
              id='clickable-area'
              style={{
                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/cat_idle_0${skin.catId}.png)`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className={'flex justify-center'}>
        <Button
          text={'선택'}
          size={'small'}
          color={'blue'}
          onClick={() => selectSkin(boxId)}
        />
      </div>
    </MyFrame>
  );
};

export default MyCatSkin;
