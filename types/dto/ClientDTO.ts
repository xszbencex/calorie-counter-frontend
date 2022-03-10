import {BaseDTO} from './BaseDTO';
import {Gender} from '../enum/Gender';
import {PhysicalActivity} from '../enum/PhysicalActivity';

export type ClientDTO = BaseDTO & {
  keycloakId: string;
  height: number;
  weight: number;
  targetCalories: number;
  targetCarbohydrate: number;
  targetProtein: number;
  targetFat: number;
  targetWater: number;
  birthDate: Date;
  gender: Gender;
  physicalActivity: PhysicalActivity;
}
