import { useEffect, useState } from 'react';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';
import PomodoroTimer from '@/components/timer/PomodoroTimer.tsx';
import useTimerStore from '@/stores/useTimerStore';
import { calculateTimerValues } from '@/components/timer/realTime';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyInfoProps } from '@/types/member';
import { getMyInfo } from '@/apis/member';
import ProgressBar from '@/components/progressbar/ProgressBar';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';
import ProfileCat from '@/components/cat/profile';
import { useAuthStore } from '@/stores/useAuthStore';
import { fetchSession, fetchToken } from '@/apis/openvidu.ts';
import { OpenVidu, Session, StreamEvent, Publisher } from 'openvidu-browser';

const GroupPreview = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowIsFocus, setNowIsFocus] = useState(false);
  const [nowTimeDuration, setNowTimeDuration] = useState(0);
  const [nowRepeat, setNowRepeat] = useState(0);
  const [timer, setTimer] = useState<React.ReactElement | undefined>(undefined);
  const [myInfo, setMyInfo] = useState<MyInfoProps>({
    memberExp: 0,
    memberCreatedAt: '',
    memberCatName: '',
    memberHitNumber: 0,
    memberBehitNumber: 0,
    level: 1,
    memberGoal: '',
    titleContent: '',
    catAssetUrl: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = location.state || {};

  const storedTime = useTimerStore.getState().startTime;
  const focusTime = useTimerStore.getState().concentrateTime;
  const breakTime = useTimerStore.getState().relaxTime;
  const repeatCount = useTimerStore.getState().endPeriod;

  const movePage = () => {
    useTimerStore.setState({
      startTime: 0,
      endPeriod: 0,
      concentrateTime: 0,
      relaxTime: 0,
      timerId: -1,
    });

    navigate('/group');
  };

  useEffect(() => {
    const currentTime = Date.now();
    const { nowIsFocus, nowTimeDuration, nowRepeat } = calculateTimerValues(
      storedTime,
      focusTime,
      breakTime,
      repeatCount,
      currentTime,
    );

    setNowIsFocus(nowIsFocus);
    setNowTimeDuration(nowTimeDuration);
    setNowRepeat(nowRepeat);
    setTimer(
      <PomodoroTimer
        nowIsFocus={nowIsFocus}
        nowTimeDuration={nowTimeDuration}
        nowRepeat={nowRepeat}
        breakTime={breakTime}
        focusTime={focusTime}
        repeatCount={repeatCount}
      />,
    );
  }, [isHovered, breakTime, focusTime, repeatCount, storedTime]);

  useEffect(() => {
    setIsHovered(true);
    const timer = setTimeout(() => {
      setIsHovered(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const OV: OpenVidu = new OpenVidu();
    const session: Session = OV.initSession();

    const connectSession = async () => {
      try {
        await fetchSession(groupId);
        await fetchToken(useAuthStore.getState().openViduSession);

        const TOKEN = useAuthStore.getState().openViduToken;

        session.on('streamCreated', (event: StreamEvent) => {
          session.subscribe(event.stream, 'video-container');
          console.log('내 화면 공유중');
        });

        await session.connect(TOKEN, console.log('세션 연결 성공'));

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(() => {
            const publisher: Publisher = OV.initPublisher('publisher', {
              videoSource: 'screen', // 화면 공유 활성화
              publishAudio: false, // 오디오 활성화 여부 (화면 공유시 시스템 오디오 포함 여부)
              publishVideo: true, // 비디오 활성화 여부 (화면 공유시에는 화면을)
              resolution: '640x480', // 해상도 설정
              frameRate: 30, // 프레임 레이트 설정
              mirror: false, // 화면 공유일 때는 미러링을 비활성화
            });
            session.publish(publisher);
          })
          .catch((error) => {
            console.error('카메라/마이크 접근 권한 문제:', error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    connectSession();
  }, [groupId]);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        setMyInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInfo();
  }, [isHovered]);

  return (
    <>
      {isHovered && (
        <div>
          <SmallFrameNoCat>
            <div className='flex flex-col justify-between p-4 space-y-4 w-[205px] font-neo font-bold text-lg'>
              <div className='flex justify-between'>
                <span className='text-sm' style={{ paddingTop: 8 }}>
                  LV.{myInfo.level}
                </span>
                {myInfo.titleContent.length > 6 ? (
                  <span className='text-sm'>{myInfo.titleContent}</span>
                ) : (
                  <span>{myInfo.titleContent}</span>
                )}
              </div>
              <div style={{ marginTop: 0 }}>
                <ProgressBar value={myInfo.memberExp} max={100} />
              </div>
              {myInfo.memberCatName.length < 5 ? (
                <div
                  className={'text-3xl h-8'}
                  style={{ marginTop: 0, paddingTop: 7 }}
                >
                  {myInfo.memberCatName}
                </div>
              ) : (
                <div
                  className={'text-xl h-8'}
                  style={{ marginTop: 0, paddingTop: 7 }}
                >
                  {myInfo.memberCatName}
                </div>
              )}

              <div className='flex justify-between pl-[20px]'>
                <ProfileCat catId={1} />
                <ProfileCat catId={5} />
              </div>
              <div
                className='flex justify-between pl-[10px] pr-[10px] w-[205px]'
                style={{ marginTop: 0 }}
              >
                <span>{myInfo.memberHitNumber}번 공격!</span>
                <span>{myInfo.memberBehitNumber}번 으악!</span>
              </div>
              <div className='absolute right-0 pr-4 bottom-1'>
                {timer == undefined ||
                (!nowIsFocus && nowTimeDuration == -1 && nowRepeat - 1) ? (
                  <div className='absolute font-dnf w-[205px] right-0 pl-2 bottom-20'>
                    타이머를 설정해주세요
                  </div>
                ) : (
                  <div className='pb-[2px]'>{timer}</div>
                )}
              </div>
            </div>
          </SmallFrameNoCat>
        </div>
      )}
      <div id='cat-box'>
        <IdleCat
          catId={useSkinStore.getState().skinId}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => movePage()}
        />
      </div>
    </>
  );
};

export default GroupPreview;
