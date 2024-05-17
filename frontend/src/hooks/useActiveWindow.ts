import { useState, useEffect } from 'react';

const useActiveWindow = () => {
  const [activeWindowName, setActiveWindowName] = useState('');

  useEffect(() => {
    // 이벤트 핸들러
    const handleWindowName = (name: string) => {
      let isName = false;
      for (let idx = 0; idx < name.length - 2; idx++) {
        if (Number(name[idx]) < 48 || Number(name[idx]) > 57) isName = true;
      }
      if (!isName) return;

      let result = '';
      for (let idx = 0; idx < name.length - 2; idx++) {
        result += String.fromCharCode(Number(name[idx]));
      }
      setActiveWindowName(result); // 상태 업데이트
    };

    // 이벤트 리스너 등록
    window.electronAPI.onActiveWindowProcessName(handleWindowName);

    // 초기 호출 및 주기적 호출 설정
    const fetchProcessName = () => {
      window.electronAPI.getActiveWindowProcessName();
    };
    fetchProcessName();
    const intervalId = setInterval(fetchProcessName, 5000);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return activeWindowName;
};

export default useActiveWindow;
