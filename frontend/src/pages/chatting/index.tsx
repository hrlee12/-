import BasicFrame from '@/components/frame/basicFrame';
import ChatBox from '@/pages/chatting/chatBox.tsx';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';

const Chatting = () => {
  return (
    <BasicFrame>
      <div
        className='flex flex-col-reverse overflow-y-hidden space-y-1 space-y-reverse'
        style={{ height: '40vh' }}
      >
        <ChatBox />
        <ChatBox />
      </div>
      <div className='flex flex-row pl-6'>
        <div className={'pt-2'}>
          <InputBox
            name={'채팅창'}
            size={'large'}
            type={'text'}
            addStyle={'pl-3'}
            placeholder={'채팅을 입력하세요'}
            onChange={() => {}}
          />
        </div>
        <Button
          text={'전송'}
          size={'small'}
          color={'green'}
          onClick={() => {}}
        />
      </div>
    </BasicFrame>
  );
};

export default Chatting;
