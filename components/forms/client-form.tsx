import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Button, Grid, InputAdornment} from '@mui/material';
import {ClientDTO} from '../../types/dto/ClientDTO';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-strings';
import {FormProps} from '../../types/FormProps';
import {CCFormText} from '../input-fields/CCText';
import { CCFormSelect } from '../input-fields/CCSelect';
import {genderOptions, physicalActivityOptions} from '../../constants/enum-label';
import {CCFormDate} from '../input-fields/CCDate';
import {useContext, useEffect} from 'react';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import GlobalContext from '../../store/global-context';
import moment from 'moment';
import {calculateTargetCalories, getAgeByBirthDate} from '../../utils/common-functions';

type FormData = Omit<ClientDTO, keyof BaseDTO | 'keycloakId'>

const schema = yup.object({
  height: getNumberSchema(1, 500).integer(commonStrings.integerError).required(commonStrings.required),
  weight: getNumberSchema(1, 1000).required(commonStrings.required),
  targetCalories: getNumberSchema(0, 10000).integer(commonStrings.integerError).required(commonStrings.required),
  targetCarbohydrate: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetProtein: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetFat: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetWater: getNumberSchema(0, 10),
  birthDate: getDateSchema().max(moment(), 'Jövőbeli érték nem adható meg.').required(commonStrings.required),
  gender: yup.string().required(commonStrings.required),
  physicalActivity: yup.string().required(commonStrings.required)
});

export const ClientForm = (props: FormProps) => {
  const {onFormSubmit} = props;
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (globalContext.client) {
      reset(globalContext.client);
    }
  }, [globalContext.client]);

  const methods = useForm<FormData>({defaultValues: undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, reset, getValues, setValue} = methods;

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  function calculate() {
    setValue('targetCalories', calculateTargetCalories(
      getValues('weight'),
      getValues('height'),
      getAgeByBirthDate(getValues('birthDate')),
      getValues('gender'),
      getValues('physicalActivity')
    )); // +- 500kcal fogyáshoz és testtömegnöveléshez 0,5 kg változás esetén hetente
  }

  return (
    <>
      <form id="client-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={1}>
            <CCFormText
              name="height"
              control={control}
              label="Magasság *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <CCFormText
              name="weight"
              control={control}
              label="Súly *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormDate
              name="birthDate" control={control} label="Születési dátum *"
              isBirthDatePicker datePickerProps={{maxDate: moment()}}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormSelect name="gender" control={control} label="Neme *" options={genderOptions}/>
          </Grid>
          <Grid item xs={4}>
            <CCFormSelect name="physicalActivity" control={control} label="Fizikai aktivitás *" options={physicalActivityOptions}/>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => calculate()}>Szükséges kalória kiszámítása</Button>
          </Grid>
          <Grid item xs={1.5}>
            <CCFormText
              name="targetCalories"
              control={control}
              label="Napi cél kalória *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CCFormText
              name="targetCarbohydrate"
              control={control}
              label="Napi cél szénhidrát"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CCFormText
              name="targetProtein"
              control={control}
              label="Napi cél fehérje"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CCFormText
              name="targetFat"
              control={control}
              label="Napi cél zsír"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CCFormText
              name="targetWater"
              control={control}
              label="Napi cél víz"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end" disableTypography>l</InputAdornment>,
                }
              }}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
