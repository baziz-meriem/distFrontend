import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const labels = data?.labels ?? [];
  const values = data?.values ?? [];
  const datasetLabel = data?.datasetLabel ?? "New clients";
  const borderColor = data?.borderColor ?? "#36A2EB";
  const xAxisLabel = data?.xAxisLabel ?? "Month";
  const yAxisLabel = data?.yAxisLabel ?? "Count";

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (labels.length <= 1 || !chartRef.current) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            borderColor,
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            pointRadius: labels.length < 4 ? 6 : 3,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: xAxisLabel,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: yAxisLabel,
            },
            suggestedMin: 0,
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "New clients per month",
            position: "bottom",
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, values, datasetLabel, borderColor, xAxisLabel, yAxisLabel]);

  if (labels.length === 0 || values.length === 0) {
    return null;
  }

  if (labels.length === 1) {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-white px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          New clients per month
        </p>
        <p className="mt-2 text-sm text-slate-600">{labels[0]}</p>
        <p className="mt-3 text-4xl font-semibold tabular-nums text-slate-900">
          {values[0]}
        </p>
        <p className="mt-1 text-xs text-slate-500">new client(s)</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[220px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
