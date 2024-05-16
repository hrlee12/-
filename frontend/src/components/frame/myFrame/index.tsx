import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const MyFrame = ({ children }: Props) => {
  useEffect(() => {
    window.setClickableArea.make();
  }, []);
  return (
    <>
      <main className='fixed right-[10px] bottom-[50px] m-4 bg-wordBox h-boxHeight w-[480px] clickable-area'>
        {children}
      </main>
      <IdleCat catId={useSkinStore.getState().skinId} />
    </>
  );
};

export default MyFrame;
