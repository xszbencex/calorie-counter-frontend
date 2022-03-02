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
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKecyloakInstance} from '../../types/CCKecyloakInstance';
import {useContext, useEffect} from 'react';
import {getNumberSchema} from '../../constants/common-schema';
import GlobalContext from '../../store/global-context';

type FormData = Omit<ClientDTO, keyof BaseDTO | 'keycloakId'>

const schema = yup.object({
  name: yup.string().required(commonStrings.required),
  height: getNumberSchema(1, 500).required(commonStrings.required),
  weight: getNumberSchema(1, 1000).required(commonStrings.required),
  targetCalories: getNumberSchema(0, 10000).required(commonStrings.required),
  targetCarbohydrate: getNumberSchema(0, 10000),
  targetProtein: getNumberSchema(0, 10000),
  targetFat: getNumberSchema(0, 10000),
  birthDate: yup.date().required(commonStrings.required),
  gender: yup.string().required(commonStrings.required),
});

export const ClientForm = (props: FormProps) => {
  const {onFormSubmit} = props;
  const {keycloak} = useKeycloak<CCKecyloakInstance>();
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (globalContext.client) {
      reset(globalContext.client);
    }
  }, [globalContext.client]);

  useEffect(() => {
    if (keycloak?.tokenParsed) {
      setValue('name', `${keycloak?.tokenParsed.family_name} ${keycloak?.tokenParsed.given_name}`);
    }
  }, [keycloak]);

  const methods = useForm<FormData>({defaultValues: undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, setValue, reset} = methods;

  const onSubmit = (formData: FormData) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <>
      <form id="client-form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={2} marginBottom="20px">
          <Grid item xs={4}>
            <CCText name="name" control={control} label="Név *"/>
          </Grid>
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
            <CCDate name="birthDate" control={control} label="Születési dátum"/>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
