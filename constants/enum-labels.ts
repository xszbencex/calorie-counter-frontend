import {Gender} from '../types/enum/Gender';
import {ProductType} from '../types/enum/ProductType';
import {UnitOfMeasure} from '../types/enum/UnitOfMeasure';

export type EnumLabels = {
  value: string;
  label: string;
  label2?: string;
} [];

export const genderOptions: EnumLabels = [
  {value: Gender.MALE, label: 'Férfi'},
  {value: Gender.FEMALE, label: 'Nő'},
];

export const productTypeOptions: EnumLabels = [
  {value: ProductType.FOOD, label: 'Étel (termék)'},
  {value: ProductType.MEAL, label: 'Kész étel'},
  {value: ProductType.DRINK, label: 'Ital'},
];

export const unitOfMeasureOptions: EnumLabels = [
  {value: UnitOfMeasure.GRAMS_100, label: '/100g', label2: 'g'},
  {value: UnitOfMeasure.MILLILITERS_100, label: '/100ml', label2: 'ml'},
  {value: UnitOfMeasure.PIECE, label: '/db', label2: 'db'},
];
