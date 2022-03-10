import {BaseDTO} from './BaseDTO';

export type WeightChangeDTO = BaseDTO & {
  weight: number;
  userId: string;
  setDate: Date | string;
}
