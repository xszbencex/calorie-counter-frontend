import {Gender} from '../types/enum/Gender';
import {ProductType} from '../types/enum/ProductType';
import {UnitOfMeasure} from '../types/enum/UnitOfMeasure';
import {PhysicalActivity} from '../types/enum/PhysicalActivity';

export type EnumLabel = {
  value: string;
  label: string;
};

export const genderOptions: EnumLabel[] = [
  {value: Gender.MALE, label: 'Férfi'},
  {value: Gender.FEMALE, label: 'Nő'},
];

export const productTypeOptions: (EnumLabel & {imageSrc: string})[] = [
  {value: ProductType.PROTEIN, label: 'Fehérjék', imageSrc: '/hus.png'},
  {value: ProductType.FRUITS, label: 'Gyümölcsök', imageSrc: '/gyumolcs.png'},
  {value: ProductType.VEGETABLES, label: 'Zöldségek', imageSrc: '/zoldseg.png'},
  {value: ProductType.GRAINS, label: 'Gabonafélék', imageSrc: '/gabona.png'},
  {value: ProductType.DAIRY, label: 'Tejtermékek', imageSrc: '/tejtermek.png'},
  {value: ProductType.SWEETS, label: 'Édességek', imageSrc: '/edesseg.png'},
  {value: ProductType.MEAL, label: 'Kész ételek', imageSrc: '/keszetel.png'},
  {value: ProductType.DRINK, label: 'Italok', imageSrc: '/ital.png'},
  {value: ProductType.OTHERS, label: 'Egyéb', imageSrc: '/egyeb.png'},
];

export const unitOfMeasureOptions: (EnumLabel & {unit: string})[] = [
  {value: UnitOfMeasure.GRAMS_100, label: '/100g', unit: 'g'},
  {value: UnitOfMeasure.MILLILITERS_100, label: '/100ml', unit: 'ml'},
  {value: UnitOfMeasure.PIECE, label: '/db', unit: 'db'},
];

export const physicalActivityOptions: (EnumLabel & {multiplier: number})[] = [
  {value: PhysicalActivity.NO_EXERCISE, label: 'Csekély – nem sportoló, ülőfoglalkozású', multiplier: 1.2},
  {value: PhysicalActivity.LIGHT_EXERCISE, label: 'Mérsékelt – heti 1-2 óra sport, szellemi foglalkozású', multiplier: 1.375},
  {value: PhysicalActivity.MODERATE_EXERCISE, label: 'Közepes – heti 2-3 óra sport, könnyű fizikai munka', multiplier: 1.55},
  {value: PhysicalActivity.HARD_EXERCISE, label: 'Átlagon felüli – rendszeres intenzív sport, fizikai munkakör', multiplier: 1.725},
  {value: PhysicalActivity.PROFESSIONAL_ATHLETE, label: 'Nagyon magas – intenzív sport naponta, nehéz fizikai munka', multiplier: 1.9},
];

export const monthOptions: {value: number, label: string}[] = [
  {value: 1, label: 'Január'},
  {value: 2, label: 'Február'},
  {value: 3, label: 'Március'},
  {value: 4, label: 'Április'},
  {value: 5, label: 'Május'},
  {value: 6, label: 'Június'},
  {value: 7, label: 'Július'},
  {value: 8, label: 'Augusztus'},
  {value: 9, label: 'Szeptember'},
  {value: 10, label: 'Október'},
  {value: 11, label: 'November'},
  {value: 12, label: 'December'},
];
