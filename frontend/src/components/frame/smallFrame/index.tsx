import { ReactNode } from 'react';
import '@/components/cat/idle/index.css';

interface Props {
  children: ReactNode;
}

const SmallFrame = ({ children }: Props) => {
  return (
    <>
      <main>
        <div className='fixed bottom-20 left-10 bg-frameColor w-boxWidth h-48 rounded-boxRadius'>
          {children}
        </div>
      </main>
      <div className='character-idle fixed right-[0px] bottom-[0px]' />
    </>
  );
};

export default SmallFrame;
