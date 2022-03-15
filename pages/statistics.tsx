import Head from 'next/head';
import {MonthlyReviewChart} from '../components/charts/MonthlyReviewChart';
import {WeighChangeChart} from '../components/charts/WeighChangeChart';

export default function StatisticsPage() {
  return (
    <>
      <Head>
        <title>Kalóriaszámláló - Kimutatások</title>
      </Head>
      <h1>Súly változás</h1>
      <WeighChangeChart/>
      <h1>Havi kimutatás</h1>
      <MonthlyReviewChart/>
    </>
  );
}
