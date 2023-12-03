import React, { useRef } from "react";
import styled from "styled-components";
import { PiMouseSimple } from "react-icons/pi";
import FeaturedProduct from "./FeaturedProduct";
import Typewriter from "typewriter-effect";
const HomeHead = () => {
  const ref = useRef(null);

  const makeScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Wrapper>
        <div className="pcon">
        <span>
          <Typewriter
            options={{
              strings: "Welcome to Mario Store.",
              autoStart: true,
              loop: true,
            }}
          />
          </span>
        </div>
        <div className="inner">
          <h4>FIND AMAZING PRODUCTS BELOW</h4>
          <button onClick={makeScroll}>
            Scroll
            <PiMouseSimple />
          </button>
        </div>
        <div className="whitebg"></div>
      </Wrapper>
      <div ref={ref}>
        <FeaturedProduct />
      </div>
    </>
  );
};

export default HomeHead;

const Wrapper = styled.div`
  position: relative;
  color: #ffffff;
  height: 92.6vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #923cb5;
  background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);

  .whitebg {
    background-color: #ffffff;
    height: 92.6vh;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 3;
    clip-path: polygon(100% 80%, 0% 100%, 100% 100%);
  }

  .pcon {
    width: 22rem;
    height: 3rem;
    span {
      font-size: 1.8rem;
    }
  }

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    h4 {
      font-size: 3rem;
      margin-bottom: 5rem;
    }

    button {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      padding: 1rem 3rem;
      outline: none;
      border: 2px solid transparent;
      &:hover {
        background-color: transparent;
        outline: none;
        color: #ffffff;
        border: 2px solid #ffffff;
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    height: 85.5vh;

    .whitebg {
      height: 85.5vh;
    }

    .pcon {
      width: 22rem;
      height: 3rem;
      p {
        font-size: 1.8rem;
      }
    }

    .inner {
      h4 {
        font-size: 2rem;
        margin-bottom: 5rem;
      }

      button {
      }
    }
  }
`;
