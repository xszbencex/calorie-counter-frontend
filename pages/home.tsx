import Head from 'next/head';
import {useContext, useEffect, useState} from 'react';
import GlobalContext from '../store/global-context';
import {Box, Grid} from '@mui/material';
import {NutrientsProgress} from '../components/NutrientsProgress';
import {WaterProgress} from '../components/WaterProgress';
import {IntakeDTO} from '../types/dto/IntakeDTO';
import {getAllIntakeByDateAndUserId} from '../utils/api/intake-api';
import DialogContext from '../store/dialog-context';
import {ProductType} from '../types/enum/ProductType';
import {unitOfMeasureOptions} from '../constants/enum-label';
import {primaryColor} from '../constants/stlyes';

export default function HomePage() {
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
        <title>Kalóriaszámláló - Napi haladás</title>
      </Head>
      <Grid container columnSpacing={2} columns={10} rowSpacing={3}>
        {globalContext.client?.targetCalories && (
          <Grid item xl={2} md={5} xs={10} className="center">
            <NutrientsProgress target={globalContext.client?.targetCalories} current={globalContext.dailyProgress?.calorieSum}>
              <Box sx={{mt: -1}}>
                Kalória<br/>
                {`${globalContext.dailyProgress?.calorieSum ?? 0}/${globalContext.client?.targetCalories}kcal`}
              </Box>
            </NutrientsProgress>
          </Grid>
        )}
        {globalContext.client?.targetCarbohydrate && (
          <Grid item xl={2} md={5} xs={10} className="center">
            <NutrientsProgress target={globalContext.client?.targetCarbohydrate} current={globalContext.dailyProgress?.carbohydrateSum}>
              <Box sx={{mt: -1}}>
                Szénhidrát<br/>
                {`${globalContext.dailyProgress?.carbohydrateSum ?? 0}/${globalContext.client?.targetCarbohydrate}g`}
              </Box>
            </NutrientsProgress>
          </Grid>
        )}
        {globalContext.client?.targetProtein && (
          <Grid item xl={2} md={5} xs={10} className="center">
            <NutrientsProgress target={globalContext.client?.targetProtein} current={globalContext.dailyProgress?.proteinSum}>
              <Box sx={{mt: -1}}>
                Fehérje<br/>
                {`${globalContext.dailyProgress?.proteinSum ?? 0}/${globalContext.client?.targetProtein}g`}
              </Box>
            </NutrientsProgress>
          </Grid>
        )}
        {globalContext.client?.targetFat && (
          <Grid item xl={2} md={5} xs={10} className="center">
            <NutrientsProgress target={globalContext.client?.targetFat} current={globalContext.dailyProgress?.fatSum}>
              <Box sx={{mt: -1}}>
                Zsír<br/>
                {`${globalContext.dailyProgress?.fatSum ?? 0}/${globalContext.client?.targetFat}g`}
              </Box>
            </NutrientsProgress>
          </Grid>
        )}
        {globalContext.client?.targetWater && (
          <Grid item xl={2} md={5} xs={10} className="center">
            <WaterProgress target={globalContext.client?.targetWater} current={globalContext.dailyProgress?.waterSum}>
              <>
                Víz<br/>
                {`${globalContext.dailyProgress?.waterSum ?? 0}/${globalContext.client?.targetWater}l`}
              </>
            </WaterProgress>
          </Grid>
        )}
      </Grid>
      <Grid container columnSpacing={10} rowSpacing={6}>
        <Grid item xs={12} md={8} sx={{textAlign: 'center'}}>
          <h1 style={{fontFamily: 'cursive'}}>Napi tápanyag tételek</h1>
          <div>
            {dailyNutrientIntakes?.map((intake, index) => (
              <div key={index} style={{backgroundColor: primaryColor, color: 'white', borderRadius: 10, padding: 10,
                boxShadow: '0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)', fontSize: 'larger',
              }}>
                {`${intake.product
                  ? `${intake.quantity} ${unitOfMeasureOptions.find(value => value.value === intake.product.unitOfMeasure)?.unit} ` +
                  intake.product.name
                  : 'Egyéb'} `}
                K: {intake.calorie}kcal
                Sz: {intake.carbohydrate}g
                F: {intake.protein} g
                Zs: {intake.fat} g
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4} sx={{textAlign: 'center'}}>
          <h1 style={{fontFamily: 'cursive'}}>Napi folyadék tételek</h1>
          <div>
            {dailyWaterIntakes?.map((intake, index) => (
              <div key={index} style={{backgroundColor: '#029ffa', color: 'white', borderRadius: 10, padding: 10, marginBottom: 10,
                boxShadow: '0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)', fontSize: 'larger',
              }}>
                {intake.quantity} ml
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
