import {useContext, useEffect, useState} from 'react';
import {getNutritionSumByDate} from '../utils/api/nutrition-api';
import GlobalContext from '../store/global-context';
import {Box} from '@mui/material';
import {NutritionSumResponse} from '../types/response/NutritionSumResponse';
import {NutrientsProgress} from '../components/NutrientsProgress';

export default function HomePage() {
  const globalContext = useContext(GlobalContext);
  const [dailyNutrition, setDailyNutrition] = useState<NutritionSumResponse>();

  useEffect(() => {
    getNutritionSumByDate(new Date().toDateString())
      .then(response => setDailyNutrition(response))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }, []);

  return (
    <div>
      <NutrientsProgress target={globalContext.client?.targetCalories} current={dailyNutrition?.calorieSum}>
        <Box sx={{mt: -1}}>
          Kalória<br/>
          {`${dailyNutrition?.calorieSum}/${globalContext.client?.targetCalories}`}
        </Box>
      </NutrientsProgress>
      {globalContext.client?.targetCarbohydrate && (
        <NutrientsProgress target={globalContext.client?.targetCarbohydrate} current={dailyNutrition?.carbohydrateSum}>
          <Box sx={{mt: -1}}>
            Szénhidrát<br/>
            {`${dailyNutrition?.carbohydrateSum}/${globalContext.client?.targetCarbohydrate}`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetProtein && (
        <NutrientsProgress target={globalContext.client?.targetProtein} current={dailyNutrition?.proteinSum}>
          <Box sx={{mt: -1}}>
            Szénhidrát<br/>
            {`${dailyNutrition?.proteinSum}/${globalContext.client?.targetProtein}`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetFat && (
        <NutrientsProgress target={globalContext.client?.targetFat} current={dailyNutrition?.fatSum}>
          <Box sx={{mt: -1}}>
            Szénhidrát<br/>
            {`${dailyNutrition?.fatSum}/${globalContext.client?.targetFat}`}
          </Box>
        </NutrientsProgress>
      )}
    </div>
  );
}
