import React from "react";
import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";

const Services = () => {
  return (
    <Wrapper>
      <div className="one">
        <div className="cir">
          <TbTruckDelivery />
        </div>
        <p>Super Fast And Super Delivery</p>
      </div>

      <div className="mix">
        <div className="two">
          <div className="cir">
            <MdSecurity />
          </div>
          <p>Non-contact Shipping</p>
        </div>

        <div className="three">
          <div className="cir">
            <GiReceiveMoney />
          </div>
          <p>Money-back Guaranteed</p>
        </div>
      </div>

      <div className="four">
        <div className="cir">
          <RiSecurePaymentFill />
        </div>
        <p>Super Secure Payment System</p>
      </div>
    </Wrapper>
  );
};

export default Services;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0rem;

  .cir {
    border-radius: 50%;
    background-color: #ffffff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    color: var(--maincol);
  }

  .one {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f0efef;
    height: 18rem;
    width: 25rem;
    border-radius: 2rem;
    margin-right: 2rem;

    p {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }

  .two {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0efef;
    width: 25rem;
    border-radius: 1.5rem;
    height: 8rem;
    margin-bottom: 2rem;

    p {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }

  .three {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0efef;
    width: 25rem;
    border-radius: 1.5rem;
    height: 8rem;

    p {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }

  .four {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f0efef;
    height: 18rem;
    width: 25rem;
    border-radius: 2rem;
    margin-left: 2rem;

    p {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }

  @media (min-width: 300px) and (max-width: 600px) {
    width: 100vw;
    height: fit-content;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0rem 0rem;

    .cir {
      border-radius: 50%;
      background-color: #ffffff;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
      color: #9b42d3;
    }

    .one {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #f0efef;
      height: 18rem;
      width: 25rem;
      border-radius: 2rem;
      margin-right: 0rem;
      margin-bottom: 4rem;
      margin-top: 4rem;

      p {
        font-size: 1.2rem;
        margin-top: 1rem;
      }
    }

    .two {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0efef;
      width: 25rem;
      border-radius: 1.5rem;
      height: 8rem;
      margin-bottom: 2rem;

      p {
        font-size: 1.2rem;
        margin-left: 1rem;
      }
    }

    .three {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0efef;
      width: 25rem;
      border-radius: 1.5rem;
      height: 8rem;

      p {
        font-size: 1.2rem;
        margin-left: 1rem;
      }
    }

    .four {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #f0efef;
      height: 18rem;
      width: 25rem;
      border-radius: 2rem;
      margin-left: 0rem;
      margin-top: 4rem;

      p {
        font-size: 1.2rem;
        margin-top: 1rem;
      }
    }
  }
`;
