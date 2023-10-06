import React from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const SingleProducts = () => {
    const {id}=useParams();
    console.log(id);
  return (
    <Wrapper>

    </Wrapper>
  )
}

export default SingleProducts;

const Wrapper=styled.div`

`;