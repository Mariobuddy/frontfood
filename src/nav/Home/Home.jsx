import React from "react";
import styled from "styled-components";
import HomeHead from "./HomeHead";

const Home = () => {
  return (
    <Wrapper>
     <HomeHead/>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
