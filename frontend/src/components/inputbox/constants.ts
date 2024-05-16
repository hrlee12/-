export const INPUT_TEXT_BOX_SIZE = {
  pomodoro: {
    width: '80px',
    height: '50px',
  },
  small: {
    width: '280px',
    height: '60px',
  },
  medium: {
    width: '320px',
    height: '60px',
  },
  large: {
    width: '350px',
    height: '40px',
  },
  setting: {
    width: '240px',
    height: '50px',
  },
  makeGroupName: {
    width: '180px',
    height: '30px',
  },
  chatting: {
    width: '260px',
    height: '50px',
  },
} as const;

export const INPUT_TYPE = ['text', 'number', 'password'] as const;
