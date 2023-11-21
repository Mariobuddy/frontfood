import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../redux/features/order";

const Myorder = () => {
  let dispatch = useDispatch();
  const {data}=useSelector((state)=>state.order);
  console.log(data);
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return <Wrapper></Wrapper>;
};

export default Myorder;

const Wrapper = styled.div``;
