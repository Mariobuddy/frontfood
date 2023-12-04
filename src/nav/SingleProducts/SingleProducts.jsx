import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingle } from "../../redux/features/singleProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LazyLoading from "../../components/Lazy/LazyLoading";
import { Currency } from "../../components";
import { AiFillStar } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { HiMinusSm } from "react-icons/hi";
import SingleProductSkelton from "../../components/Skelton/SingleProductSkelton";
import ReviewCard from "./ReviewCard";
import { addToCart } from "../../redux/features/cart";
import { toast } from "react-toastify";
import StarMain from "../../components/StarAll/StarMain";
import Loading from "../../components/Loading/Loading";
import base_url from "../Base_Url/Base_Url";
const SingleProducts = () => {
  const { data, loading, error } = useSelector((state) => state.singleProduct);
  const [loadCir, setLoadCir] = useState(true);
  const [gcount, scount] = useState(1);
  const [hideBox, setHideBox] = useState(false);
  const [starState, setStarState] = useState({
    rating: 0,
    comment: "",
    productId: "",
  });
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  let dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingle(id));
  }, [dispatch, id]);

  let getInfo = (data) => {
    setStarState({ ...starState, rating: data });
  };
  const cartCount = (val) => {
    if (val === "add") {
      scount((no) => no + 1);
    } else if (val === "minus" && gcount > 1) {
      scount((no) => no - 1);
    }
  };
  let handCancel = (e) => {
    e.preventDefault();
    setHideBox(false);
    setStarState({ productId: "", rating: 0, comment: "" });
  };
  const handleOnAdd = () => {
    dispatch(addToCart({ data, id, gcount }));
    toast("Item Added To Cart");
  };
  const handReview = () => {
    setStarState({ ...starState, productId: data?.product?._id });
    setHideBox(true);
  };

  let handMainSubmit = async (e) => {
    e.preventDefault();
    if (starState.rating === 0) {
      toast("Please Give Rating");
      return;
    } else if (starState.comment === "") {
      toast("Please Enter Comment");
      return;
    } else {
      setLoadCir(false);
      try {
        const res = await fetch(`${base_url}/api/products/reviews`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(starState),
        });
        const data = await res.json();
        if (res.status === 200) {
          setStarState({ productId: "", rating: 0, comment: "" });
          setHideBox(false);
          dispatch(fetchSingle(id));
          toast("Review Submitted");
          setLoadCir(true);
        } else if (
          data.message === "Product not found" ||
          data.message === "Internal Server Error"
        ) {
          setLoadCir(true);
          toast(data.message);
        }
      } catch (error) {
        return error;
      }
    }
  };

  let takeChange = (e) => {
    setStarState({ ...starState, comment: e.target.value });
  };

  return (
    <Wrapper>
      <div className="starDiv" style={{ display: hideBox ? "flex" : "none" }}>
        <form action="" method="POST">
          <StarMain getStar={getInfo} sendStar={starState.rating} />
          <textarea
            placeholder="Enter your comment"
            className="areaone"
            onChange={takeChange}
            value={starState.comment}
          ></textarea>
          <div className="butWrap">
            <button className="starbuts" onClick={handMainSubmit}>
              Submit
            </button>
            <button className="starbuts2" onClick={handCancel}>
              Cancel
            </button>
          </div>
          <span
            style={{ display: loadCir ? "none" : "block" }}
            className="spadp"
          >
            <Loading />
          </span>
        </form>
      </div>
      <div className="main-div">
        {!loading && !error ? (
          <>
            <div className="imgDiv1">
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                keyBoardControl={true}
                transitionDuration={500}
                autoPlay={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {data?.product?.images.map((val, i) => {
                  return <LazyLoading key={i} src={val.url} />;
                })}
              </Carousel>
            </div>
            <div className="details-div">
              <p className="name">{data?.product?.name}</p>
              <p className="des">{data?.product?.description}</p>
              <div className="star-and-review">
                <div className="line-div">
                  <span>{data?.product?.rating.toFixed(1)}</span>
                  <AiFillStar className="star-icon" />
                </div>
                <span>|</span>
                <span>{data?.product?.numOfReviews} Reviews</span>
              </div>
              <div className="price-div">
                <div className="inner">
                  <p className="price">
                    <Currency price={data?.product?.price} />
                  </p>
                  <p className="mrp">
                    MRP
                    <span>
                      <Currency price={data?.product?.price + 40} />
                    </span>
                  </p>
                  <p className="dis">(45% OFF)</p>
                </div>
                <p className="tax">inclusive of all taxes</p>
              </div>
              <p className="avail">
                Available :
                <span
                  style={{ color: data?.product?.stock <= 0 ? "red" : "green" }}
                >
                  {data?.product?.stock <= 0 ? "OUT OF STOCK" : "IN STOCK"}
                </span>
              </p>
              <p className="avail">
                Id :<span>{data?.product?._id}</span>
              </p>
              <p className="avail line">
                Brand :<span>{data?.product?.brand}</span>
              </p>
              <div className="main-count">
                <div className="count">
                  <button onClick={() => cartCount("add")}>
                    <GrFormAdd className="add" />
                  </button>
                  <p>{gcount}</p>
                  <button onClick={() => cartCount("minus")}>
                    <HiMinusSm className="minus" />
                  </button>
                </div>
                <button
                  disabled={data?.product?.stock < 1 ? true : false}
                  className="buts"
                  onClick={handleOnAdd}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        ) : (
          <SingleProductSkelton />
        )}
      </div>
      <div className="reviews">
        <button className="srbuts" onClick={handReview}>
          Submit Reviews
        </button>
        <p className="des">Reviews</p>
        {data?.product?.reviews.length !== 0 ? (
          <div className="review-main">
            {data?.product?.reviews.map((val, i) => {
              return <ReviewCard key={i} review={val} />;
            })}
          </div>
        ) : (
          <p style={{ marginTop: "6rem", fontSize: "1.6rem" }}>
            No Reviews Yet Message
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default SingleProducts;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8rem 4rem;

  .starDiv {
    position: fixed;
    top: 38%;
    left: 38%;
    z-index: 999999;
    width: 50rem;
    height: 25rem;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    color: #ffffff;

    form {
      width: inherit;
      height: inherit;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      position: relative;

      .spadp {
        position: absolute;
        bottom: 5.5rem;
        left: 39%;
      }
      .areaone {
        width: 80%;
        height: 80px;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical; /* Allow vertical resizing */

        /* Additional styles for text inside the textarea */
        font-family: "Arial", sans-serif;
        font-size: 14px;
        color: #333;
      }

      .butWrap {
        .starbuts {
          width: 15rem;
          font-size: 1.4rem;
          margin-right: 2rem;
          height: 4rem;
          color: #ffffff;
          border: none;
          cursor: pointer;
          background-color: orangered;
          border-radius: 4rem;
          outline: none;
          &:hover {
            color: orangered;
            background-color: transparent;
            border: 2px solid orangered;
          }
        }

        .starbuts2 {
          width: 15rem;
          font-size: 1.4rem;
          margin-right: 2rem;
          height: 4rem;
          color: #ffffff;
          border: none;
          cursor: pointer;
          background-color: red;
          border-radius: 4rem;
          outline: none;
          &:hover {
            color: red;
            background-color: transparent;
            border: 2px solid orangered;
          }
        }
      }
    }
  }

  .reviews {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 9rem;
    flex-direction: column;

    .srbuts {
      width: 15rem;
      margin-top: 1rem;
      font-size: 1.4rem;
      margin-bottom: 3rem;
      height: 4rem;
      color: #ffffff;
      border: none;
      cursor: pointer;
      background-color: orangered;
      border-radius: 4rem;
      outline: none;
      &:hover {
        color: orangered;
        background-color: transparent;
        border: 2px solid orangered;
      }
    }

    .review-main {
      display: flex;
      width: 100%;
      height: 100%;
      margin-top: 4rem;
      overflow: auto;
    }
    .des {
      text-align: center;
      font-size: 2rem;
      position: relative;
      width: 12rem;

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
  }

  .main-div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .imgDiv1 {
      width: 40rem;
      height: 50rem;
      .lazy-load-image-background {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .details-div {
      width: 40vw;
      height: 70vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;

      .name {
        font-size: 2.5rem;
        font-weight: 600;
      }

      .des {
        font-size: 2rem;
        color: var(--dim);
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .price-div {
        position: relative;
        .inner {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
          .mrp {
            font-size: 1.6rem;
            margin-left: 2rem;
            color: var(--dim);
            span {
              font-size: 1.6rem;
              text-decoration: line-through;
              margin-left: 0.5rem;
              color: black;
            }
          }

          .dis {
            font-size: 1.6rem;
            color: orangered;
            margin-left: 2rem;
          }
          .price {
            font-weight: 600;
            font-size: 2.5rem;
          }
        }
        .tax {
          color: orangered;
          font-size: 1.3rem;
          font-weight: 600;
        }
      }

      .line {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 40vw;
          height: 100%;
          top: 2rem;
          left: 0;
          border-bottom: 2px solid var(--dim);
        }
      }

      .avail {
        font-size: 1.4rem;
        color: orangered;
        span {
          color: var(--dim);
          font-size: 1.2rem;
          margin-left: 0.4rem;
        }
      }

      .main-count {
        .count {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 1rem;

          button {
            background-color: transparent;
            border: none;
            outline: none;
            .add {
              font-size: 3rem;
              margin-right: 2rem;
              cursor: pointer;
            }

            .minus {
              font-size: 3rem;
              margin-left: 2rem;
              cursor: pointer;
            }
          }

          p {
            font-size: 2rem;
            color: black;
            width: 1.5vw;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .buts {
          width: 20rem;
          margin-top: 1rem;
          font-size: 1.4rem;
          height: 5rem;
          color: #ffffff;
          border: none;
          cursor: pointer;
          background-color: orangered;
          border-radius: 0.2rem;
          outline: none;
          &:hover {
            color: orangered;
            background-color: transparent;
            border: 2px solid orangered;
          }
        }
      }

      .star-and-review {
        padding: 0.4rem 1rem;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid var(--dim);
        font-size: 1.6rem;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          width: 40vw;
          height: 100%;
          top: 2rem;
          left: 0;
          border-bottom: 2px solid var(--dim);
        }

        .line-div {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 1.6rem;
            font-weight: 500;
            width: fit-content;
          }
          .star-icon {
            color: orangered;
            font-size: 1.6rem;
            margin-left: 0.4rem;
            margin-right: 1rem;
          }
        }
        span {
          font-size: 1.6rem;
          font-weight: 500;

          &:nth-child(1) {
            font-weight: 600;
          }
          &:nth-child(2) {
            color: var(--dim);
            margin-right: 1rem;
          }
          &:nth-child(3) {
            color: var(--dim);
          }
        }
        .star-icon {
          color: orangered;
          font-size: 1.4rem;
        }
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    padding: 4rem 1rem;

    .starDiv {
      position: fixed;
      top: 10%;
      left: 10%;
      z-index: 999999;
      width: 30rem;
      height: 25rem;
      background-color: #f8f8f8;
      border: 1px solid #ccc;
      color: #ffffff;

      form {
        .spadp {
        bottom: 4.5rem;
        left: 30%;
        }
        .areaone {
        }

        .butWrap {
          .starbuts {
            width: 10rem;
            height: 3rem;
          }

          .starbuts2 {
            width: 10rem;
            height: 3rem;
          }
        }
      }
    }

    .reviews {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 9rem;
      flex-direction: column;

      .review-main {
        display: flex;
        width: 100%;
        height: 100%;
        margin-top: 4rem;
        overflow: auto;
      }
      .des {
        text-align: center;
        font-size: 2rem;
        position: relative;
        width: 12rem;
      }
    }

    .main-div {
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      .imgDiv1 {
        width: 30rem;
        height: 40rem;
        .lazy-load-image-background {
          img {
          }
        }
      }
      .details-div {
        width: 90vw;
        height: 50vh;
        display: flex;
        flex-direction: column;

        .name {
        }

        .des {
          font-size: 1.8rem;
        }

        .price-div {
          .inner {
            .mrp {
              span {
              }
            }

            .dis {
            }
            .price {
            }
          }
          .tax {
          }
        }

        .line {
          &::after {
            position: absolute;
            content: "";
            width: 90vw;
            height: 100%;
            top: 1.5rem;
            left: 0;
            border-bottom: 2px solid var(--dim);
          }
        }

        .avail {
          span {
          }
        }

        .main-count {
          .count {
            button {
              .add {
              }

              .minus {
              }
            }

            p {
            }
          }
          .buts {
          }
        }

        .star-and-review {
          &::after {
            border: none;
          }

          .line-div {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: 1.6rem;
              font-weight: 500;
              width: fit-content;
            }
            .star-icon {
              color: orangered;
              font-size: 1.6rem;
              margin-left: 0.5rem;
            }
          }
          span {
            font-size: 1.6rem;
            font-weight: 500;

            &:nth-child(1) {
              font-weight: 600;
            }
            &:nth-child(2) {
              color: var(--dim);
            }
            &:nth-child(3) {
              color: var(--dim);
            }
          }
          .star-icon {
            color: orangered;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
`;
