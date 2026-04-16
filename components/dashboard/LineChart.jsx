import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the existing chart instance
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: data.datasetLabel,
              data: data.values,
              borderColor: data.borderColor,
              borderWidth: 1,
              fill: false,
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
                text: data.xAxisLabel,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: data.yAxisLabel,
               
              },
              suggestedMin: 0,
            },
          },
          plugins: {
            legend: {
                display: false,
            },
            title: {
              display: true,
              text: "New clients per month",
              position:'bottom',
              legend: {
                display: false,
            },
            },
          },
        },
      });
    }
  }, [chartRef, data]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;