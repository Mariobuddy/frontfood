import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  changeView,
  changeCategory,
  changeSorting,
  changePrice,
  changePage,
  changeCompany,
  deleteFilter,
  changeRating,
} from "../../redux/features/products";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import Currency from "../../components/Currency/Currency";
import { NavLink } from "react-router-dom";
import FeaturedProductSkelton from "../../components/Skelton/FeaturedProductSkelton";
import { AiFillStar } from "react-icons/ai";
import { AddToCart } from "../Home/FeaturedProduct";
import PaginationMain from "../../components/Pagination/Pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Product = () => {
  const [onlineBut, setOnlineBut] = useState("0");
  const [selectedValue, setSelectedValue] = useState("All");
  const [selectedValueTwo, setSelectedValueTwo] = useState("All");

  let dispatch = useDispatch();
  const {
    data,
    view,
    loading,
    error,
    proCategory,
    totalCount,
    resultPerPage,
    currentPageLength,
    sorting,
    maxStar,
    minStar,
    min,
    max,
    page,
    company,
  } = useSelector((state) => state.products);
  const categoryArray = [
    "All",
    "Tshirt",
    "Shirt",
    "Top",
    "Boxer",
    "Jeans",
    "Hoddie",
  ];
  const companyArray = [
    "All",
    "Zudio",
    "Roadster",
    "Peter England",
    "Tommy Hilfigure",
    "No Fuss",
  ];

  const setRating = (values) => {
    dispatch(changeRating(values));
  };

  const getPageNo = (e) => {
    dispatch(changePage(e));
  };
  const handlePriceChange = (values) => {
    dispatch(changePrice(values));
  };
  const getCategory = (e) => {
    setOnlineBut(e.target.id);
    if (e.target.value === "All") {
      dispatch(changeCategory(""));
    } else {
      dispatch(changeCategory(e.target.value));
    }
  };
  const clearBut = () => {
    dispatch(deleteFilter());
    setOnlineBut("0");
    setSelectedValue("All");
    setSelectedValueTwo("All");
  };

  const changeShow = (val) => {
    if (val === "grid") {
      dispatch(changeView(true));
    } else {
      dispatch(changeView(false));
    }
  };

  const setSort = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "All") {
      dispatch(changeSorting(""));
    } else {
      dispatch(changeSorting(e.target.value));
    }
  };

  const setCompany = (e) => {
    setSelectedValueTwo(e.target.value);
    if (e.target.value === "All") {
      dispatch(changeCompany(""));
    } else {
      dispatch(changeCompany(e.target.value));
    }
  };
  useEffect(() => {
    dispatch(
      fetchUser({
        page: page,
        minPrice: min,
        maxPrice: max,
        category: proCategory,
        brand: company,
        sort: sorting,
        minStar: minStar,
        maxStar: maxStar,
      })
    );
  }, [
    dispatch,
    page,
    proCategory,
    sorting,
    min,
    max,
    company,
    minStar,
    maxStar,
  ]);
  return (
    <Wrapper>
      <div className="main-div">
        <div className="top-div">
          <input type="text" placeholder="SEARCH" />
          <div className="one1">
            <div
              className={view ? "one activa" : "one"}
              onClick={() => changeShow("grid")}
            >
              <TfiLayoutGrid2Alt className="icon" />
            </div>

            <div
              className={!view ? "one activa" : "one"}
              onClick={() => changeShow("list")}
            >
              <GiHamburgerMenu className="icon" />
            </div>
          </div>
          <p style={{ fontSize: "1.8rem" }}>
            Total Products{" "}
            <span style={{ color: "orangered" }}>{totalCount}</span>
          </p>
          <p style={{ fontSize: "1.8rem" }}>
            Current Page Products{" "}
            <span style={{ color: "orangered" }}>{currentPageLength}</span>
          </p>
          <select value={selectedValue} onChange={setSort}>
            <option value={"All"}>Recommended</option>
            <option value={"price"}>Price(Lowest)</option>
            <option value={"-price"}>Price(Highest)</option>
            <option value={"name"}>Name(a-z)</option>
            <option value={"-name"}>Name(z-a)</option>
          </select>
        </div>
        <div className="bottom-div">
          <div className="left">
            <div className="category">
              <label htmlFor="butone">Category</label>
              {categoryArray.map((val, i) => {
                return (
                  <button
                    id={i}
                    key={i}
                    className={onlineBut === i.toString() ? "lineActive" : ""}
                    onClick={getCategory}
                    value={val}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div className="rating2">
              <label
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Rating
                <span
                  style={{
                    color: "orangered",
                    fontSize: "1.4rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  {minStar} - {maxStar}
                </span>
                <AiFillStar
                  style={{ color: "orangered", marginLeft: "0.5rem" }}
                />
              </label>
              <Slider
                min={0}
                max={5} // Adjust the max value as needed
                range
                value={[minStar, maxStar]}
                onChange={setRating}
                style={{ width: "15rem", margin: "0 auto", marginTop: "1rem" }}
                step={0.01}
              />
            </div>
            <div className="brand">
              <label htmlFor="selone">Company</label>
              <select value={selectedValueTwo} onChange={setCompany}>
                {companyArray.map((val, i) => {
                  return (
                    <option key={i} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="price">
              <label>Price</label>
              <p>
                Min :
                <span style={{ color: "orangered", fontSize: "1.4rem" }}>
                  {<Currency price={min} />}
                </span>
              </p>
              <p>
                Max :
                <span style={{ color: "orangered", fontSize: "1.4rem" }}>
                  {<Currency price={max} />}
                </span>
              </p>
              <Slider
                min={0}
                max={2000} // Adjust the max value as needed
                range
                value={[min, max]}
                onChange={handlePriceChange}
                style={{ width: "15rem", margin: "0 auto" }}
              />
            </div>
            <button className="buts" onClick={clearBut}>
              CLEAR FILTERS
            </button>
          </div>
          <div className="right">
            <div className="main-container">
              {!loading && !error ? (
                <>
                  {data?.items?.map((val, i) => {
                    return (
                      <div key={i}>
                        <NavLink
                          to={`/api/products/${val._id}`}
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
          </div>
        </div>
      </div>
      <PaginationMain
        resultPerPage={resultPerPage}
        sendPage={getPageNo}
        currentPageLength={currentPageLength}
        totalItemCount={totalCount}
      />
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  .lineActive {
    text-decoration: underline;
    text-decoration-color: var(--maincol) !important;
    color: var(--maincol) !important;
    text-decoration-thickness: 0.4rem;
    text-underline-offset: 0.4rem;
    z-index: 88;
  }

  .activa {
    background-color: black !important;
    color: #ffffff;
  }
  .main-div {
    width: 90vw;
    height: 100%;

    .bottom-div {
      width: 100%;
      height: 100%;
      display: flex;

      .right {
        width: 79vw;
        height: 100%;

        .main-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          padding: 1rem;

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
      }

      .left {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        height: 80vh;
        width: 11vw;

        .category {
          display: flex;
          flex-direction: column;
          width: 100%;

          label {
            font-size: 1.8rem;
          }

          button {
            background-color: transparent;
            font-size: 1.6rem;
            color: var(--dim);
            margin-top: 1rem;
            cursor: pointer;
            outline: none;
            width: fit-content;
            border: none;
          }
        }

        .rating2 {
          padding: 1rem 1rem 1rem 0rem;

          label {
            font-size: 1.8rem;
          }

          .rc-slider-rail {
            height: 0.8rem;
          }

          .rc-slider-track {
            background-color: var(--maincol); /* Change to your desired color */
            cursor: pointer;
            height: 0.8rem;
          }

          /* Change the color of the thumb */
          .rc-slider-handle {
            border: 4px solid var(--maincol);
            background-color: #ffffff; /* Change to your desired color */
            cursor: pointer;
            margin-top: -0.3rem;
            height: 1.5rem;
            width: 1.5rem;
            opacity: 1;
          }

          p {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }
        }

        .brand {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;

          label {
            font-size: 1.8rem;
            font-weight: 500;
          }

          select {
            background-color: transparent;
            width: 14rem;
            outline: none;
            border: 1px solid var(--maincol);
            height: 3.1rem;
            margin-top: 1rem;
            padding-left: 0.5rem;
            color: var(--maincol);
            cursor: pointer;

            &:hover {
              color: var(--maincol);
            }

            option {
              font-size: 1.3rem;
              color: var(--txt);
              cursor: pointer;
            }
          }
        }

        .buts {
          background-color: orangered;
          color: #ffffff;
          font-weight: 500;
          padding: 1rem 1.5rem;
          border-radius: 0.3rem;
          border: none;
          outline: none;
          cursor: pointer;
          border: 2px solid orangered;

          &:hover {
            background-color: #ffffff;
            color: orangered;
            border: 2px solid orangered;
          }
        }
        .price {
          margin-bottom: 2rem;

          .rc-slider-rail {
            height: 0.8rem;
          }

          .rc-slider-track {
            background-color: var(--maincol); /* Change to your desired color */
            cursor: pointer;
            height: 0.8rem;
          }

          /* Change the color of the thumb */
          .rc-slider-handle {
            border: 4px solid var(--maincol);
            background-color: #ffffff; /* Change to your desired color */
            cursor: pointer;
            margin-top: -0.3rem;
            height: 1.5rem;
            width: 1.5rem;
            opacity: 1;
          }

          label {
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: 1rem;
          }
          p {
            margin: 1rem 0rem;
            font-size: 1.2rem;
          }
        }
      }
    }

    .top-div {
      width: 100%;
      height: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        background-color: transparent;
        width: 14rem;
        outline: none;
        border: 1px solid var(--maincol);
        height: 3.1rem;
        margin-top: 1rem;
        padding-left: 0.5rem;
        color: var(--maincol);
        cursor: pointer;

        &:hover {
          color: var(--maincol);
        }

        option {
          font-size: 1.3rem;
          color: var(--txt);
          cursor: pointer;
        }
      }

      input {
        width: 16rem;
        padding: 0.6rem 1.5rem;
        font-size: 1.4rem;
        border-radius: 0.2rem;
        outline: none;
        border: 2px solid var(--dim);
      }
      .one1 {
        display: flex;
        justify-content: center;
        align-items: center;

        .one {
          width: 4rem;
          height: 3.2rem;
          background-color: #aeaeae;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 2rem;
          cursor: pointer;
          transition: all 0.2s ease;

          .icon {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;
