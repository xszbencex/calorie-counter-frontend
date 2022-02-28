import { ProductType } from '../enum/ProductType';
import {BaseDTO} from './BaseDTO';
import {UnitOfMeasure} from '../enum/UnitOfMeasure';

export type ProductDTO = BaseDTO & {
  name: string;
  productType: ProductType;
  unitOfMeasure: UnitOfMeasure;
  carbohydrate: number;
  protein: number;
  fat: number;
  kcal: number;
  comment: string;
  userId: string;
}
