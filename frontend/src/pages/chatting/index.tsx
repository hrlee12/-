import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { Socket } from '@/apis/websocket/Socket.ts';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { getChattingList } from '@/apis/group.ts';
import ProfileCat from '@/components/cat/profile';

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
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [socketMessageList, setSocketMessageList] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchChattingList = async () => {
      const response = await getChattingList(partyId);
      const chatMessages = response.chatMessages.map((msg: any) => ({
        userId: msg.userId,
        userNickname: msg.userNickname,
        contents: msg.contents,
        sendTime: msg.sendTime,
      }));
      setMessageList(chatMessages);
      console.log(chatMessages);
    };

    fetchChattingList();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && socketRef.current?.connected) {
      // 메시지 내용만 보냅니다.
      socketRef.current.sendMessage(partyId, message);
      setMessage('');
    } else {
      console.error('WebSocket is not connected or message is empty');
    }
  };

  return (
    <BasicFrame>
      <div className='flex flex-col-reverse overflow-y-hidden space-y-1 space-y-reverse'>
        {[...messageList, ...socketMessageList].map((msg, index) => (
          <div key={index} className='chat-message'>
            <strong>{msg.userNickname}</strong>: {msg.contents}{' '}
            <em>{msg.sendTime}</em>
          </div>
        ))}
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
