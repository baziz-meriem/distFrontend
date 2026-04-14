import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const limitedClients = props.clients.slice(0, 10);
    const limitedDistributeurs = props.distributeurs.slice(0, 10);

    setChartData({
      labels: limitedClients,
      datasets: [
        {
          label: 'Sales $',
          data: limitedDistributeurs,
          borderColor: 'rgb(53,162,235)',
          backgroundColor: 'rgb(53,162,235,0.4)',
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Nombre de distributeurs par client',
          position: 'bottom',
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="h-full pr-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
