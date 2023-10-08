import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return <Wrapper></Wrapper>;
};

export default Loading;

const ani = keyframes`

to{
    transform: rotate(360deg);
}


`;

const Wrapper = styled.div`
  width: 40rem;
  display: flex;
  justify-content: center;
  animation: ${ani} 1s linear infinite;

  &::after {
    content: "";
    width: 5rem;
    height: 5rem;
    border: 10px solid #c5c5c5ab;
    border-radius: 50%;
    border-top-color: var(--maincol);
  }
`;
