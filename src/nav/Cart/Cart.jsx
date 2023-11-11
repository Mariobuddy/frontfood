import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  console.log(items);
  return <Wrapper>
  </Wrapper>;
};

export default Cart;

const Wrapper = styled.div``;
