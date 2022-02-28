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

type FormData = Omit<ClientDTO, keyof BaseDTO | 'keycloakId'>

const schema = yup.object({
  name: yup.string().required(commonStrings.required),
  height: yup.number().required(commonStrings.required).min(0, commonStrings.invalidNumber).max(500, commonStrings.invalidNumber),
  weight: yup.number().required(commonStrings.required).min(0, commonStrings.invalidNumber).max(1000, commonStrings.invalidNumber),
  targetCalories: yup.number().required(commonStrings.required),
  birthDate: yup.date().required(),
  gender: yup.string().required(commonStrings.required),
});

export const ClientForm = (props: FormProps) => {
  const {data, onFormSubmit} = props;
  const isUpdate = !!data;

  const methods = useForm<FormData>({defaultValues: isUpdate ? {...data} : undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control} = methods;

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
              name="weight"
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
          <Grid item xs={3}>
            <CCDate name="birthDate" control={control} label="Születési dátum"/>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
