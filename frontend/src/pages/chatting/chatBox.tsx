interface ChatBoxProps {
  userNickname: string;
  contents: string;
}

const ChatBox = ({ userNickname, contents }: ChatBoxProps) => {
  return (
    <div className={'pl-8 px-2 pt-2'}>
      <div className={`bg-groupColor w-[300px] h-[40px] rounded-boxRadius`}>
        <div className={'pl-6 pt-2 font-neo'}>
          <strong>{userNickname}</strong>: {contents}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
