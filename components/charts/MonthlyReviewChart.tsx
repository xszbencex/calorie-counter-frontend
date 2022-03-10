import {useContext, useEffect, useState} from 'react';
import DialogContext from '../../store/dialog-context';
import {NutritionSumResponse} from '../../types/response/NutritionSumResponse';
import {getNutritionSumByMonth} from '../../utils/api/nutrition-api';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {CCControlledSelect} from '../input-fields/CCSelect';
import {Box} from '@mui/material';
import {monthOptions} from '../../constants/enum-label';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export function MonthlyReviewChart() {
  const dialogContext = useContext(DialogContext);
  const [monthlyNutrition, setMonthlyNutrition] = useState<NutritionSumResponse[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | string>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | string>(currentMonth);

  useEffect(() => {
    getNutritionSumByMonth(selectedYear, selectedMonth)
      .then(response => setMonthlyNutrition(response))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, [selectedYear, selectedMonth]);

  function getYearOptions() {
    const yearOptions = [];
    for (let i = 2022; i <= new Date().getFullYear(); i++) {
      yearOptions.push({value: i, label: i});
    }
    return yearOptions;
  }

  function getMonthOptions() {
    return selectedYear === currentYear ? monthOptions.filter(value => value.value <= currentMonth) : monthOptions;
  }

  return (
    <>
      <Box className="center">
        <CCControlledSelect
          options={getYearOptions()} value={selectedYear} onChange={event => setSelectedYear(event.target.value)}
          formControlProps={{fullWidth: false, sx: {mr: 1}}}
        />
        <CCControlledSelect
          options={getMonthOptions()} value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}
          formControlProps={{fullWidth: false}}
        />
      </Box>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyNutrition}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nutritionDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calorieSum" fill="#8884d8" name="Kalória" />
          <Bar dataKey="proteinSum" fill="#8884d8" name="Fehérje" />
          <Bar dataKey="fatSum" fill="#8884d8" name="Zsír" />
          <Bar dataKey="carbohydrateSum" fill="#8884d8" name="Szénhidrát" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
