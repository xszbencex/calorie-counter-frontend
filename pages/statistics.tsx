import Head from 'next/head';
import {MonthlyReviewChart} from '../components/charts/MonthlyReviewChart';
import {WeighChangeChart} from '../components/charts/WeighChangeChart';

export default function StatisticsPage() {
  return (
    <>
      <Head>
        <title>Kalóriaszámláló - Kimutatások</title>
      </Head>
      <WeighChangeChart/>
      <MonthlyReviewChart/>
    </>
  );
}
