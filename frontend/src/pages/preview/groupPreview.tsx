import { useState } from 'react';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';

const GroupPreview = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isHovered && (
        <div>
          <SmallFrameNoCat>예시</SmallFrameNoCat>
        </div>
      )}
      <div
        className='character-idle fixed right-[0px] bottom-[0px]'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </>
  );
};

export default GroupPreview;
