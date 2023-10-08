import React from 'react'
import styled from 'styled-components';
import Stars from '../../components/Star/Star';
import none from "../../assests/pro.png";

const ReviewCard = ({review}) => {
    const {image,name,rating,comment}=review;
  return (
    <Wrapper>
       <img  className="imgcir" src={image || none} alt={`${name}'s review`} />
      <h3>{name}</h3>
      <div className="rating"><Stars star={rating.toFixed(1)}/></div>
      <p>{comment}</p>
    </Wrapper>
  )
}

export default ReviewCard;

const Wrapper=styled.div`
  border: 2px solid #ddd;
  padding: 1.6rem;
  margin: 1.6rem;
  max-width: 60rem;
  text-align: left;
}

.imgcir{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
}

h3{
    font-size: 1.8rem;
}

.product-review-card img {
  max-width: 100%;
}
p{
    font-size: 1.6rem;
}

.rating {
  color: #f39c12;
  font-weight: bold;
  margin-top: 0.8rem;

`;