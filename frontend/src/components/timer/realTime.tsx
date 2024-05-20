export function calculateTimerValues(
  storedTime: number,
  focusTime: number,
  breakTime: number,
  repeatCount: number,
  currentTime: number,
) {
  const secGap = Math.floor((currentTime - storedTime) / 1000);
  const cycleTime = focusTime * 60 + breakTime * 60;
  const totalTime = cycleTime * repeatCount - breakTime * 60;

  let nowIsFocus = false;
  let nowTimeDuration = 0;
  let nowRepeat = 0;

  if (secGap >= totalTime) {
    // 총 시간을 넘어선 경우 특정 값을 리턴해서 타이머 종료를 알리도록 함.
    nowIsFocus = false;
    nowTimeDuration = -1;
    nowRepeat = -1;
  } else {
    let currentGap = secGap;
    let cycleCompleted = 0; // 완료된 전체 사이클 수

    while (currentGap >= cycleTime) {
      currentGap -= cycleTime;
      cycleCompleted++;
    }

    if (currentGap < focusTime * 60) {
      nowIsFocus = true;
      nowTimeDuration = currentGap;
      nowRepeat = cycleCompleted * 2 + 1;
    } else {
      nowIsFocus = false;
      nowTimeDuration = currentGap - focusTime * 60;
      nowRepeat = cycleCompleted * 2 + 2;
    }
  }

  return { nowIsFocus, nowTimeDuration, nowRepeat };
}
