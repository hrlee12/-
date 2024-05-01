import Button from '@/components/button';

interface MessageProps {
  // 메세지 타입 확인
  messages: string[];
  onClose: () => void;
}

const GroupMessage = ({ onClose }: MessageProps) => {
  return (
    <div className='fixed right-24 bg-groupColor rounded-lg w-48 h-24 flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className={'font-neo'}>메시지 목록</h2>
        {/*<ul>*/}
        {/*  {messages.map((message, index) => (*/}
        {/*    <li key={index}>{message.content}</li> //*/}
        {/*  ))}*/}
        {/*</ul>*/}
        <Button text={'닫기'} size={'small'} color={'navy'} onClick={onClose} />
      </div>
    </div>
  );
};

export default GroupMessage;
