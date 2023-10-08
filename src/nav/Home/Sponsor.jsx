import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { SiAmazon, SiFlipkart } from "react-icons/si";

const Sponser = () => {
  return (
    <Wrapper>
      <div className="div1">
        <p>Trusted By 1000+ Companies</p>
      </div>
      <div className="div2">
        <FcGoogle className="logot" />
        <FaFacebook className="logot" />
        <BsTwitter className="logot" />
        <SiAmazon className="logot" />
        <SiFlipkart className="logot" />
      </div>
    </Wrapper>
  );
};

export default Sponser;

const Wrapper = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #f0efef;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .div1 {
    p {
      font-size: 1.4rem;
      margin-top: -2rem;
      margin-bottom: 3rem;
    }
  }

  .div2 {
    width: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .logot {
      font-size: 5rem;
    }

    .logot:nth-child(2) {
      color: #3b5998;
    }

    .logot:nth-child(3) {
      color: #87ceeb;
    }

    .logot:nth-child(5) {
      color: #4169e1;
    }
  }

  @media (min-width: 300px) and (max-width: 600px) {
    width: 100vw;
    height: fit-content;
    background-color: #f0efef;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 4rem;

    .div1 {
      p {
        font-size: 1.4rem;
        margin-top: 4rem;
        margin-bottom: 3rem;
      }
    }

    .div2 {
      width: inherit;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 4rem;

      .logot {
        font-size: 3rem;
      }

      .logot:nth-child(2) {
        color: #3b5998;
      }

      .logot:nth-child(3) {
        color: #87ceeb;
      }

      .logot:nth-child(5) {
        color: #4169e1;
      }
    }
  }
`;
