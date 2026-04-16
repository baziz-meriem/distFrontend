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

const BarChart2 = (props) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    
    const colors = ["rgb(90,155,13)", "rgb(237,125,49)"];

    setChartData({
      labels: props.labels,
      datasets: [
        {
          label: "Bar 1",
          data: props.data, // First value of each array (Bar 1)
          backgroundColor: colors[0],
          borderColor: colors[0],
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      ],
    });

    setChartOptions({
      indexAxis: "x", // Vertical bars
      elements: {},
      scales: {
        x: {
          grid: {
            display: true,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "right",
        },
        title: {
          display: true,
          text: "",
          position: "top",
          font: {
            size: 12,
          },
          color: "rgb(197,184,175)",
        },
      },
      maintainAspectRatio: true,
      responsive: true,
      interaction: {
        mode: "index",
      },
    });
  }, [props.labels]);

  return (
    <div className="h-full w-full pt-1">
      <div
        className="text-10 text-center font-medium tracking-tight"
        style={{ color: "rgb(197,184,175)" }}
      >
        Consumption orders
      </div>
      {props.data.length>0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <div className="flex justify-center items-center h-64 ">
        <div className="my-auto animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-light-green"></div>
      </div>
      )}
    </div>
  );
};

export default BarChart2;
