import { ReactNode } from 'react';
import '@/components/cat/idle/index.css';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';

interface Props {
  children: ReactNode;
}

const BasicFrame = ({ children }: Props) => {
  return (
    <>
      <main>
        <div className='fixed right-[100px] bottom-[50px] m-4 bg-frameColor w-boxWidth h-boxHeight rounded-boxRadius shadow-inputBoxShadow'>
          {children}
        </div>
      </main>
      <IdleCat catId={useSkinStore.getState().skinId} />
    </>
  );
};

export default BasicFrame;
