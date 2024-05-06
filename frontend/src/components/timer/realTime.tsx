export function calculateTimerValues(
  storedTime: number,
  focusTime: number,
  breakTime: number,
  repeatCount: number,
  currentTime: number,
) {
  const secGap = Math.floor((currentTime - storedTime) / 1000); // 현재 시간과 저장된 시간 사이의 차이(초)
  const cycleTime = focusTime + breakTime; // 집중 시간과 쉬는 시간의 합
  const totalTime = cycleTime * repeatCount - breakTime; // 마지막 쉬는 시간은 제외

  let nowIsFocus = false;
  let nowTimeDuration = 0;
  let nowRepeat = 0;

  if (secGap >= totalTime) {
    // 총 시간을 넘어선 경우, 마지막 반복의 집중 시간으로 설정
    nowIsFocus = true;
    nowTimeDuration = focusTime; // 마지막 집중 시간으로 설정
    nowRepeat = repeatCount * 2 - 1; // 마지막 반복
  } else {
    let currentGap = secGap;
    for (let i = 1; i <= repeatCount; i++) {
      if (currentGap < focusTime) {
        nowIsFocus = true;
        nowTimeDuration = currentGap;
        nowRepeat = i * 2 - 1;
        break;
      } else if (currentGap >= focusTime && currentGap < cycleTime) {
        nowIsFocus = false;
        nowTimeDuration = currentGap - focusTime;
        nowRepeat = i * 2;
        break;
      }
      currentGap -= cycleTime;
    }
  }

  return { nowIsFocus, nowTimeDuration, nowRepeat };
}
