import { ReactNode, useEffect } from 'react';
import '@/components/cat/idle/index.css';

interface Props {
  children: ReactNode;
}

const SmallFrameNoCat = ({ children }: Props) => {
  useEffect(() => {
    window.setClickableArea.make();
  }, []);
  return (
    <>
      <main>
        <div className='fixed right-[80px] bottom-[80px] bg-frameColor w-boxWidth h-48 rounded-boxRadius clickable-area'>
          {children}
        </div>
      </main>
      {/*<div className='character-idle fixed right-[0px] bottom-[0px]' />*/}
    </>
  );
};

export default SmallFrameNoCat;
