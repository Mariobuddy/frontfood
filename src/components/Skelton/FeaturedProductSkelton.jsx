import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedProductSkelton = () => {
  return (
    <Wrapper>
      <div className="img-div">
        <Skeleton/>
      </div>
      <div className="des-div">
        <p><Skeleton/></p>
        <p><Skeleton/></p>
        <p>
          <Skeleton/>
        </p>
      </div>
    </Wrapper>
  );
};

export default FeaturedProductSkelton;

const Wrapper = styled.div`
  height: 37rem;
  width: 24rem;
  transition: all 0.2s ease-in;

  .img-div {
    position: relative;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
  }

  .des-div {
    height: 7rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0.5rem 1rem;

    p {
      font-size: 1.2rem;
      &:nth-child(1) {
        font-size: 1.6rem;
      }
      &:nth-child(2) {
        color: var(--dim);
        font-size: 1.3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }
    }
  }
`;
