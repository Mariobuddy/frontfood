import React from 'react'
import styled from 'styled-components';

const FeaturedProduct = () => {
return (
<Wrapper>
    <p>Featured Products</p>
</Wrapper>
  )
}

export default FeaturedProduct;

const Wrapper=styled.div`
width: 100%;
height: 100vh;
border: 2px solid red;
display: flex;
flex-direction: column;
align-items: center;
padding: 2rem 0rem;
p{
    text-align: center;
    font-size: 2rem;
    position: relative;
    width: fit-content;


    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 5px solid var(--maincol);
        width: 100%;
        height: 100%;
    }
}

`;