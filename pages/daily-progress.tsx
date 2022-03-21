import Head from 'next/head';
import {useContext, useEffect, useState} from 'react';
import GlobalContext from '../store/global-context';
import {Box, Grid, Icon, Tooltip} from '@mui/material';
import {NutrientsProgress} from '../components/NutrientsProgress';
import {WaterProgress} from '../components/WaterProgress';
import {IntakeDTO} from '../types/dto/IntakeDTO';
import {getAllIntakeByDateAndUserId} from '../utils/api/intake-api';
import DialogContext from '../store/dialog-context';
import {ProductType} from '../types/enum/ProductType';
import {unitOfMeasureOptions} from '../constants/enum-label';
import {primaryColor} from '../constants/stlyes';

const listStyle = {
  color: 'white', borderRadius: 10, padding: 10,
  boxShadow: '0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)', fontSize: 'larger',
  display: 'flex', width: '100%', marginTop: 5, marginBottom: 5
};

export default function DailyProgressPage() {
  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);
  const [dailyNutrientIntakes, setDailyNutrientIntakes] = useState<IntakeDTO[]>();
  const [dailyWaterIntakes, setDailyWaterIntakes] = useState<IntakeDTO[]>();

  useEffect(() => {
    globalContext.refreshDailyProgress();
    getAllIntakeByDateAndUserId(new Date().toLocaleDateString())
      .then(response => {
        const [nutrient, water] = response.reduce((previousValue, currentValue) => {
          previousValue[currentValue.product?.productType === ProductType.WATER ? 1 : 0].push(currentValue);
          return previousValue;
        }, [[] as IntakeDTO[], [] as IntakeDTO[]]);
        setDailyNutrientIntakes(nutrient);
        setDailyWaterIntakes(water);
      })
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, []);

  return (
    <div>
      <Head>
        <title>Kalóriaszámláló - Mai haladás</title>
      </Head>
      <Grid container columnSpacing={2} rowSpacing={6} mt={4}>
        <Grid item sm={12} xl={globalContext.dailyTarget?.targetWater ? 9 : 12}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            {globalContext.dailyTarget?.targetCalories && (
              <Grid item xl={3} md={6} xs={12} className="center">
                <NutrientsProgress
                  target={globalContext.dailyTarget?.targetCalories} current={globalContext.dailyProgress?.calorieSum}
                  color={'#00790e'}
                >
                  <Box sx={{mt: -1, fontFamily: 'cursive', color: 'black'}}>
                    Kalória<br/>
                    {`${globalContext.dailyProgress?.calorieSum ?? 0}/${globalContext.dailyTarget?.targetCalories}kcal`}<br/>
                    {((globalContext.dailyProgress?.calorieSum ?? 0) / globalContext.dailyTarget?.targetCalories ?? 1) > 1.4 && (
                      <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                        <Icon color={'error'} fontSize={'large'}>info_outlined</Icon>
                      </Tooltip>
                    )}
                  </Box>
                </NutrientsProgress>
              </Grid>
            )}
            {globalContext.dailyTarget?.targetCarbohydrate && (
              <Grid item xl={3} md={6} xs={12} className="center">
                <NutrientsProgress
                  target={globalContext.dailyTarget?.targetCarbohydrate} current={globalContext.dailyProgress?.carbohydrateSum}
                  color={'#ff8800'}
                >
                  <Box sx={{mt: -1, fontFamily: 'cursive', color: 'black'}}>
                    Szénhidrát<br/>
                    {`${globalContext.dailyProgress?.carbohydrateSum ?? 0}/${globalContext.dailyTarget?.targetCarbohydrate}g`}<br/>
                    {((globalContext.dailyProgress?.carbohydrateSum ?? 0) / globalContext.dailyTarget?.targetCarbohydrate ?? 1) > 1.4 && (
                      <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                        <Icon color={'error'} fontSize={'large'}>info_outlined</Icon>
                      </Tooltip>
                    )}
                  </Box>
                </NutrientsProgress>
              </Grid>
            )}
            {globalContext.dailyTarget?.targetProtein && (
              <Grid item xl={3} md={6} xs={12} className="center">
                <NutrientsProgress
                  target={globalContext.dailyTarget?.targetProtein} current={globalContext.dailyProgress?.proteinSum}
                  color={'#b34a02'}
                >
                  <Box sx={{mt: -1, fontFamily: 'cursive', color: 'black'}}>
                    Fehérje<br/>
                    {`${globalContext.dailyProgress?.proteinSum ?? 0}/${globalContext.dailyTarget?.targetProtein}g`}<br/>
                    {((globalContext.dailyProgress?.proteinSum ?? 0) / globalContext.dailyTarget?.targetProtein ?? 1) > 1.4 && (
                      <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                        <Icon color={'error'} fontSize={'large'}>info_outlined</Icon>
                      </Tooltip>
                    )}
                  </Box>
                </NutrientsProgress>
              </Grid>
            )}
            {globalContext.dailyTarget?.targetFat && (
              <Grid item xl={3} md={6} xs={12} className="center">
                <NutrientsProgress
                  target={globalContext.dailyTarget?.targetFat} current={globalContext.dailyProgress?.fatSum}
                  color={'#ffc100'}
                >
                  <Box sx={{mt: -1, fontFamily: 'cursive', color: 'black'}}>
                    Zsír<br/>
                    {`${globalContext.dailyProgress?.fatSum ?? 0}/${globalContext.dailyTarget?.targetFat}g`}<br/>
                    {((globalContext.dailyProgress?.fatSum ?? 0) / globalContext.dailyTarget?.targetFat ?? 1) > 1.4 && (
                      <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                        <Icon color={'error'} fontSize={'large'}>info_outlined</Icon>
                      </Tooltip>
                    )}
                  </Box>
                </NutrientsProgress>
              </Grid>
            )}
          </Grid>
          <h1 style={{fontFamily: 'cursive', textAlign: 'center', marginTop: 40}}>Napi tápanyagbevitelek</h1>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {dailyNutrientIntakes?.length === 0 ? (
              <div style={{...listStyle, backgroundColor: primaryColor, maxWidth: 600}}>
                <h3 style={{textAlign: 'center', width: '100%', margin: 0}}>Még nincs mai tápanyagbevitel rögzítve.</h3>
              </div>
            ) : (
              <>
                {dailyNutrientIntakes?.map((intake, index) => (
                  <div key={index} style={{...listStyle, backgroundColor: primaryColor, maxWidth: 600}}>
                    <div style={{borderRight: 'black solid 1px', paddingRight: 7, marginRight: 7}}>
                      {new Date(intake.intakeDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </div>
                    <div style={{width: '100%', textAlign: 'center'}}>
                      {` ${intake.product
                        ? `${intake.quantity} ${unitOfMeasureOptions.find(value => value.value === intake.product.unitOfMeasure)?.unit} ` +
                        intake.product.name
                        : 'Egyéb'} `}
                      ({intake.calorie}/{intake.carbohydrate}/{intake.protein}/{intake.fat})
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Grid>
        {globalContext.dailyTarget?.targetWater && (
          <Grid item sm={12} xl={3}>
            {globalContext.dailyTarget?.targetWater && (
              <div className="center">
                <WaterProgress target={globalContext.dailyTarget?.targetWater} current={globalContext.dailyProgress?.waterSum}>
                  <>
                    Víz<br/>
                    {`${globalContext.dailyProgress?.waterSum ?? 0}/${globalContext.dailyTarget?.targetWater}l`}
                  </>
                </WaterProgress>
              </div>
            )}
            <h1 style={{fontFamily: 'cursive', textAlign: 'center', marginTop: 50}}>Napi folyadékbevitelek</h1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {dailyWaterIntakes?.length === 0 ? (
                <div style={{...listStyle, backgroundColor: '#029ffa', maxWidth: 300}}>
                  <h3 style={{textAlign: 'center'}}>Még nincs mai víz fogyasztás rögzítve.</h3>
                </div>
              ) : (
                <>
                  {dailyWaterIntakes?.map((intake, index) => (
                    <div key={index} style={{...listStyle, backgroundColor: '#029ffa', maxWidth: 300}}>
                      <div style={{borderRight: 'black solid 1px', paddingRight: 7, marginRight: 7}}>
                        {new Date(intake.intakeDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                      </div>
                      <div style={{textAlign: 'center', width: '100%'}}>
                        {intake.quantity} ml
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
