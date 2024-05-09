import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MyFrame = ({ children }: Props) => {
  return (
    <>
      <main className='m-4 bg-wordBox h-boxHeight'>{children}</main>
      <IdleCat catId={useSkinStore.getState().skinId} />
    </>
  );
};

export default MyFrame;
