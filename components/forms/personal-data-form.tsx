import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, UseFormSetValue} from 'react-hook-form';
import * as yup from 'yup';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, CardActions,
  CardContent,
  Grid,
  Icon,
  InputAdornment,
  Typography
} from '@mui/material';
import {PersonalDataDTO} from '../../types/dto/PersonalDataDTO';
import {commonStrings} from '../../constants/common-values';
import {CCFormText} from '../input-fields/CCText';
import { CCFormSelect } from '../input-fields/CCSelect';
import {genderOptions, physicalActivityOptions} from '../../constants/enum-label';
import {CCFormDate} from '../input-fields/CCDate';
import {useContext, useEffect, useState} from 'react';
import {getDateSchema, getNumberSchema} from '../../constants/common-schema';
import moment from 'moment';
import {getAgeByBirthDate} from '../../utils/common-functions';
import DialogContext from '../../store/dialog-context';
import {createPersonalData, getPersonalDataByUserId, updatePersonalData} from '../../utils/api/personal-data-api';
import {primaryColor} from '../../constants/stlyes';
import {BaseDTO} from '../../types/dto/BaseDTO';
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKeycloakInstance} from '../../types/CCKeycloakInstance';
import {Gender} from '../../types/enum/Gender';

type FormData = Omit<PersonalDataDTO, keyof BaseDTO | 'userId'>

const schema = yup.object({
  height: getNumberSchema(1, 500).integer(commonStrings.integerError).required(commonStrings.required),
  weight: getNumberSchema(1, 1000).required(commonStrings.required),
  birthDate: getDateSchema().max(moment(), 'Jövőbeli érték nem adható meg.').required(commonStrings.required),
  gender: yup.string().required(commonStrings.required),
  physicalActivity: yup.string().required(commonStrings.required)
});

type RecommendedValues = {
  calorie: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  water: number;
}

export const PersonalDataForm = (props: {setTargetValue: UseFormSetValue<any>}) => {
  const {setTargetValue} = props;
  const {keycloak} = useKeycloak<CCKeycloakInstance>();
  const dialogContext = useContext(DialogContext);
  const [personalData, setPersonalData] = useState<PersonalDataDTO>();
  const [recommendedValues, setRecommendedValues] = useState<RecommendedValues>();

  useEffect(() => {
    getPersonalDataByUserId(keycloak?.subject!)
      .then(response => {
        reset(response);
        setPersonalData(response);
      })
      .catch(error => {
        if (error.code !== '201') {
          dialogContext.showRestCallErrorDialog(error);
        }
      });
  }, []);

  const methods = useForm<FormData>({defaultValues: undefined, resolver: yupResolver(schema)});
  const {handleSubmit, control, reset, watch} = methods;

  function onSubmit(formData: FormData) {
    if (personalData) {
      updatePersonalData(formData as PersonalDataDTO, personalData.id)
        .then(response => {
          setPersonalData(response);
          dialogContext.showSnackbar('Sikeresen mentve!', 'success');
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createPersonalData(formData as PersonalDataDTO)
        .then(response => {
          setPersonalData(response);
          dialogContext.showSnackbar('Sikeresen mentve!', 'success');
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  }

  const watchWeight = watch('weight');
  const watchHeight = watch('height');
  const watchBirthDate = watch('birthDate');
  const watchGender = watch('gender');
  const watchPhysicalActivity = watch('physicalActivity');

  useEffect(() => {
    if (watchWeight && watchHeight && watchBirthDate && watchGender && watchPhysicalActivity) {
      setRecommendedValues(() => {
        const calorie = calculateCalories();
        return {
          calorie: calorie,
          carbohydrate: calculateCarbohydrate(calorie),
          protein: calculateProtein(calorie),
          fat: calculateFat(calorie),
          water: calculateWater(calorie)
        } as RecommendedValues;
      });
    } else if (recommendedValues) {
      setRecommendedValues(undefined);
    }
  }, [watchWeight, watchHeight, watchBirthDate, watchGender, watchPhysicalActivity]);

  function calculateCalories() {
    const BMR = 10 * watchWeight + 6.25 * watchHeight - 5 * getAgeByBirthDate(watchBirthDate) + (watchGender === Gender.MALE ? 5 : -161);
    return BMR * physicalActivityOptions.find(value => value.value === watchPhysicalActivity)?.multiplier!;
    // fehérje és szénhidrát: 4 kcal, zsír: 9, 20-20-60 pl
  }

  function calculateWater(calorie: number) {
    return Math.round(calorie * (4 / 5) / 10) / 100;
  }

  function calculateCarbohydrate(calorie: number) {
    return Math.round(calorie * 0.6 / 4);
  }

  function calculateProtein(calorie: number) {
    return Math.round(calorie * 0.2 / 4);
  }

  function calculateFat(calorie: number) {
    return Math.round(calorie * 0.2 / 9);
  }

  return (
    <>
      <form id="personal-data-form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={'h4'} color="primary" fontWeight="bold"
          fontFamily="cursive" textAlign={'center'}
          mb={3} mt={6}
        >
          Kalkulátor
        </Typography>
        <Accordion
          variant={'outlined'}
          sx={{
            borderColor: primaryColor,
            borderRadius: '15px !important',
            backgroundColor: 'transparent',
            mb: 4,
            '&:before': {opacity: 0}
          }}
        >
          <AccordionSummary expandIcon={<Icon>expand_more</Icon>} id="panel1a-header">
            <Icon color={'primary'} sx={{mb: '-3px', mr: 0.5}}>info_outlined</Icon>
            <Typography variant={'subtitle1'}>Információ</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography textAlign={'justify'}>
              A kövektező adatok megadása után kiszámításra kerülnek az ajánlott napi kalória, makrótápanyag és víz beviteli értékek.
              Az adatok mentésével az oldal következő látogatásakor nem kell újból megadnia az értéket, így gyorsabban újra tudja számolni a
              szükséges értékeket ha erre szüksége van, illetve a súlyának változását is tudja követni a kimutatások menüpont alatt.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Grid container rowSpacing={4} columnSpacing={4} marginBottom="20px">
          <Grid item xs={3}>
            <CCFormText
              name="weight"
              control={control}
              label="Súly *"
              textFieldProps={{
                type: 'number', variant: 'outlined', size: 'medium',
                InputProps: {
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormText
              name="height"
              control={control}
              label="Magasság *"
              textFieldProps={{
                type: 'number', variant: 'outlined', size: 'medium',
                InputProps: {
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormDate
              name="birthDate" control={control} label="Születési dátum *"
              isBirthDatePicker datePickerProps={{maxDate: moment()}}
              textFieldProps={{variant: 'outlined', size: 'medium'}}
            />
          </Grid>
          <Grid item xs={3}>
            <CCFormSelect
              name="gender" control={control} label="Neme *" options={genderOptions}
              formControlProps={{variant: 'outlined', size: 'medium'}} selectProps={{variant: 'outlined'}}
            />
          </Grid>
          <Grid item xs={6}>
            <CCFormSelect
              name="physicalActivity" control={control} label="Fizikai aktivitás *"
              options={physicalActivityOptions}
              formControlProps={{variant: 'outlined', size: 'medium'}}
            />
          </Grid>
          <Grid item xs={6}>
            <div className={'actions'}>
              <Button type="submit" form="personal-data-form">Személyes adatok mentése</Button>
            </div>
          </Grid>
        </Grid>
        {recommendedValues && (
          <Grid container rowSpacing={4} columnSpacing={4} my={1} columns={10}>
            <Grid item xs={2}>
              <Card sx={{textAlign: 'center', backgroundColor: 'transparent', color: '#00790e', borderRadius: 10}}>
                <CardContent>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Kalória
                  </Typography>
                  <Typography variant={'h6'} gutterBottom>
                    {recommendedValues.calorie} kcal
                  </Typography>
                  <Typography variant={'body2'} textAlign={'justify'}>
                    Az ajánlott érték a testsúly megtartásához szükséges értéket határoz meg.
                    Fogyáshoz kevesebb, a testtömeg növeléséhez pedig több kalóriát kell bevinni.
                    Az ajánlott különbség kb 500 kcal 0,5 kg-os súlyváltozáshoz hetente.
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                  <Button
                    sx={{color: '#00790e'}} variant={'text'}
                    onClick={() => setTargetValue('targetCalories', recommendedValues.calorie)}
                  >
                    Beállítás
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card sx={{textAlign: 'center', backgroundColor: 'transparent', color: '#ff8800', borderRadius: 10}}>
                <CardContent>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Szénhidrát
                  </Typography>
                  <Typography variant={'h6'} gutterBottom>
                    {recommendedValues.carbohydrate} g
                  </Typography>
                  <Typography variant={'body2'} textAlign={'justify'}>
                    Az energiabevitel kb 45-65%-t érdemes kitennie a szénhidrátnak. 1 gramm szénhidrát 4 kcal-nak felel meg.
                    Fogyáshoz célszerű a szénhidrátbevitelt alacsonyan tartani.
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                  <Button
                    sx={{color: '#ff8800'}} variant={'text'}
                    onClick={() => setTargetValue('targetCarbohydrate', recommendedValues.carbohydrate)}
                  >
                    Beállítás
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card sx={{textAlign: 'center', backgroundColor: 'transparent', color: '#b34a02', borderRadius: 10}}>
                <CardContent>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Fehérje
                  </Typography>
                  <Typography variant={'h6'} gutterBottom>
                    {recommendedValues.protein} g
                  </Typography>
                  <Typography variant={'body2'} textAlign={'justify'}>
                    Az energiabevitel kb 10-35%-t érdemes kitennie a fehérjének. 1 gramm fehérje 4 kcal-nak felel meg.
                    Az izmok építéséhez célszerű minél több fehréjét bevinni a szervezetbe.
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                  <Button
                    sx={{color: '#b34a02'}} variant={'text'}
                    onClick={() => setTargetValue('targetProtein', recommendedValues.protein)}
                  >
                    Beállítás
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card sx={{textAlign: 'center', backgroundColor: 'transparent', color: '#ffc100', borderRadius: 10}}>
                <CardContent>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Zsír
                  </Typography>
                  <Typography variant={'h6'} gutterBottom>
                    {recommendedValues.fat} g
                  </Typography>
                  <Typography variant={'body2'} textAlign={'justify'}>
                    Az energiabevitel kb 20-35%-t érdemes kitennie a zsírnak. 1 gramm zsír 9 kcal-nak felel meg.
                    Az egészséges életmódhoz célszerű telítetlen zsírokat fogyasztani.
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                  <Button
                    sx={{color: '#ffc100'}} variant={'text'}
                    onClick={() => setTargetValue('targetFat', recommendedValues.fat)}
                  >
                    Beállítás
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card sx={{textAlign: 'center', backgroundColor: 'transparent', color: '#006fab', borderRadius: 10}}>
                <CardContent>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Víz
                  </Typography>
                  <Typography variant={'h6'} gutterBottom>
                    {recommendedValues.water} l
                  </Typography>
                  <Typography variant={'body2'} textAlign={'justify'}>
                    Az ajánlott napi folyadékbevitel 4/5-e vízből (vagy egyéb italokból), a maradék 1/5 pedig például ételekből származzon.
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                  <Button
                    sx={{color: '#006fab'}} variant={'text'}
                    onClick={() => setTargetValue('targetWater', recommendedValues.water)}
                  >
                    Beállítás
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </form>
    </>
  );
};
