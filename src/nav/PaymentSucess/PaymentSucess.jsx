import React from "react";
import StepperMain from "../../components/StepperMain/StepperMain";
import styled from "styled-components";
import { IoMdThumbsUp } from "react-icons/io";
import { NavLink } from "react-router-dom";
const PaymentSucess = () => {
  return (
    <Wrapper>
      <StepperMain val={3} />
      <IoMdThumbsUp className="psicon" />
      <div className="psmain">
        <p className="psp">Order Placed</p>
        <NavLink to={"/myorder"}>
          <button className="paymentsucessbuts">View Order</button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default PaymentSucess;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  padding: 1rem 0rem;
  .psicon {
    font-size: 10rem;
    color: orangered;
  }

  .psmain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .psp {
      font-size: 3rem;
      margin-bottom: 3rem;
    }

    .paymentsucessbuts {
      width: 25rem;
      margin-top: 1rem;
      font-size: 1.4rem;
      height: 4rem;
      color: #ffffff;
      border: none;
      cursor: pointer;
      background-color: orangered;
      border-radius: 0.4rem;
      outline: none;
      &:hover {
        color: orangered;
        background-color: transparent;
        border: 2px solid orangered;
      }
    }
  }
`;
