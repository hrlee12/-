import InputBox from '../../components/inputbox';

const Landing = () => {
  return (
    <div className='flex flex-col'>
      <InputBox
        name={'이것'}
        size={'small'}
        addStyle='m-4'
        type={'text'}
        placeholder={'기본 inputBox'}
        onChange={() => {}}
      />
      <InputBox
        name={'이것'}
        size={'medium'}
        type={'text'}
        addStyle='m-4'
        placeholder={'로그인'}
        onChange={() => {}}
      />
      <InputBox
        name={'이것'}
        addStyle={'text-2xl'}
        size={'large'}
        type={'text'}
        placeholder={'채팅'}
        onChange={() => {}}
      />
    </div>
  );
};

export default Landing;
