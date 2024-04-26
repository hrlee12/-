const Group = () => {
  return (
    <div className='pl-1 py-1'>
      <div className='bg-groupColor w-48 h-24 rounded-3xl'>
        {/*지금 상상 코딩이라 나중에 글자 크기 보고 gap 확인*/}
        <div className='flex place-content-around gap-8 pt-3'>
          <div className='font-dnf'>그룹 이름</div>
          <div className='font-dnf'>숫자</div>
        </div>
        <div className='font-neo pl-3'>마지막 채팅</div>
      </div>
    </div>
  );
};

export default Group;
