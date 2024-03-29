import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Grid, InputAdornment} from '@mui/material';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-values';
import {FormProps} from '../../types/FormProps';
import {CCFormText} from '../input-fields/CCText';
import { CCFormSelect } from '../input-fields/CCSelect';
import {productTypeOptions, unitOfMeasureOptions} from '../../constants/enum-label';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {useEffect, useState} from 'react';
import {getNumberSchema} from '../../constants/common-schema';
import {UnitOfMeasure} from '../../types/enum/UnitOfMeasure';
import {ProductType} from '../../types/enum/ProductType';

type FormData = Omit<ProductDTO, keyof BaseDTO | 'userId'>

const macroSchema = yup.number()
  .min(0, commonStrings.positiveError)
  .transform((value, originalValue) => originalValue === '' ? null : value).nullable()
  .when('unitOfMeasure', {
    is: UnitOfMeasure.PIECE,
    then: schema => schema.max(10000, commonStrings.oneHundred),
    otherwise: schema => schema.max(100, commonStrings.oneHundred)
  })
  .required(commonStrings.required);

const schema = yup.object({
  name: yup.string().required(commonStrings.required),
  carbohydrate: macroSchema,
  protein: macroSchema,
  fat: macroSchema,
  calorie: getNumberSchema(0, 10000).integer(commonStrings.integerError).required(commonStrings.required),
  productType: yup.string().required(commonStrings.required),
  unitOfMeasure: yup.string().required(commonStrings.required),
  comment: yup.string().nullable(),
});

export const ProductForm = (props: FormProps) => {
  const {data, onFormSubmit} = props;
  const isUpdate = !!data;

  const methods = useForm<FormData>({defaultValues: isUpdate ? {...data} : undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, watch} = methods;

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  const unitOfMeasure = watch('unitOfMeasure');
  const [unitOfMeasureLabel, setUnitOfMeasureLabel] = useState<string>();

  useEffect(() => {
    setUnitOfMeasureLabel(`${unitOfMeasureOptions.find(value => value.value === unitOfMeasure)?.label ?? ''}`);
  }, [unitOfMeasure]);

  return (
    <>
      <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={6}>
            <CCFormText name="name" control={control} label="Név *"/>
          </Grid>
          <Grid item xs={3}>
            <CCFormSelect
              name="productType"
              control={control}
              label="Típusa *"
              options={productTypeOptions.filter(value => value.value !== ProductType.WATER)}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormSelect name="unitOfMeasure" control={control} label="Mértékegység *" options={unitOfMeasureOptions}/>
          </Grid>
          <Grid item xs={3}>
            <CCFormText
              name="carbohydrate"
              control={control}
              label="Szénhidrát *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g{unitOfMeasureLabel}</InputAdornment>,
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormText
              name="protein"
              control={control}
              label="Fehérje *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g{unitOfMeasureLabel}</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormText
              name="fat"
              control={control}
              label="Zsír *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g{unitOfMeasureLabel}</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormText
              name="calorie"
              control={control}
              label="Kalória *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kcal{unitOfMeasureLabel}</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CCFormText
              name="comment"
              control={control}
              label="Megjegyzés"
              textFieldProps={{
                variant: 'outlined',
                multiline: true,
                rows: 2
              }}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
