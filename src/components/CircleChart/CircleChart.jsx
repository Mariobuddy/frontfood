import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const CircleChart = ({outOfStock,inStock}) => {
  const data = {
    labels: ["OutOfStock", "InStock",],
    datasets: [
      {
        data: [outOfStock, inStock],
        backgroundColor: ["#fe019a", "#B026FF "],
        // borderWidth: [0, 12, 18],
        // radius: 100,
        // hoverOffset: 20,
      },
    ],
  };

  let options = {
    cutout: 60,
  };
  return (
    <Wrapper>
      <Doughnut data={data} options={options} />
    </Wrapper>
  );
};

export default CircleChart;

const Wrapper = styled.div`
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 360px) and (max-width: 768px) {
    width: 100%;
    height: 40vh;
    padding: 1rem 1rem;
    margin-bottom: 3rem;
    .cir-top {
      p {
        &:nth-child(1) {
          font-size: 1.6rem;
        }

        &:nth-child(2) {
          font-size: 1rem;
        }
      }
    }
  }
`;
