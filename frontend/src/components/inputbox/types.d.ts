import * as constants from '@/components/inputbox/constants.ts';

export type inputSizeType =
  | 'small'
  | 'medium'
  | 'large'
  | 'setting'
  | 'makeGroupName';

export type inputType = (typeof constants.INPUT_TYPE)[number];
