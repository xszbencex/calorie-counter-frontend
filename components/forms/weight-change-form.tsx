import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Grid, InputAdornment} from '@mui/material';
import {commonStrings} from '../../constants/common-strings';
import {FormProps} from '../../types/FormProps';
import {CCFormText} from '../input-fields/CCText';
import {CCFormDate} from '../input-fields/CCDate';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import moment from 'moment';
import {WeightChangeDTO} from '../../types/dto/WeightChangeDTO';
import {BaseDTO} from '../../types/dto/BaseDTO';

type FormData = Omit<WeightChangeDTO, keyof BaseDTO | 'userId'>;

const defaultFormValues = {
  setDate: new Date()
} as FormData;

const schema = yup.object({
  setDate: getDateSchema().max(moment().add(1, 's'), 'Jövőbeli érték nem adható meg.').required(commonStrings.required),
  weight: getNumberSchema(0, 1000).integer(commonStrings.integerError),
});

export const WeightChangeForm = (props: FormProps) => {
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
      <form id="weight-change-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={6}>
            <CCFormDate name="setDate" control={control} label="Változás napja *" datePickerProps={{maxDate: moment()}}/>
          </Grid>
          <Grid item xs={6}>
            <CCFormText
              name="weight"
              control={control}
              label="Új súly *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                },
              }}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
