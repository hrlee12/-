import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';

const Example = () => {
  return (
    <BasicFrame>
      <InputBox
        name={'로그인'}
        size={'medium'}
        type={'text'}
        placeholder={'로그인'}
        onChange={() => {}}
      />
      <InputBox
        name={'비밀번호'}
        size={'medium'}
        type={'password'}
        placeholder={'비밀번호'}
        onChange={() => {}}
      />
      <Button
        text={'피그마'}
        size={'modal'}
        color={'navy'}
        onClick={() => {}}
      />
    </BasicFrame>
  );
};

export default Example;
