import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedProductSkelton = () => {
  return (
    <Wrapper>
      <div className="img-div">
        <Skeleton className="img-div"/>
      </div>
      <div className="des-div">
        <p>
          <Skeleton />
        </p>
        <p>
          <Skeleton />
        </p>
        <p>
          <Skeleton />
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
  margin: 2rem 0rem;


  .img-div {
    width: 24rem;
    height: 30rem;

  }

  .des-div {
  p{
    margin-top: 1rem;
  }
  }
`;
