import {MonthlyReviewChart} from '../components/charts/MonthlyReviewChart';
import {WeighChangeChart} from '../components/charts/WeighChangeChart';

export default function StatisticsPage() {
  return (
    <>
      <WeighChangeChart/>
      <MonthlyReviewChart/>
    </>
  );
}
