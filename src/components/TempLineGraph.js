import React from "react";
import styles from "../css/tempLineGraph.module.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);

function TempLineGraph({ lineGraphData }) {
  const labels = ["06:00", "10:00", "14:00", "18:00", "22:00", "02:00"];

  const fixedData = lineGraphData.map((el) => {
    return Number(el.toFixed(0));
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "white",
        anchor: "end",
        align: "end",
        font: { size: "12" },
      },
    },
    scales: {
      y: {
        display: false,

        min: Math.min(...lineGraphData) - 3,
        max: Math.max(...lineGraphData) + 5,
      },
      grid: { display: false },
    },

    maintainAspectRatio: false,
  };

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: [...fixedData],
        fill: true,
        tension: 0.4,
        borderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.2)",
      },
    ],
  };

  return (
    <section className={`${styles.graphContainer} ${styles.small}`}>
      <Line
        data={graphData}
        height={130}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </section>
  );
}

export default TempLineGraph;
