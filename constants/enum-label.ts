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

export type ProductOptionsProps = EnumLabel & {
  imageSrc: string;
  color: string;
  gradient: string
}

export const productTypeOptions: ProductOptionsProps[] = [
  {value: ProductType.PROTEIN, label: 'Fehérjék', imageSrc: '/hus.png', color: '#b34a02',
    gradient: 'linear-gradient(90deg, #5e2301 0%, #f2965c 100%)'},
  {value: ProductType.FRUITS, label: 'Gyümölcsök', imageSrc: '/gyumolcs.png', color: '#c02030',
    gradient: 'linear-gradient(90deg, #fd511f 0%, #fdec6e 100%)'},
  {value: ProductType.VEGETABLES, label: 'Zöldségek', imageSrc: '/zoldseg.png', color: '#6db94e',
    gradient: 'linear-gradient(90deg, #317b29 0%, #a9ea6e 50%)'},
  {value: ProductType.GRAINS, label: 'Gabonafélék', imageSrc: '/gabona.png', color: '#ecb86b',
    gradient: 'linear-gradient(90deg, #bb5b14 0%, #d79f64 100%)'},
  {value: ProductType.DAIRY, label: 'Tejtermékek', imageSrc: '/tejtermek.png', color: '#eac172',
    gradient: 'linear-gradient(90deg, #fdb525 0%, #bbaf9d 100%)'},
  {value: ProductType.SWEETS, label: 'Édességek', imageSrc: '/edesseg.png', color: '#6e4420',
    gradient: 'linear-gradient(90deg, #281f06 0%, #b47e5e 100%)'},
  {value: ProductType.MEAL, label: 'Kész ételek', imageSrc: '/keszetel.png', color: '#b84901',
    gradient: 'linear-gradient(90deg, #973700 0%, #cd963b 100%)'},
  {value: ProductType.DRINK, label: 'Italok', imageSrc: '/ital.png', color: '#fb8e03',
    gradient: 'linear-gradient(90deg, #fd760e 0%, #f7e23d 100%)'},
  {value: ProductType.OTHERS, label: 'Egyebek', imageSrc: '/egyeb.png', color: '#21a5b4',
    gradient: 'linear-gradient(90deg, #21a5b4 0%, #7db23c 100%)'},
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
