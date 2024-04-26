import * as constants from '@/components/inputbox/constants.ts';

export type inputSizeType = 'pomodoro' | 'small' | 'medium' | 'large';

export type inputType = (typeof constants.INPUT_TYPE)[number];
