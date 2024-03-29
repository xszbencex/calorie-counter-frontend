import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Avatar, Grid, InputAdornment, ListItem, ListItemAvatar} from '@mui/material';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-values';
import {FormProps} from '../../types/FormProps';
import {CCFormText} from '../input-fields/CCText';
import {IntakeDTO} from '../../types/dto/IntakeDTO';
import {CCFormAutocomplete} from '../input-fields/CCAutocomplete';
import {Fragment, useContext, useEffect, useState} from 'react';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {getAllProductByUserId} from '../../utils/api/product-api';
import GlobalContext from '../../store/global-context';
import {productTypeOptions, unitOfMeasureOptions} from '../../constants/enum-label';
import {UnitOfMeasure} from '../../types/enum/UnitOfMeasure';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import moment from 'moment';
import DialogContext from '../../store/dialog-context';
import {CCFormDateTime} from '../input-fields/CCDateTime';

type FormData = Omit<IntakeDTO, keyof BaseDTO | 'userId'>

const defaultFormValues = {
  intakeDate: new Date()
} as FormData;

const schema = yup.object({
  intakeDate: getDateSchema().max(moment().add(1, 's'), 'Jövőbeli érték nem adható meg.').required(commonStrings.required),
  carbohydrate: getNumberSchema(0, 10000).required(commonStrings.required),
  protein: getNumberSchema(0, 10000).required(commonStrings.required),
  fat: getNumberSchema(0, 10000).required(commonStrings.required),
  calorie: getNumberSchema(0, 30000).integer(commonStrings.integerError).required(commonStrings.required),
  product: yup.object().nullable(),
  quantity: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  comment: yup.string().nullable(),
});

export const NutrientIntakeForm = (props: FormProps) => {
  const {data, onFormSubmit} = props;
  const isUpdate = !!data;

  const methods = useForm<FormData>({defaultValues: isUpdate ? {...data} : defaultFormValues, resolver: yupResolver(schema)});
  const {handleSubmit, control, watch, setValue} = methods;

  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    getAllProductByUserId(globalContext.loggedInUserId!)
      .then(response => setProducts(response.sort((a, b) => a.productType > b.productType ? 1 : -1)))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, []);

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  const product = watch('product');
  const quantity = watch('quantity');

  useEffect(() => {
    if (product) {
      if (!quantity) {
        setValue('quantity', product.unitOfMeasure === UnitOfMeasure.PIECE ? 1 : 100, {shouldValidate: true});
      } else {
        if (!isUpdate) {
          refreshNutrients();
        }
      }
    }
  }, [product, quantity]);

  function refreshNutrients() {
    for (const prop of ['carbohydrate', 'protein', 'fat', 'calorie']) {
      let value = 0;
      switch (product.unitOfMeasure) {
        case UnitOfMeasure.PIECE:
          value = product[prop as 'carbohydrate' | 'protein' | 'fat' | 'calorie'] * quantity;
          break;
        case UnitOfMeasure.MILLILITERS_100:
        case UnitOfMeasure.GRAMS_100:
          value = Math.floor(product[prop as 'carbohydrate' | 'protein' | 'fat' | 'calorie'] / 100 * quantity);
          break;
        default: value = 0;
      }
      setValue(prop as 'carbohydrate' | 'protein' | 'fat' | 'calorie', value, {shouldValidate: true});
    }
  }

  return (
    <>
      <form id="nutrient-intake-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={4.1}>
            <CCFormDateTime name="intakeDate" control={control} label="Étkezés ideje *" dateTimePickerProps={{maxDate: moment()}}/>
          </Grid>
          <Grid item xs={5.4}>
            <CCFormAutocomplete
              name="product"
              control={control}
              label="Termék"
              options={products}
              getOptionLabel={option => option.name}
              autocompleteProps={{
                groupBy: option => option.productType,
                renderGroup: params => (
                  <Fragment key={params.key}>
                    <ListItem sx={{pl: 1, opacity: 0.8}}>
                      <ListItemAvatar>
                        <Avatar
                          src={productTypeOptions.find(value => value.value === params.group)?.imageSrc}
                        />
                      </ListItemAvatar>
                      <span style={{fontWeight: 'bold', color: productTypeOptions.find(value => value.value === params.group)?.color}}>
                        {productTypeOptions.find(value => value.value === params.group)?.label}
                      </span>
                    </ListItem>
                    {params.children}
                  </Fragment>
                )
              }}
            />
          </Grid>
          {product && (
            <Grid item xs={2.5}>
              <CCFormText
                name="quantity"
                control={control}
                label="Mennyiség"
                textFieldProps={{
                  type: 'number',
                  InputProps: {
                    endAdornment: <InputAdornment position="end">
                      {unitOfMeasureOptions.find(value => value.value === product?.unitOfMeasure)?.unit}
                    </InputAdornment>,
                  },
                }}
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <CCFormText
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
          <Grid item xs={3}>
            <CCFormText
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
          <Grid item xs={3}>
            <CCFormText
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
          <Grid item xs={3}>
            <CCFormText
              name="calorie"
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
