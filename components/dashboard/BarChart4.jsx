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

import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart4 = (props) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [distributeur, setDistributeur] = useState(null);

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    !distributeur &&
      axios
        .get(
          `https://sitandlipapi.onrender.com/api/v1/resourceManagement/distributeur/client/${1}`
        )
        .then((res) => setDistributeur(res.data.data));
  });

  const getStats = (data) => {
    let UP = 0;
    let Down = 0;
    data.map((elem) => {
      if (elem.etat == "up") {
        UP++;
      } else {
        Down++;
      }
    });

    return [UP, Down];
  };

  useEffect(() => {
    distributeur &&
      setChartData({
        labels: ["Up", "Down"],
        datasets: [
          {
            label: "Sales $",
            data: getStats(distributeur),
            borderColor: "rgb(237,125,49)",
            backgroundColor: "rgb(237,25,49)",
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
  }, [distributeur]);

  return (
    <div className="h-full w-full pt-5">
      {distributeur ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <div className="flex justify-center items-center h-64 ">
          <div className="my-auto animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-light-green"></div>
        </div>
      )}
    </div>
  );
};

export default BarChart4;
