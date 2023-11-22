import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleOrder } from "../../redux/features/order";

const SingleOrder = () => {
  let dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.order);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);
  console.log(singleOrder);
  return <Wrapper></Wrapper>;
};

export default SingleOrder;

const Wrapper = styled.div``;
