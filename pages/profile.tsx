import {DailyTargetForm} from '../components/forms/daily-target-form';
import {Box} from '@mui/material';
import Head from 'next/head';

export default function ProfilePage() {

  return (
    <>
      <Head>
        <title>Kalóriaszámláló - Napi célok</title>
      </Head>
      <Box sx={{maxWidth: 1200, mx: 'auto'}}>
        <DailyTargetForm/>
      </Box>
    </>
  );
}
