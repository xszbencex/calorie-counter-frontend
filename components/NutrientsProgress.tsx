import {Box, CircularProgress, circularProgressClasses, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

export function NutrientsProgress(
  props: {target?: number, current?: number, size?: number, thickness?: number, color: string, children: JSX.Element}
) {
  const {target, current, children, thickness, size, color} = props;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(!target || !current ? 0 : Math.round((current / target) * 100));
  }, [target, current]);

  const styleProps = {
    size: size ?? 250,
    thickness: thickness ?? 3
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
          color: color,
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
