import {Box, CircularProgress, circularProgressClasses, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

export function NutrientsProgress(props: {target?: number, current?: number, children: JSX.Element}) {
  const {target, current, children} = props;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    function calculateProgress(): number {
      let result = 0;
      if (target && current) {
        result = Math.round((current / target) * 100);
        if (result > 100) {
          result = 100;
        }
      }
      return result;
    }

    setProgress(calculateProgress());
  }, [target, current]);

  const styleProps = {
    size: 120,
    thickness: 3
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        {...styleProps}
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        value={100}
      />
      <CircularProgress
        {...styleProps}
        variant="determinate"
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        value={progress}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="div" color="text.secondary" sx={{textAlign: 'center'}}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
