import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Button, Grid, InputAdornment, Typography} from '@mui/material';
import {ClientDTO} from '../../types/dto/ClientDTO';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-values';
import {CCFormText} from '../input-fields/CCText';
import { CCFormSelect } from '../input-fields/CCSelect';
import {genderOptions, physicalActivityOptions} from '../../constants/enum-label';
import {CCFormDate} from '../input-fields/CCDate';
import {useContext, useEffect} from 'react';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import GlobalContext from '../../store/global-context';
import moment from 'moment';
import {calculateTargetCalories, getAgeByBirthDate} from '../../utils/common-functions';
import DialogContext from '../../store/dialog-context';
import {createClient, updateClient} from '../../utils/api/client-api';

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

export const ClientForm = () => {
  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);

  useEffect(() => {
    if (globalContext.client) {
      reset(globalContext.client);
    }
  }, [globalContext.client]);

  const methods = useForm<FormData>({defaultValues: undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, reset, getValues, setValue} = methods;

  function onSubmit(formData: FormData) {
    if (globalContext.client) {
      updateClient(formData as ClientDTO, globalContext.client.id)
        .then(response => globalContext.setClient(response))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createClient(formData as ClientDTO)
        .then(response => globalContext.setClient(response))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  }

  function calculate() {
    setValue('targetCalories', calculateTargetCalories(
      getValues('weight'),
      getValues('height'),
      getAgeByBirthDate(getValues('birthDate')),
      getValues('gender'),
      getValues('physicalActivity')
    )); // +- 500kcal fogyáshoz és testtömegnöveléshez 0,5 kg változás esetén hetente, fehérje és szénhidrát: 4 kcal, zsír: 9, 20-20-60 pl
  }

  return (
    <>
      <form id="client-form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={'h4'} color="primary" fontWeight="bold"
          fontFamily="cursive" textAlign={'center'}
          mb={3}
        >
          Napi célok
        </Typography>
        <Grid container rowSpacing={4} columnSpacing={4} marginBottom="20px" columns={10}>
          <Grid item xs={2}>
            <CCFormText
              name="targetCalories"
              control={control}
              label="Kalória *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                }, variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetCarbohydrate"
              control={control}
              label="Szénhidrát"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }, variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetProtein"
              control={control}
              label="Fehérje"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }, variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetFat"
              control={control}
              label="Zsír"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }, variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetWater"
              control={control}
              label="Víz"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end" disableTypography>l</InputAdornment>,
                }, variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" form="client-form">Napi célértékek mentése</Button>

        <Typography
          variant={'h4'} color="primary" fontWeight="bold"
          fontFamily="cursive" textAlign={'center'}
          mb={3} mt={6}
        >
          Személyes adatok
        </Typography>
        <Grid container rowSpacing={4} columnSpacing={4} marginBottom="20px">
          <Grid item xs={4}>
            <CCFormText
              name="height"
              control={control}
              label="Magasság *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                },
                variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <CCFormText
              name="weight"
              control={control}
              label="Súly *"
              textFieldProps={{
                type: 'number',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                },
                variant: 'outlined', size: 'medium'
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <CCFormDate
              name="birthDate" control={control} label="Születési dátum *"
              isBirthDatePicker datePickerProps={{maxDate: moment()}}
              textFieldProps={{variant: 'outlined', size: 'medium'}}
            />
          </Grid>
          <Grid item xs={4}>
            <CCFormSelect
              name="gender" control={control} label="Neme *" options={genderOptions}
              formControlProps={{variant: 'outlined', size: 'medium'}} selectProps={{variant: 'outlined'}}
            />
          </Grid>
          <Grid item xs={8}>
            <CCFormSelect
              name="physicalActivity" control={control} label="Fizikai aktivitás *"
              options={physicalActivityOptions}
              formControlProps={{variant: 'outlined', size: 'medium'}}
            />
          </Grid>
        </Grid>
        <Typography
          variant={'h4'} color="primary" fontWeight="bold"
          fontFamily="cursive" textAlign={'center'}
          mb={3} mt={6}
        >
          Ajánlott értékek
        </Typography>
        <Typography variant={'h6'} textAlign={'center'}>
          Az ajánlott napi célértékek kiszámításához kérem adja meg a személyes adatokat.
        </Typography>
        <Button type="submit" form="client-form">Személyes adatok mentée</Button>
      </form>
    </>
  );
};
