import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Button, Grid, InputAdornment, Typography} from '@mui/material';
import {commonStrings} from '../../constants/common-values';
import {CCFormText} from '../input-fields/CCText';
import {useContext, useEffect} from 'react';
import {getNumberSchema} from '../../constants/common-schema';
import GlobalContext from '../../store/global-context';
import DialogContext from '../../store/dialog-context';
import {createDailyTarget, updateDailyTarget} from '../../utils/api/daily-target-api';
import {DailyTargetDTO} from '../../types/dto/DailyTargetDTO';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {PersonalDataForm} from './personal-data-form';

type FormData = Omit<DailyTargetDTO, keyof BaseDTO | 'userId'>

const schema = yup.object({
  targetCalories: getNumberSchema(0, 10000).integer(commonStrings.integerError).required(commonStrings.required),
  targetCarbohydrate: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetProtein: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetFat: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetWater: getNumberSchema(0, 10),
});

export const DailyTargetForm = () => {
  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);

  useEffect(() => {
    if (globalContext.dailyTarget) {
      reset({
        targetCalories: globalContext.dailyTarget.targetCalories,
        targetCarbohydrate: globalContext.dailyTarget.targetCarbohydrate,
        targetProtein: globalContext.dailyTarget.targetProtein,
        targetFat: globalContext.dailyTarget.targetFat,
        targetWater: globalContext.dailyTarget.targetWater,
      });
    }
  }, [globalContext.dailyTarget]);

  const methods = useForm<FormData>({defaultValues: undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, reset, setValue} = methods;

  function onSubmit(formData: FormData) {
    if (globalContext.dailyTarget) {
      updateDailyTarget(formData as DailyTargetDTO, globalContext.dailyTarget.id)
        .then(response => {
          globalContext.setDailyTarget(response);
          dialogContext.showSnackbar('Sikeresen mentve!', 'success');
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createDailyTarget(formData as DailyTargetDTO)
        .then(response => {
          globalContext.setDailyTarget(response);
          dialogContext.showSnackbar('Sikeresen mentve!', 'success');
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  }

  return (
    <>
      <form id="target-form" onSubmit={handleSubmit(onSubmit)}>
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
                type: 'number', variant: 'outlined', size: 'medium', focused: true,
                sx: {
                  '& label, & label.Mui-focused, & .MuiInput-underline:after': {color: '#00790e'},
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: '#00790e'},
                    '&:hover fieldset': {borderColor: '#00790e'},
                    '&.Mui-focused fieldset': {borderColor: '#00790e'},
                  }},
                InputProps: {
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetCarbohydrate"
              control={control}
              label="Szénhidrát"
              textFieldProps={{
                type: 'number', variant: 'outlined', size: 'medium', focused: true,
                sx: {
                  '& label, & label.Mui-focused, & .MuiInput-underline:after': {color: '#ff8800'},
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: '#ff8800'},
                    '&:hover fieldset': {borderColor: '#ff8800'},
                    '&.Mui-focused fieldset': {borderColor: '#ff8800'},
                  }},
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetProtein"
              control={control}
              label="Fehérje"
              textFieldProps={{
                variant: 'outlined', size: 'medium', type: 'number', focused: true,
                sx: {
                  '& label, & label.Mui-focused, & .MuiInput-underline:after': {color: '#b34a02'},
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: '#b34a02'},
                    '&:hover fieldset': {borderColor: '#b34a02'},
                    '&.Mui-focused fieldset': {borderColor: '#b34a02'},
                  }},
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetFat"
              control={control}
              label="Zsír"
              textFieldProps={{
                type: 'number', variant: 'outlined', size: 'medium', focused: true,
                sx: {
                  '& label, & label.Mui-focused, & .MuiInput-underline:after': {color: '#ffc100'},
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: '#ffc100'},
                    '&:hover fieldset': {borderColor: '#ffc100'},
                    '&.Mui-focused fieldset': {borderColor: '#ffc100'},
                  }},
                InputProps: {
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <CCFormText
              name="targetWater"
              control={control}
              label="Víz"
              textFieldProps={{
                type: 'number', variant: 'outlined', size: 'medium', focused: true,
                sx: {
                  '& label, & label.Mui-focused, & .MuiInput-underline:after': {color: '#006fab'},
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: '#006fab'},
                    '&:hover fieldset': {borderColor: '#006fab'},
                    '&.Mui-focused fieldset': {borderColor: '#006fab'},
                  }},
                InputProps: {
                  endAdornment: <InputAdornment position="end" disableTypography>l</InputAdornment>,
                }
              }}
            />
          </Grid>
        </Grid>
        <div className={'actions'}>
          <Button type="submit" form="target-form">Napi célértékek mentése</Button>
        </div>
      </form>
      <PersonalDataForm setTargetValue={setValue}/>
    </>
  );
};
