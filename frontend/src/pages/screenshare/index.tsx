import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import axios, { AxiosError } from 'axios';
import Form from '@/components/webrtc/Form.tsx';
import Session from '@/components/webrtc/Session.tsx';

const ScreenShare = () => {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  //배포서버에 연동한 openvidu url
  const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_SERVER_URL;
  // const OPENVIDU_SERVER_URL = 'https://34.152.10.124:443';
  console.log(OPENVIDU_SERVER_URL);
  const OPENVIDU_SERVER_SECRET = import.meta.env.VITE_OPENVIDU_SERVER_SECRET;
  // const OPENVIDU_SERVER_SECRET = 'Ssafy703';

  //session(가상의 방) 연결 해제
  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession('');
    setSessionId('');
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  //session 연결
  const joinSession = () => {
    //1. openvidu 객체 생성
    const OVs = new OpenVidu();

    //소켓 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log 띄우지 않게 하는 모드
    OVs.enableProdMode();

    //2. initSession 생성
    //3. 미팅 종료하거나 뒤로가기 등 이벤트 통해 세션 disconnect 해주기 위해 state에 저장
    setOV(OVs);
    setSession(OVs.initSession());
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSessionId(event.target.value);
  };

  useEffect(() => {
    if (session === '') return;

    session.on('streamDestroyed', (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (session === '') return;

    session.on('streamCreated', (event) => {
      const subscribers = session.subscribe(event.stream, '');
      setSubscriber(subscribers);
    });

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
              )}`,
              'Content-Type': 'application/json',
            },
          },
        );

        return (response.data as { id: string }).id;
      } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
          return sessionIds;
        }

        return '';
      }
    };

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
                )}`,

                'Content-Type': 'application/json',
              },
            },
          )
          .then((response) => {
            resolve((response.data as { token: string }).token);
          })
          .catch((error) => reject(error));
      });
    };

    const getToken = async (): Promise<string> => {
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        return token;
      } catch (error) {
        throw new Error('Failed to get token.');
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  //session에 값을 사용자에게 입력 받는 형태로 구성
  return (
    <div>
      <h1>진행화면</h1>
      <>
        {!session && (
          <Form
            joinSession={joinSession}
            sessionId={sessionId}
            sessionIdChangeHandler={sessionIdChangeHandler}
          />
        )}
        {session && (
          <Session
            publisher={publisher as Publisher}
            subscriber={subscriber as Subscriber}
          />
        )}
      </>
    </div>
  );
};

export default ScreenShare;
