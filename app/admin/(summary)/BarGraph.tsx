"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export interface GraphData {
  day: string;
  date: string;
  totalAmount: number;
}

interface Props {
  data: GraphData[];
}

const BarGraph: React.FC<Props> = ({ data }) => {
  const labels = data.map((item) => item.day);
  const amounts = data.map((item) => item.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = { scales: { y: { beginAtZero: true } } };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
