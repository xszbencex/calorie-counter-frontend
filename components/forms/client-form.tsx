import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Grid, InputAdornment} from '@mui/material';
import {ClientDTO} from '../../types/dto/ClientDTO';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {commonStrings} from '../../constants/common-strings';
import {FormProps} from '../../types/FormProps';
import {CCText} from '../input-fields/CCText';
import { CCSelect } from '../input-fields/CCSelect';
import {genderOptions} from '../../constants/enum-labels';
import {CCDate} from '../input-fields/CCDate';
import {useContext, useEffect} from 'react';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import GlobalContext from '../../store/global-context';

type FormData = Omit<ClientDTO, keyof BaseDTO | 'keycloakId'>

const schema = yup.object({
  height: getNumberSchema(1, 500).integer(commonStrings.integerError).required(commonStrings.required),
  weight: getNumberSchema(1, 1000).required(commonStrings.required),
  targetCalories: getNumberSchema(0, 10000).integer(commonStrings.integerError).required(commonStrings.required),
  targetCarbohydrate: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetProtein: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  targetFat: getNumberSchema(0, 10000).integer(commonStrings.integerError),
  birthDate: getDateSchema().required(commonStrings.required),
  gender: yup.string().required(commonStrings.required),
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
  const {handleSubmit, control, reset} = methods;

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <>
      <form id="client-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={2}>
            <CCSelect name="gender" control={control} label="Neme *" options={genderOptions}/>
          </Grid>
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={2}>
            <CCText
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
          <Grid item xs={3}>
            <CCDate name="birthDate" control={control} label="Születési dátum *" isBirthDatePicker/>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
