import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MyFrame = ({ children }: Props) => {
  return (
    <>
      <main className='m-4 bg-wordBox h-boxHeight'>{children}</main>
      <div className='character-idle fixed right-[0px] bottom-[0px]' />
    </>
  );
};

export default MyFrame;
