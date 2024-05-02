import { ReactNode } from 'react';
import '@/components/cat/idle/index.css';

interface Props {
  children: ReactNode;
}

const BasicFrame = ({ children }: Props) => {
  return (
    <>
      <main>
        <div className='m-4 bg-frameColor w-boxWidth h-boxHeight rounded-boxRadius'>
          {children}
        </div>
      </main>
      <div className='character-idle fixed right-[0px] bottom-[0px]' />
    </>
  );
};

export default BasicFrame;

// ml-[424px] mt-[56px]
