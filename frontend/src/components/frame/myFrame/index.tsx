import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MyFrame = ({ children }: Props) => {
  return (
    <main className='bg-wordBox bg-groupColor h-boxHeight'>{children}</main>
  );
};

export default MyFrame;
