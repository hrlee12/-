import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const SmallFrame = ({ children }: Props) => {
  useEffect(() => {
    window.setClickableArea.make();
  }, []);
  return (
    <main className='fixed bottom-3 m-4 bg-frameColor w-boxWidth h-60 rounded-boxRadius clickable-area'>
      {children}
    </main>
  );
};

export default SmallFrame;
