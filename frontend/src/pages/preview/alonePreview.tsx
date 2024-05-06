import { useState } from 'react';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';
import PomodoroTimer from '@/components/timer/PomodoroTimer.tsx';

const AlonePreview = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isHovered && (
        <div>
          <SmallFrameNoCat>
            <PomodoroTimer breakTime={0} focusTime={0} repeatCount={0} />
          </SmallFrameNoCat>
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

export default AlonePreview;
