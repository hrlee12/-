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
import ProgressBar from '@/components/progressbar/ProgressBar.tsx';
import useTimerStore from '@/stores/useTimerStore.ts';
import { getValidProcess } from '@/apis/process.ts';
import { fetchSession, fetchToken } from '@/apis/openvidu.ts';
import { getMyInfo } from '@/apis/member.ts';
import NyanPunch from '@/components/cat/nyanPunch';
import { useCatStore } from '@/stores/useGroupCatStore.ts'; // 전역 상태 임포트
import Drawing from '../drawing';

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
  const [isAttention, setIsAttention] = useState(false);
  const [isPunchVisible, setIsPunchVisible] = useState(false);
  // const [nyanPunchId, setNyanPunchId] = useState<number>(0);
  const [alertMember, setAlertMember] = useState<number | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [hasChanged2, setHasChanged2] = useState(false);
  const [isSubscribeVisible, setIsSubscribeVisible] = useState(false);
  const [drawOn, setDrawOn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { partyId: groupId } = location.state || {};

  const storedTime = useTimerStore.getState().startTime;
  const focusTime = useTimerStore.getState().concentrateTime;
  const breakTime = useTimerStore.getState().relaxTime;
  const repeatCount = useTimerStore.getState().endPeriod;

  const catIdList = useCatStore((state) => state.catIdList);
  const index = catIdList.findIndex((item) => item.memberId === alertMember);

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

  const handleNyanPunchClick = () => {
    connectSessionNoVid();
    setIsSubscribeVisible(true);

    setTimeout(() => {
      setIsSubscribeVisible(false);
    }, 35000);
  };

  const handleDrawOn = () => {
    setDrawOn(true);

    setTimeout(() => {
      setDrawOn(false);
    }, 55000);
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

  const connectSession = async () => {
    const OV: OpenVidu = new OpenVidu();
    const session: Session = OV.initSession();
    let publisher: Publisher;
    try {
      await fetchSession(groupId.toString());
      await fetchToken(useAuthStore.getState().openViduSession);

      const TOKEN = useAuthStore.getState().openViduToken;

      session.on('streamCreated', (event: StreamEvent) => {
        session.subscribe(event.stream, 'video-container');
        console.log('공유된 화면 화면 구독중');
      });

      await session.connect(TOKEN);
      console.log('세션 연결 성공');

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          publisher = OV.initPublisher('publisher', {
            videoSource: 'screen', // 화면 공유 활성화
            publishAudio: false, // 오디오 활성화 여부 (화면 공유시 시스템 오디오 포함 여부)
            publishVideo: true, // 비디오 활성화 여부 (화면 공유시에는 화면을)
            resolution: '640x480', // 해상도 설정
            frameRate: 30, // 프레임 레이트 설정
            mirror: false, // 화면 공유일 때는 미러링을 비활성화
          });
          session.publish(publisher);
          handleDrawOn();
        })
        .catch((error) => {
          console.error('카메라/마이크 접근 권한 문제:', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const connectSessionNoVid = async () => {
    const OV: OpenVidu = new OpenVidu();
    const session: Session = OV.initSession();
    try {
      await fetchSession(groupId.toString());
      await fetchToken(useAuthStore.getState().openViduSession);

      const TOKEN = useAuthStore.getState().openViduToken;

      session.on('streamCreated', (event: StreamEvent) => {
        session.subscribe(event.stream, 'video-container');
        console.log('공유된 화면 화면 구독중');
      });

      await session.connect(TOKEN);
      console.log('세션 연결 성공');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 1회성 비디오 띄우기
    if (!hasChanged) {
      if (isAttention) {
        console.log('화면 공유 시작');
        connectSession();
        setHasChanged(true);
      }
      // else {
      //   if (publisher) {
      //     console.log('화면 공유 중지');
      //     session.unpublish(publisher);
      //   }
      // }
    }
    return () => {
      if (isAttention) {
        console.log('화면 공유 시작');
        connectSession();
      }
      //   if (publisher) {
      //     console.log('클린업: 화면 공유 중지');
      //     session.unpublish(publisher);
      //   }
    };
  }, [isAttention]);

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

  // 딴짓하면 냥펀치 아이콘 뜨기
  useEffect(() => {
    if (!alertMember) return;
    // 1회성
    if (!hasChanged2) {
      const memberId = useAuthStore.getState().accessToken;
      console.log('얼럿 멤버 : ' + alertMember);
      console.log('멤버 아디 : ' + memberId);
      if (alertMember == memberId) {
        setIsAttention(true);
        console.log('어텐션 작동');
      } else {
        setIsPunchVisible(true);
        console.log('펀치보기작동');
      }
      setHasChanged2(true);
    }
  }, [alertMember]);

  return (
    <>
      {isSubscribeVisible && <div id='video-container'></div>}
      {drawOn && <Drawing />}
      {isHovered && !isSubscribeVisible && !drawOn && (
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
      {isPunchVisible && !isSubscribeVisible && (
        <div onClick={handleNyanPunchClick}>
          <NyanPunch pos={index + 1} />
        </div>
      )}
      {/*{!drawOn && (*/}
      {/*  <div>*/}
      {/*    <IdleCat*/}
      {/*      catId={1}*/}
      {/*      onMouseEnter={() => setIsHovered(true)}*/}
      {/*      onMouseLeave={() => setIsHovered(false)}*/}
      {/*      position={{ right: 120, bottom: 0 }}*/}
      {/*    />*/}
      {/*    <IdleCat*/}
      {/*      catId={2}*/}
      {/*      onMouseEnter={() => setIsHovered(true)}*/}
      {/*      onMouseLeave={() => setIsHovered(false)}*/}
      {/*      position={{ right: 60, bottom: 0 }}*/}
      {/*    />*/}
      {/*    <IdleCat*/}
      {/*      catId={3}*/}
      {/*      onMouseEnter={() => setIsHovered(true)}*/}
      {/*      onMouseLeave={() => setIsHovered(false)}*/}
      {/*      position={{ right: 0, bottom: 0 }}*/}
      {/*      onClick={() => movePage()}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      {!drawOn && (
        <div id='here' className='fixed right-0 bottom-0'>
          {catIdList.map((cat, index) => (
            <IdleCat
              key={cat.catId}
              catId={cat.catId}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              position={{ right: 60 * index, bottom: 0 }}
              onClick={() => movePage()}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GroupPreview;
