import {BaseDTO} from './BaseDTO';

export type DailyTargetDTO = BaseDTO & {
  targetCalories: number;
  targetCarbohydrate: number;
  targetProtein: number;
  targetFat: number;
  targetWater: number;
  userId: string;
}
