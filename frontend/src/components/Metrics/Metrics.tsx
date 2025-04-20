import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MetricsInt } from '@api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  nodeId: number | undefined;
  metrics: MetricsInt | null;
}

const Metrics: React.FC<MetricsChartProps> = ({ nodeId, metrics }) => {
  if (!metrics || !nodeId) {
    return <div>No data available</div>;
  }

  const nodeMetrics = metrics.filter(metric => metric.node.id === nodeId);
  const labels = nodeMetrics.map(metric => metric.datetime);
  const cpuValues = nodeMetrics.map(metric => metric.utilization.cpu);
  const memoryValues = nodeMetrics.map(metric => metric.utilization.memory);
  const diskValues = nodeMetrics.map(metric => metric.utilization.disc);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'CPU Utilization',
        data: cpuValues,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Memory Utilization',
        data: memoryValues,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      },
      {
        label: 'Disk Utilization',
        data: diskValues,
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Metrics for Node ${nodeMetrics[0].node.caption}`,
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default Metrics;
