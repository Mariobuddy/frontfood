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
  const { data, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchUser({page:1,minPrice:0,maxPrice:2000,category:"",brand:"",sort:"",minStar:"",maxStar:"",search:""}));
  }, [dispatch]);
  return (
    <Wrapper>
      <p className="des">Featured Products</p>
      <div className="main-container">
        {!loading && !error ? (
          <>
            {data?.items?.map((val, i) => {
              return (
                <div key={i}>
                  <NavLink
                    to={`/protected/api/products/${val._id}`}
                    className={"nav-div"}
                  >
                    <div className="inner-container">
                      <div className="img-div">
                        <AddToCart>{val?.brand}</AddToCart>
                        <img alt="error" src={val?.images[0]?.url} />
                        <div className="star-and-review">
                          <div className="line-div">
                            <span>{val?.rating.toFixed(1)}</span>
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
                </div>
              );
            })}
          </>
        ) : (
          <>
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
            <FeaturedProductSkelton />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default FeaturedProduct;

export const AddToCart = styled.button`
  position: absolute;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  background: rgba(
    255,
    255,
    255,
    0.2
  ); /* Adjust the alpha (fourth) value for transparency */
  backdrop-filter: blur(10px);
  outline: none;
  color: #ffffff;
  border-radius: 0.2rem;
  top: 1rem;
  right: 1rem;
  display: none;
  cursor: pointer;
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
