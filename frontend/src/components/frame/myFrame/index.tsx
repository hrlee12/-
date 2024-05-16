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
      <main className='m-4 bg-wordBox h-boxHeight clickable-area'>
        {children}
      </main>
      <IdleCat catId={useSkinStore.getState().skinId} />
    </>
  );
};

export default MyFrame;
