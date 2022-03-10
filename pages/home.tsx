import {useContext, useEffect} from 'react';
import GlobalContext from '../store/global-context';
import {Box} from '@mui/material';
import {NutrientsProgress} from '../components/NutrientsProgress';
import {WaterProgress} from '../components/WaterProgress';

export default function HomePage() {
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    globalContext.refreshDailyProgress();
  }, []);

  return (
    <div>
      {globalContext.client?.targetCalories && (
        <NutrientsProgress target={globalContext.client?.targetCalories} current={globalContext.dailyProgress?.calorieSum}>
          <Box sx={{mt: -1}}>
            Kalória<br/>
            {`${globalContext.dailyProgress?.calorieSum ?? 0}/${globalContext.client?.targetCalories}kcal`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetCarbohydrate && (
        <NutrientsProgress target={globalContext.client?.targetCarbohydrate} current={globalContext.dailyProgress?.carbohydrateSum}>
          <Box sx={{mt: -1}}>
            Szénhidrát<br/>
            {`${globalContext.dailyProgress?.carbohydrateSum ?? 0}/${globalContext.client?.targetCarbohydrate}g`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetProtein && (
        <NutrientsProgress target={globalContext.client?.targetProtein} current={globalContext.dailyProgress?.proteinSum}>
          <Box sx={{mt: -1}}>
            Fehérje<br/>
            {`${globalContext.dailyProgress?.proteinSum ?? 0}/${globalContext.client?.targetProtein}g`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetFat && (
        <NutrientsProgress target={globalContext.client?.targetFat} current={globalContext.dailyProgress?.fatSum}>
          <Box sx={{mt: -1}}>
            Zsír<br/>
            {`${globalContext.dailyProgress?.fatSum ?? 0}/${globalContext.client?.targetFat}g`}
          </Box>
        </NutrientsProgress>
      )}
      {globalContext.client?.targetCalories && (
        <WaterProgress target={globalContext.client?.targetWater} current={globalContext.dailyProgress?.waterSum}>
          <>
            Víz<br/>
            {`${globalContext.dailyProgress?.waterSum ?? 0}/${globalContext.client?.targetWater}l`}
          </>
        </WaterProgress>
      )}
    </div>
  );
}
