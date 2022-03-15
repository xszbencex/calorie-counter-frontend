import {useContext, useEffect, useState} from 'react';
import DialogContext from '../../store/dialog-context';
import {IntakeSumResponse} from '../../types/response/IntakeSumResponse';
import {getIntakeSumByMonth} from '../../utils/api/intake-api';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {CCControlledSelect} from '../input-fields/CCSelect';
import {Box, Icon, IconButton, useMediaQuery} from '@mui/material';
import {monthOptions} from '../../constants/enum-label';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export function MonthlyReviewChart() {
  const dialogContext = useContext(DialogContext);
  const [monthlyIntake, setMonthlyIntake] = useState<IntakeSumResponse[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const smallScreen = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
    getIntakeSumByMonth(selectedYear, selectedMonth)
      .then(response => setMonthlyIntake(response))
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

  function onPrevious() {
    const options = getMonthOptions().map(value => value.value);
    const currentIndex = options.findIndex(value => value === selectedMonth);
    if (currentIndex === 0) {
      setSelectedMonth(12);
      setSelectedYear(prevState => prevState - 1);
    } else {
      setSelectedMonth(options[currentIndex] - 1);
    }
  }

  function onNext() {
    const options = getMonthOptions().map(value => value.value);
    const currentIndex = options.findIndex(value => value === selectedMonth);
    if (currentIndex === options.length - 1) {
      setSelectedMonth(1);
      setSelectedYear(prevState => prevState + 1);
    } else {
      setSelectedMonth(options[currentIndex] + 1);
    }
  }

  return (
    <>
      <Box className="center">
        <Box sx={{width: 40}}>
          {(getYearOptions().findIndex(value => value.value === selectedYear) !== 0
            || getMonthOptions().findIndex(value => value.value === selectedMonth) !== 0) && (
            <IconButton onClick={() => onPrevious()}><Icon>chevron_left</Icon></IconButton>
          )}
        </Box>
        <Box sx={{width: 190, display: 'flex', justifyContent: 'center', mt: -1}}>
          <CCControlledSelect
            options={getYearOptions()} value={selectedYear} onChange={event => setSelectedYear(event.target.value)}
            formControlProps={{fullWidth: false, sx: {mr: 1}}}
          />
          <CCControlledSelect
            options={getMonthOptions()} value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}
            formControlProps={{fullWidth: false}}
          />
        </Box>
        <Box sx={{width: 40}}>
          {(getYearOptions().findIndex(value => value.value === selectedYear) !== getYearOptions().length - 1
            || getMonthOptions().findIndex(value => value.value === selectedMonth) !== getMonthOptions().length - 1) && (
            <IconButton onClick={() => onNext()}><Icon>chevron_right</Icon></IconButton>
          )}
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyIntake}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="intakeDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calorieSum" fill="#317b29" name="Kalória (kcal)" />
        </BarChart>
      </ResponsiveContainer>
      <br/>
      <br/>
      {!smallScreen ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyIntake}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="intakeDate" />
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
            <BarChart data={monthlyIntake}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="intakeDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbohydrateSum" fill="#2ba6a7" name="Szénhidrát (g)" />
            </BarChart>
          </ResponsiveContainer>
          <br/>
          <br/>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyIntake}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="intakeDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="proteinSum" fill="#f2965c" name="Fehérje (g)" />
            </BarChart>
          </ResponsiveContainer>
          <br/>
          <br/>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyIntake}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="intakeDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fatSum" fill="#f7e23d" name="Zsír (g)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      <br/>
      <br/>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyIntake}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="intakeDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="waterSum" fill="#029ffa" name="Víz (l)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
