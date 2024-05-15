import { ReactNode, useEffect } from 'react';
import '@/components/cat/idle/index.css';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';

interface Props {
  children: ReactNode;
}

const BasicFrame = ({ children }: Props) => {
  useEffect(() => {
    window.setClickableArea.make();
  }, []);

  return (
    <>
      <main>
        <div className='m-4 bg-frameColor w-boxWidth h-boxHeight rounded-boxRadius shadow-inputBoxShadow clickable-area'>
          {children}
        </div>
      </main>
      <IdleCat catId={useSkinStore.getState().skinId} />
    </>
  );
};

export default BasicFrame;
