import React, { useEffect, useState, useRef } from 'react';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { Socket } from '@/apis/websocket/Socket.ts';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { getChattingList } from '@/apis/group.ts';
import ChatBox from '@/pages/chatting/chatBox.tsx';
import { getMyInfo } from '@/apis/member.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCircleChevronLeft } from 'react-icons/fa6';

interface ChatMessage {
  userId: number;
  userNickname: string;
  contents: string;
  sendTime: string;
}

const Chatting = () => {
  const { groupId } = useParams();
  const partyId = Number(groupId);
  const token = useAuthStore.getState().accessToken;
  const [myName, setMyName] = useState<string>('');
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [socketMessageList, setSocketMessageList] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChattingList = async () => {
      const response = await getChattingList(partyId);
      const chatMessages: ChatMessage[] = response.chatMessages
        .map((msg: ChatMessage) => ({
          userId: msg.userId,
          userNickname: msg.userNickname,
          contents: msg.contents,
          sendTime: msg.sendTime,
        }))
        .reverse(); // 메시지 리스트를 역순으로 정렬하여 최신 메시지가 맨 아래에 오도록 함
      setMessageList(chatMessages);
      console.log(chatMessages);
    };

    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        setMyName(response.memberCatName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChattingList();
    fetchMyInfo();

    const chatWsUrl = `https://mogaknyang-back.duckdns.org/ws`;
    const socket = new Socket();
    socket.connect(chatWsUrl, partyId, token);

    socket.onMessage((data: string) => {
      const parsedData: ChatMessage = JSON.parse(data);
      console.log('Received message:', parsedData); // 수신된 메시지를 콘솔에 출력
      setSocketMessageList((prevMessages) => [...prevMessages, parsedData]);
    });

    socketRef.current = socket;

    return () => {
      socketRef.current?.disconnect();
    };
  }, [partyId, token]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList, socketMessageList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && socketRef.current?.connected) {
      socketRef.current.sendMessage(partyId, message);
      setMessage('');
      scrollToBottom(); // 메시지 전송 후 스크롤을 맨 아래로 이동
    } else {
      console.error('WebSocket is not connected or message is empty');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BasicFrame>
      <FaCircleChevronLeft
        className='absolute mt-[0px] text-[35px] text-inputBoxColor bg-frameColor rounded-boxRadius'
        onClick={() => navigate(-1)}
      />
      <div
        id={'here'}
        className='flex flex-col overflow-y-auto max-h-[400px] space-y-1 scrollbar-hide'
      >
        {[...messageList, ...socketMessageList].map((msg, index) => (
          <ChatBox
            key={`message-${index}`}
            userNickname={msg.userNickname || myName}
            contents={msg.contents}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='fixed bottom-28 flex flex-row pl-6'>
        <div className={'pt-2'}>
          <InputBox
            name={'채팅창'}
            size={'chatting'}
            type={'text'}
            addStyle={'pl-3'}
            placeholder={'채팅 입력'}
            value={message}
            onChange={handleInputChange}
          />
        </div>
        <Button
          text={'전송'}
          size={'small'}
          color={'green'}
          onClick={handleSendMessage}
        />
      </div>
    </BasicFrame>
  );
};

export default Chatting;
