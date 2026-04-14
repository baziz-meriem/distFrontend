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

const BarChartAM2 = (props) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (props.data) {
      const years = props.data.map((entry) => entry.year);
      const counts = props.data.map((entry) => entry.count);

      setChartData({
        labels: years,
        datasets: [
          {
            label: 'Sales $',
            data: counts,
            borderColor: 'rgb(237,125,49)',
            backgroundColor: 'rgb(90,155,213)',
            barThickness: 8,
          },
        ],
      });
    }

    setChartOptions({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Nombre de pannes par années`,
          position: 'top',
          font: {
            size: 12,
          },
          color: 'rgb(197,184,175)',
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      height: 400,
    });
  }, [props.data]);

  return (
    <div className="h-full w-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChartAM2;
