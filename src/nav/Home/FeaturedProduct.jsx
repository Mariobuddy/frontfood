import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { Currency } from "../../components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/products";
import FeaturedProductSkelton from "../../components/Skelton/FeaturedProductSkelton";


const FeaturedProduct = () => {
  let dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);
  console.log(data);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Wrapper>
      <p className="des">Featured Products</p>
      <div className="main-container">
            {data?.items?.map((val, i) => {
              return (
            <>
            {
              !loading?(
                <NavLink to={""} key={i} className={"nav-div"}>
                <div className="inner-container">
                  <div className="img-div">
                    <AddToCart>Add To Cart</AddToCart>
                    <img alt="error" src={val?.images[0]?.url} />
                    <div className="star-and-review">
                      <div className="line-div">
                        <span>{val?.rating}</span>
                        <AiFillStar className="star-icon" />
                      </div>
                      <span>|</span>
                      <span>{val?.numOfReviews}</span>
                    </div>
                  </div>
                  <div className="des-div">
                    <p>{val?.name}</p>
                    <p>{val?.description}</p>
                    <p>
                      <Currency price={val?.price} />
                    </p>
                  </div>
                </div>
              </NavLink>
              ):(<FeaturedProductSkelton/>)
            }
            </>
              );
            })}
      </div>
    </Wrapper>
  );
};

export default FeaturedProduct;

const AddToCart = styled.button`
  position: absolute;
  padding: 0.8rem 1.5rem;
  background-color: orangered;
  border: 2px solid transparent;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  border-radius: 0.2rem;
  top: 70%;
  left: 28%;
  display: none;
  transition: all 0.2s ease-in;
  z-index: 4;

  &:hover {
    border: 2px solid #ffffff;
    transition: all 0.2s ease-in;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .des {
    text-align: center;
    font-size: 2rem;
    position: relative;
    width: 20rem;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 3px solid var(--maincol);
      width: 100%;
      height: 100%;
      margin-top: 0.5rem;
    }
  }

  .main-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 5rem;
    flex-wrap: wrap;
    padding: 2rem 5rem;

    .nav-div {
      color: black;
      .inner-container {
        height: 37rem;
        width: 24rem;
        transition: all 0.2s ease-in;
        margin: 2rem 0rem;

        &:hover ${AddToCart} {
          display: block;
        }

        &:hover {
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
          transform: translate(-0px, -5px);
        }

        .img-div {
          position: relative;
          width: fit-content;
          height: fit-content;
          overflow: hidden;
          img {
            height: 30rem;
            width: 24rem;
          }
          .star-and-review {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            padding: 0.5rem;
            width: 6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(
              255,
              255,
              255,
              0.584
            ); /* Semi-transparent white background */
            backdrop-filter: blur(10px); /* Apply a blur effect */

            .line-div {
              display: flex;
              justify-content: center;
              align-items: center;
              span {
                font-size: 1.2rem;
                font-weight: 500;
                width: fit-content;
              }
              .star-icon {
                color: orangered;
                font-size: 1.4rem;
              }
            }
            span {
              font-size: 1.2rem;
              font-weight: 500;
            }
            .star-icon {
              color: orangered;
              font-size: 1.4rem;
            }
          }
        }

        .des-div {
          height: 7rem;
          width: 24rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          padding: 0.5rem 1rem;

          p {
            font-size: 1.2rem;
            &:nth-child(1) {
              font-size: 1.6rem;
            }
            &:nth-child(2) {
              color: var(--dim);
              font-size: 1.3rem;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
