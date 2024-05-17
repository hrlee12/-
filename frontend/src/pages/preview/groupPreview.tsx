import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import PomodoroTimer from '@/components/timer/PomodoroTimer';
import { calculateTimerValues } from '@/components/timer/realTime';
import { MyInfoProps } from '@/types/member';
import { OpenVidu, Session, StreamEvent, Publisher } from 'openvidu-browser';
import useActiveWindow from '@/hooks/useActiveWindow';
import { WarningSocket } from '@/apis/websocket/AISocket';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';
import ProfileCat from '@/components/cat/profile';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore.ts';
import ProgressBar from '@/components/progressbar/ProgressBar.tsx';
import useTimerStore from '@/stores/useTimerStore.ts';
import { getValidProcess } from '@/apis/process.ts';
import { fetchSession, fetchToken } from '@/apis/openvidu.ts';
import { getMyInfo } from '@/apis/member.ts';

const GroupPreview = () => {
  const topProcess = useActiveWindow();
  const [validProcess, setValidProcess] = useState<{ result: string } | null>(
    null,
  );
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
  const [, setAlertMember] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { partyId: groupId } = location.state || {};

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
    const timerId = setTimeout(() => {
      const fetchValidProcess = async () => {
        try {
          const result = await getValidProcess(topProcess);
          setValidProcess(result);
          console.log(result);
        } catch (error) {
          console.error('Failed to fetch valid process:', error);
        }
      };

      if (topProcess) {
        fetchValidProcess();
      }
    }, 2000);

    return () => clearTimeout(timerId);
  }, [topProcess, myInfo.memberGoal]);

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
        await fetchSession(groupId.toString());
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

  useEffect(() => {
    let warningSocket: WarningSocket | null = null;

    if (validProcess?.result === 'NO') {
      const memberId = useAuthStore.getState().accessToken;
      warningSocket = new WarningSocket(memberId, groupId);
      warningSocket.connect('https://mogaknyang-back.duckdns.org/ws', memberId);

      warningSocket.onMessage((data) => {
        setAlertMember(data.memberId);
      });

      // 연결 상태를 체크하고 메시지 발송
      const interval = setInterval(() => {
        if (warningSocket && warningSocket.connected) {
          warningSocket.sendWarning();
          clearInterval(interval); // 메시지 발송 후 인터벌 클리어
        }
      }, 1000); // 1초마다 연결 상태를 체크하고 메시지 발송
    }

    return () => {
      if (warningSocket) {
        warningSocket.disconnect();
      }
    };
  }, [validProcess, groupId]);

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
