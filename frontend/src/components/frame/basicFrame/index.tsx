import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const BasicFrame = ({ children }: Props) => {
  return (
    <main className='m-4 bg-frameColor w-boxWidth h-boxHeight rounded-boxRadius'>
      {children}
    </main>
  );
};

export default BasicFrame;
