import {BaseDTO} from './BaseDTO';
import {Gender} from '../enum/Gender';

export type ClientDTO = BaseDTO & {
  keycloakId: string;
  name: string;
  height: number;
  weight: number;
  targetCalories: number;
  targetCarbohydrate: number;
  targetProtein: number;
  targetFat: number;
  birthDate: Date;
  gender: Gender;
}
