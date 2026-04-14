import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart1 = (props) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: props.labels,
      datasets: [
        {
          label: "Sales $",
          data: props.data,
          borderColor: "rgb(237,125,49)",
          backgroundColor: "rgb(237,125,49)",
          barThickness: 20,
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
          text: `Taux d'utilisation par region`,
          position: "top",
          font: {
            size: 12,
          },
          color: "rgb(197,184,175)",
        },
      },
      maintainAspectRatio: true,
      responsive: true,
      height: 400,
    });
  }, [props.labels]);

  return (
    <div className="h-full w-full pt-5">
      {props.data.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <div className="flex justify-center items-center h-64 ">
          <div className="my-auto animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-light-green"></div>
        </div>
      )}
    </div>
  );
};

export default BarChart1;
