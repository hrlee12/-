type ColorType = [`#${string}`, `#${string}`, ...`#${string}`[]];

export const END = '끝';

export const FOCUS_TIME = '집중 시간';

export const REST_TIME = '휴식 시간';

export const COLORS: {
  WORK_COLOR: ColorType;
  REST_COLOR: ColorType;
} = {
  WORK_COLOR: [
    '#9B59B6',
    '#A76BBE',
    '#B37EC6',
    '#BF90CE',
    '#CBA3D6',
    '#BDC3C7',
  ],
  REST_COLOR: [
    '#FF7F50',
    '#FF9872',
    '#FFB494',
    '#FFD0B6',
    '#FFE0D8',
    '#FFF0EB',
  ],
};

export const POMODORO = {
  MIN: '분',
  REST: '쉼',
  COUNT: '회',
};
