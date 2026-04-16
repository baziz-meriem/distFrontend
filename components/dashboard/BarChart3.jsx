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

const BarChart3 = (props) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [selectedRegion, setregion] = useState(props.labels[0]);

  const [distributeurs, setDistributeur] = useState(null);
  const [nbCmds, setNbCmd] = useState(null);

  const [changeRegion, setChanged] = useState(false);

  const handleRegionChange = (regionName) => {
    setregion(regionName);
    let distList = [];
    let nbCmd = [];
    props.data.map((region) => {
      if (region.nom === regionName) {
        region.Distributeur.map((dist) => {
          distList.push(String(dist.id));
          nbCmd.push(dist.nb_cmd);
        });
      }
    });

    setDistributeur(distList);
    setNbCmd(nbCmd);
    setChanged(!changeRegion);
  };

  useEffect(() => {
    !distributeurs && props.data && handleRegionChange(props.labels[0]);
  }, [props.labels.length]);

  useEffect(() => {
    const colors = ["rgb(90,95,213)", "rgb(237,125,49)"];

    distributeurs &&
      setChartData({
        labels: distributeurs,
        datasets: [
          {
            label: "Bar 1",
            data: nbCmds, // First value of each array (Bar 1)
            backgroundColor: colors[0],
            borderColor: colors[0],
            barPercentage: 0.5,
            categoryPercentage: 0.5,
          },
        ],
      });

    setChartOptions({
      indexAxis: "x", // Vertical bars
      elements: {
        bar: {},
      },
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
  }, [changeRegion, props.labels.length]);

  return (
    <div className="h-full w-full pt-1">
      <div
        className="text-10 text-center font-medium tracking-tight"
        style={{ color: "rgb(197,184,175)" }}
      >
        Orders by distributor
      </div>
      {props.labels.length > 0 ? (
        <>
          <div className="flex justify-evenly">
            {props.labels.map((label) => (
              <button
                className="text-8 px-3 py-2 border rounded-md"
                style={{
                  color:
                    selectedRegion === label
                      ? "rgb(90,155,213)"
                      : "rgb(199,199,199)",
                }}
                onClick={() => handleRegionChange(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <Bar data={chartData} options={chartOptions} />{" "}
        </>
      ) : (
        <div className="flex justify-center items-center h-64 ">
          <div className="my-auto animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-light-green"></div>
        </div>
      )}
    </div>
  );
};

export default BarChart3;
