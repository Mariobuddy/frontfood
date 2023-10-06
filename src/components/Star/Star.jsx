import React from 'react'
import styled from 'styled-components';
import { BsStarHalf,BsStar,BsStarFill } from "react-icons/bs";

const Stars = ({star,review}) => {


  let count=Array.from({length:5},(val,i)=>{

  let num=i+0.5;

  
  return <span key={i} className='span'>
    
    {
      star>=i+1
      ?<BsStarFill className='star'/>
      :star>=num
      ?<BsStarHalf className='star'/>
      :<BsStar className='star'/>
    }


  </span>


  });


  return (
    <Wrapper>
    
     {count}
     <p>{`(${review} customers reviews)`}</p>

    </Wrapper>
  )
}

export default Stars;

const Wrapper=styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
width:30rem;
margin-top: 0.5rem;


.star{
color:#FFA500;
font-size:1.4rem;
}

p{
  margin-left:0.5rem;
  font-size:1rem;
  color:#696969;
}

.span{
  margin-right:0.5rem;
}
`;