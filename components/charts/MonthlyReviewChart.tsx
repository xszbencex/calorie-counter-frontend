import {useContext, useEffect, useState} from 'react';
import DialogContext from '../../store/dialog-context';
import {NutritionSumResponse} from '../../types/response/NutritionSumResponse';
import {getNutritionSumByMonth} from '../../utils/api/nutrition-api';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {CCControlledSelect} from '../input-fields/CCSelect';
import {Box, useMediaQuery} from '@mui/material';
import {monthOptions} from '../../constants/enum-label';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export function MonthlyReviewChart() {
  const dialogContext = useContext(DialogContext);
  const [monthlyNutrition, setMonthlyNutrition] = useState<NutritionSumResponse[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | string>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | string>(currentMonth);
  const smallScreen = useMediaQuery('(max-width: 1000px)');

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
          <Bar dataKey="calorieSum" fill="#317b29" name="Kalória (kcal)" />
        </BarChart>
      </ResponsiveContainer>
      {!smallScreen ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyNutrition}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nutritionDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbohydrateSum" fill="#2ba6a7" name="Szénhidrát (g)" />
            <Bar dataKey="proteinSum" fill="#f2965c" name="Fehérje (g)" />
            <Bar dataKey="fatSum" fill="#f7e23d" name="Zsír (g)" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyNutrition}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nutritionDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbohydrateSum" fill="#2ba6a7" name="Szénhidrát (g)" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyNutrition}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nutritionDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="proteinSum" fill="#f2965c" name="Fehérje (g)" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyNutrition}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nutritionDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fatSum" fill="#f7e23d" name="Zsír (g)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyNutrition}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nutritionDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="waterSum" fill="#029ffa" name="Víz (l)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
