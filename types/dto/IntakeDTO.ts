import {BaseDTO} from './BaseDTO';
import {ProductDTO} from './ProductDTO';

export type IntakeDTO = BaseDTO & {
  userId: string;
  intakeDate: Date;
  carbohydrate: number;
  protein: number;
  fat: number;
  calorie: number;
  product: ProductDTO;
  quantity: number;
  comment: string;
}
