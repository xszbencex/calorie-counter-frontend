import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Button, Grid, InputAdornment} from '@mui/material';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-strings';
import {FormProps} from '../../types/FormProps';
import {CCText} from '../input-fields/CCText';
import {NutritionDTO} from '../../types/dto/NutritionDTO';
import {CCDateTime} from '../input-fields/CCDateTime';
import {CCAutocomplete} from '../input-fields/CCAutocomplete';
import {useContext, useEffect, useState} from 'react';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {getAllProductByUserId} from '../../utils/api/product-api';
import GlobalContext from '../../store/global-context';
import {unitOfMeasureOptions} from '../../constants/enum-labels';
import {UnitOfMeasure} from '../../types/enum/UnitOfMeasure';

type FormData = Omit<NutritionDTO, keyof BaseDTO>

const defaultFormValues = {
  nutritionDate: new Date()
} as FormData;

const schema = yup.object({
  nutritionDate: yup.date().required(commonStrings.required),
  carbohydrate: yup.number().required(commonStrings.required)
    .min(0, commonStrings.zeroToTenThousand).max(10000, commonStrings.zeroToTenThousand),
  protein: yup.number().required(commonStrings.required)
    .min(0, commonStrings.zeroToTenThousand).max(10000, commonStrings.zeroToTenThousand),
  fat: yup.number().required(commonStrings.required).min(0, commonStrings.zeroToTenThousand).max(10000, commonStrings.zeroToTenThousand),
  kcal: yup.number().required(commonStrings.required).min(0, '0-30000').max(30000, '0-30000'),
  product: yup.object(),
  quantity: yup.number().min(1, commonStrings.zeroToTenThousand).max(10000, commonStrings.zeroToTenThousand),
  comment: yup.string(),
});

export const NutritionForm = (props: FormProps) => {
  const {data, onFormSubmit} = props;
  const isUpdate = !!data;

  const methods = useForm<FormData>({defaultValues: isUpdate ? {...data} : defaultFormValues, resolver: yupResolver(schema)});
  const {handleSubmit, control, watch, setValue} = methods;

  const globalContext = useContext(GlobalContext);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    getAllProductByUserId(globalContext.loggedInUserId!)
      .then(response => setProducts(response))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }, []);

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  const product = watch('product');
  const quantity = watch('quantity');

  useEffect(() => {
    if (product !== undefined && !isUpdate) {
      if (quantity === undefined) {
        setValue('quantity', 1);
      } else {
        refreshNutrients();
      }
    }
  }, [product, quantity]);

  function refreshNutrients() {
    for (const prop of ['carbohydrate', 'protein', 'fat', 'kcal']) {
      let value = 0;
      switch (product.unitOfMeasure) {
        case UnitOfMeasure.PIECE:
          value = product[prop as 'carbohydrate' | 'protein' | 'fat' | 'kcal'] * quantity;
          break;
        case UnitOfMeasure.MILLILITERS_100:
        case UnitOfMeasure.GRAMS_100:
          value = Math.floor(product[prop as 'carbohydrate' | 'protein' | 'fat' | 'kcal'] / 100 * quantity);
          break;
        default: value = 0;
      }
      setValue(prop as 'carbohydrate' | 'protein' | 'fat' | 'kcal', value);
    }
  }

  return (
    <>
      <form id="nutrition-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={3}>
            <CCDateTime name="nutritionDate" control={control} label="Étkezés időpontja *"/>
          </Grid>
          <Grid item xs={5.5}>
            <CCAutocomplete
              name="product"
              control={control}
              label="Termék"
              options={products}
              getOptionLabel={option => option.name}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CCText
              name="quantity"
              control={control}
              label="Mennyiség"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">
                    {unitOfMeasureOptions.find(value => value.value === product?.unitOfMeasure)?.label2}
                  </InputAdornment>,
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            {isUpdate && <Button onClick={() => refreshNutrients()}>Kiszámítás</Button>}
          </Grid>
          <Grid item xs={2}>
            <CCText
              name="carbohydrate"
              control={control}
              label="Szénhidrát *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
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
