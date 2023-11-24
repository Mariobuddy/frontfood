import React from "react";
import styled from "styled-components";
import { Currency } from "../../components";
import GraphCart from "../../components/GraphCart/GraphCart";
import CircleChart from "../../components/CircleChart/CircleChart";
const DashDashboard = () => {
  return (
    <Wrapper>
      <p>Dashboard</p>
      <div className="dashone">
        <p>Total Amount</p>
        <p>
          <Currency price={4555} />
        </p>
      </div>
      <div className="dashtwo">
        <div className="dashCir">
          <p>Products</p>
          <p>50</p>
        </div>
        <div className="dashCir">
          <p>Orders</p>
          <p>10</p>
        </div>
        <div className="dashCir">
          <p>Users</p>
          <p>2</p>
        </div>
      </div>
      <div className="dashthree">
        <GraphCart />
      </div>
      <div className="dashfour">
        <CircleChart/>
      </div>
    </Wrapper>
  );
};

export default DashDashboard;

const Wrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom:4rem;
  }
  .dashone {
    width: 90%;
    background-color: orangered;
    margin-bottom:4rem;
    padding: 1rem 0rem;
    > p {
      font-size: 1.4rem;
      text-align: center;
      color: #ffffff;
    }
  }

  .dashtwo {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin-bottom:4rem;

    .dashCir {
      width: 20rem;
      height: 20rem;
      background-color: #8B0000;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > p {
        font-size: 1.6rem;
        color: #ffffff;
      }

      &:nth-child(2) {
        background-color: #8B8000;
      }
      &:nth-child(3) {
        background-color: black;
      }
    }
  }

  .dashthree {
    width: 90%;
    margin-bottom:4rem;
  }
  .dashfour {
    width: 90%;
    margin-bottom:4rem;
  }
`;
