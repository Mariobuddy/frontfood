import React from "react";
import styled from "styled-components";
import HomeHead from "./HomeHead";
import Services from "./Services";
import Sponser from "./Sponsor";

const Home = () => {
  return (
    <Wrapper>
     <HomeHead/>
     <Services/>
     <Sponser/>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
