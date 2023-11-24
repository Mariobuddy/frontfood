import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const GraphCart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "My Dataset",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Configuration options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Wrapper>
      <Line data={data} options={options} />
    </Wrapper>
  );
};

export default GraphCart;

const Wrapper = styled.div`
  height: 60rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
