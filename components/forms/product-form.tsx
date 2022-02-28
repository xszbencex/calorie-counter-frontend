import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Grid, InputAdornment} from '@mui/material';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-strings';
import {FormProps} from '../../types/FormProps';
import {CCText} from '../input-fields/CCText';
import { CCSelect } from '../input-fields/CCSelect';
import {productTypeOptions, unitOfMeasureOptions} from '../../constants/enum-labels';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {useEffect, useState} from 'react';

type FormData = Omit<ProductDTO, keyof BaseDTO>

const schema = yup.object({
  name: yup.string().required(commonStrings.required),
  carbohydrate: yup.number().required(commonStrings.required).min(0, commonStrings.zeroToHundred).max(100, commonStrings.zeroToHundred),
  protein: yup.number().required(commonStrings.required).min(0, commonStrings.zeroToHundred).max(100, commonStrings.zeroToHundred),
  fat: yup.number().required(commonStrings.required).min(0, commonStrings.zeroToHundred).max(100, commonStrings.zeroToHundred),
  kcal: yup.number().required(commonStrings.required).min(0, commonStrings.zeroToTenThousand).max(10000, commonStrings.zeroToTenThousand),
  productType: yup.string().required(commonStrings.required),
  unitOfMeasure: yup.string().required(commonStrings.required),
  comment: yup.string().required(commonStrings.required),
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
            <CCText name="name" control={control} label="Név *"/>
          </Grid>
          <Grid item xs={3}>
            <CCSelect name="productType" control={control} label="Típusa *" options={productTypeOptions}/>
          </Grid>
          <Grid item xs={3}>
            <CCSelect name="unitOfMeasure" control={control} label="Mértékegység *" options={unitOfMeasureOptions}/>
          </Grid>
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
              name="kcal"
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
          <Grid item xs={6}>
            <CCText
              name="comment"
              control={control}
              label="Megjegyzés"
              textFieldProps={{
                variant: 'outlined',
                multiline: true,
                rows: 3
              }}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
