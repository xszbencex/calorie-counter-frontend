import {BaseDTO} from './BaseDTO';
import {Gender} from '../enum/Gender';
import {PhysicalActivity} from '../enum/PhysicalActivity';

export type PersonalDataDTO = BaseDTO & {
  userId: string;
  height: number;
  weight: number;
  birthDate: Date;
  gender: Gender;
  physicalActivity: PhysicalActivity;
}
