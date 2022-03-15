import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Grid, InputAdornment} from '@mui/material';
import {commonStrings} from '../../constants/common-values';
import {FormProps} from '../../types/FormProps';
import {CCFormText} from '../input-fields/CCText';
import {unitOfMeasureOptions} from '../../constants/enum-label';
import {UnitOfMeasure} from '../../types/enum/UnitOfMeasure';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import moment from 'moment';
import {WaterIntakeRequest} from '../../types/request/WaterIntakeRequest';
import {CCFormDateTime} from '../input-fields/CCDateTime';

type FormData = WaterIntakeRequest;

const defaultFormValues = {
  intakeDate: new Date()
} as FormData;

const schema = yup.object({
  intakeDate: getDateSchema().max(moment().add(1, 's'), 'Jövőbeli érték nem adható meg.').required(commonStrings.required),
  quantity: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  comment: yup.string().nullable(),
});

export const WaterIntakeForm = (props: FormProps) => {
  const {data, onFormSubmit} = props;
  const isUpdate = !!data;

  const methods = useForm<FormData>({defaultValues: isUpdate ? {...data} : defaultFormValues, resolver: yupResolver(schema)});
  const {handleSubmit, control} = methods;

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <>
      <form id="water-intake-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={6}>
            <CCFormDateTime name="intakeDate" control={control} label="Ivás ideje *" dateTimePickerProps={{maxDate: moment()}}/>
          </Grid>
          <Grid item xs={6}>
            <CCFormText
              name="quantity"
              control={control}
              label="Mennyiség *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">
                    {unitOfMeasureOptions.find(value => value.value === UnitOfMeasure.MILLILITERS_100)?.unit}
                  </InputAdornment>,
                },
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
