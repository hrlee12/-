import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SmallFrame = ({ children }: Props) => {
  return (
    <main className='fixed bottom-3 m-4 bg-frameColor w-boxWidth h-60 rounded-boxRadius'>
      {children}
    </main>
  );
};

export default SmallFrame;
