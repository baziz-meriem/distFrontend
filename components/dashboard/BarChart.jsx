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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
  const [chartData, setChartData] = useState({
    datasets: [],
    labels: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const limitedClients = (props.clients ?? []).slice(0, 10);
    const limitedDistributeurs = (props.distributeurs ?? []).slice(0, 10);
    const title =
      props.title || "Distributors per client";

    setChartData({
      labels: limitedClients,
      datasets: [
        {
          label: "Distributors",
          data: limitedDistributeurs,
          borderColor: "rgb(53,162,235)",
          backgroundColor: "rgba(53,162,235,0.55)",
          maxBarThickness: 56,
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
          text: title,
          position: "bottom",
          font: { size: 13 },
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.dataset.label ?? "Count"}: ${ctx.parsed.y ?? ctx.parsed}`,
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 45, minRotation: 0 },
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
      categoryPercentage: limitedClients.length <= 2 ? 0.55 : 0.7,
      barPercentage: 0.85,
    });
  }, [props.clients, props.distributeurs, props.title]);

  const single =
    chartData.labels?.length === 1 &&
    chartData.datasets?.[0]?.data?.length === 1;
  const loneValue = single ? chartData.datasets[0].data[0] : null;
  const loneLabel = single ? chartData.labels[0] : null;

  if (single && loneLabel != null && loneValue != null) {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-white px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {props.title || "Distributors per client"}
        </p>
        <p className="mt-2 max-w-[90%] text-sm text-slate-700">{loneLabel}</p>
        <p className="mt-3 text-4xl font-semibold tabular-nums text-slate-900">
          {loneValue}
        </p>
        <p className="mt-1 text-xs text-slate-500">distributors</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[220px] pr-2">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
