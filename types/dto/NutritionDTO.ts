import {BaseDTO} from './BaseDTO';
import {ProductDTO} from './ProductDTO';

export type NutritionDTO = BaseDTO & {
  userId: string;
  nutritionDate: Date;
  carbohydrate: number;
  protein: number;
  fat: number;
  calorie: number;
  product: ProductDTO;
  quantity: number;
  comment: string;
}
