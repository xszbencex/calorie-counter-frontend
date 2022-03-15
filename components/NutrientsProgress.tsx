import {Box, CircularProgress, circularProgressClasses, Theme, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

export function NutrientsProgress(props: {target?: number, current?: number, children: JSX.Element}) {
  const {target, current, children} = props;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(!target || !current ? 0 : Math.round((current / target) * 100));
  }, [target, current]);

  /*useEffect(() => {
    setInterval(() => setProgress(prevState => prevState + 10), 1000);
  }, []);*/

  const styleProps = {
    size: 250,
    thickness: 3
  };

  const getColorByProgress = (theme: Theme) => {
    let color = theme.palette.error.dark;
    if (progress >= 15 && progress < 30) {
      color = theme.palette.error.main;
    } else if (progress >= 30 && progress < 45) {
      color = theme.palette.error.light;
    } else if (progress >= 45 && progress < 60) {
      color = theme.palette.warning.main;
    } else if (progress >= 60 && progress < 80) {
      color = theme.palette.warning.light;
    } else if (progress >= 80 && progress < 100) {
      color = theme.palette.success.light;
    } else if (progress >= 100 && progress < 115) {
      color = theme.palette.success.main;
    } else if (progress >= 115 && progress < 130) {
      color = theme.palette.warning.main;
    } else if (progress >= 130) {
      color = theme.palette.error.main;
    }
    return color;
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        {...styleProps}
        variant="determinate"
        sx={{color: '#e7e7e7'}}
        value={100}
      />
      <CircularProgress
        {...styleProps}
        variant="determinate"
        sx={{
          color: theme => getColorByProgress(theme),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        value={progress > 100 ? 100 : progress}
      />
      <Box className="progress-text-container">
        <Typography component="div" color="text.secondary" sx={{fontSize: 'x-large'}}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
