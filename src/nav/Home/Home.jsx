import React from "react";
import styled from "styled-components";
import HomeHead from "./HomeHead";
import FeaturedProduct from "./FeaturedProduct";

const Home = () => {
  return (
    <Wrapper>
     <HomeHead/>
     <FeaturedProduct/>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
