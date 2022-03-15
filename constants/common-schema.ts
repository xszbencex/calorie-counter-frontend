import * as yup from 'yup';
import {commonStrings} from './common-values';

export function getNumberSchema(min: number, max: number) {
  const numberRangeErrorMessage = `${min}-${max} közötti számot adjon meg`;
  return yup.number()
    .min(min, numberRangeErrorMessage)
    .max(max, numberRangeErrorMessage)
    .transform((value, originalValue) => originalValue === '' ? null : value)
    .nullable();
}

export function getDateSchema() {
  return yup.date().nullable().typeError(commonStrings.dateError);
}
