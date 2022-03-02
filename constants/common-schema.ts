import * as yup from 'yup';

export function getNumberSchema(min: number, max: number) {
  const numberRangeErrorMessage = `${min}-${max} közötti számot adjon meg`;
  return yup.number()
    .min(min, numberRangeErrorMessage)
    .max(max, numberRangeErrorMessage)
    .transform((value, originalValue) => originalValue === '' ? null : value)
    .nullable();
}
