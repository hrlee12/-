import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MyFrame = ({ children }: Props) => {
  return (
    <>
      <main className='bg-wordBox bg-groupColor h-boxHeight'>{children}</main>
      <div className='character-idle fixed right-[0px] bottom-[0px]' />
    </>
  );
};

export default MyFrame;
