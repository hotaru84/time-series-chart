import React, { useMemo } from 'react';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(annotationPlugin);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  ChartData,
  ChartOptions,
  CartesianScaleOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { TimeSeriesData } from './data';
import { Box } from '@chakra-ui/react';
import useChartOptions from './useChartOptions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
);

interface ChartComponentProps {
  data: TimeSeriesData[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const { chartOptionsBase, interaction, plugins, leftAxisOptions, rightAxisOptions, xAxisOptions } = useChartOptions();

  const chartData: ChartData<'bar' | 'line', number[], string> = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: 'Value',
        data: data.map((item) => item.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(48, 87, 113, 0.5)',
        order: 1,
        yAxisID: 'right',
      },
      {
        label: 'Bar Value',
        data: data.map((item) => item.value * 0.8),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        type: 'bar',
        order: 0,
        yAxisID: 'left',
        barPercentage: 1,
        categoryPercentage: 1
      },
      {
        label: 'Bar Value 2',
        data: data.map((item) => item.value * 0.6),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        type: 'bar',
        order: 0,
        yAxisID: 'left',
        barPercentage: 1,
        categoryPercentage: 1
      },
    ],
  };

  const options = useMemo<ChartOptions<'bar' | 'line'>>(() => ({
    ...chartOptionsBase,
    interaction,
    plugins,
    scales: {
      left: leftAxisOptions as CartesianScaleOptions,
      right: rightAxisOptions as CartesianScaleOptions,
      x: xAxisOptions as CartesianScaleOptions,
    },
  }), [chartOptionsBase, interaction, plugins, leftAxisOptions, rightAxisOptions, xAxisOptions]);

  return (
    <Box width={"full"} mx="auto">
      <Chart type='line' options={options} data={chartData} />
    </Box>
  );
};

export default ChartComponent;
