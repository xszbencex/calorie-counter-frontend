import Head from 'next/head';
import {MonthlyReviewChart} from '../components/charts/MonthlyReviewChart';
import {WeighChangeChart} from '../components/charts/WeighChangeChart';
import {primaryColor} from '../constants/stlyes';

export default function StatisticsPage() {
  return (
    <>
      <Head>
        <title>Kalóriaszámláló - Kimutatások</title>
      </Head>
      <h1 style={{textAlign: 'center', fontFamily: 'cursive', color: primaryColor}}>Súlyváltozás</h1>
      <WeighChangeChart/>
      <h1 style={{textAlign: 'center', fontFamily: 'cursive', marginTop: 40, color: primaryColor}}>Havi kimutatások</h1>
      <MonthlyReviewChart/>
    </>
  );
}
