import { useState } from 'react';
import '@/pages/account/info/HoverPopup.css';
import { FaInfoCircle } from 'react-icons/fa';

function InfoHover() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='icon-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaInfoCircle size={24}></FaInfoCircle>
      {isHovered && (
        <div className='font-neo popup text-center'>
          아이디는
          <br />
          3자 이상, 10자 미만
          <br />
          비밀번호는
          <br />
          대소문자, 특수문자 포함
          <br />
          5자 이상, 9자 이하
        </div>
      )}
    </div>
  );
}

export default InfoHover;
