import React, { useEffect } from "react";
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
  let dispatch = useDispatch();
  const {
    data,
    view,
    loading,
    error,
    proCategory,
    totalCount,
    perPageCount,
    sorting,
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

  const getPageNo = (e) => {
    dispatch(changePage(e));
  };
  const handlePriceChange = (values) => {
    dispatch(changePrice(values));
  };
  const getCategory = (e) => {
    if (e.target.value === "All") {
      dispatch(changeCategory(""));
    } else {
      dispatch(changeCategory(e.target.value));
    }
  };
  const changeShow = (val) => {
    if (val === "grid") {
      dispatch(changeView(true));
    } else {
      dispatch(changeView(false));
    }
  };

  const setSort = (e) => {
    dispatch(changeSorting(e.target.value));
  };

  const setCompany = (e) => {
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
      })
    );
  }, [dispatch, page, proCategory, sorting, min, max, company]);
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
            <span style={{ color: "orangered" }}>{data?.nbhits}</span>
          </p>
          <select onChange={setSort}>
            <option value={""}>Recommended</option>
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
                  <button key={i} onClick={getCategory} value={val}>
                    {val}
                  </button>
                );
              })}
            </div>
            <div className="brand">
              <label htmlFor="selone">Company</label>
              <select id="selone" onChange={setCompany}>
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
              <p>Min {<Currency price={min} />}</p>
              <p>Max {<Currency price={max} />}</p>
              <Slider
                min={0}
                max={2000} // Adjust the max value as needed
                range
                defaultValue={[min, max]}
                onChange={handlePriceChange}
                style={{ width: "15rem", margin: "0 auto" }}
              />
            </div>
            <button className="buts">CLEAR FILTERS</button>
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
        perPageCount={perPageCount}
        sendPage={getPageNo}
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
        }
        .price {
          margin-bottom: 2rem;

          .rc-slider-track {
            background-color: var(--maincol); /* Change to your desired color */
            cursor: pointer;
          }

          /* Change the color of the thumb */
          .rc-slider-handle {
            border-color: var(--dim); /* Change to your desired color */
            background-color: var(--dim); /* Change to your desired color */
            cursor: pointer;
          }

          label {
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: 1rem;
          }

          .ranger {
            background-color: #c1b7b7 !important;
            z-index: 333;

            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            border-radius: 1rem;
            height: 0.8rem;
            cursor: pointer;

            &::-moz-range-thumb {
              background-color: #ffffff;
              border: 4px solid var(--maincol);
              border-radius: 100%;
              width: 0.8rem;
              height: 0.8rem;
            }

            &::-webkit-slider-thumb {
              background-color: #ffffff;
              border: 4px solid var(--maincol);
              -webkit-appearance: none;
              border-radius: 100%;
              width: 1.5rem;
              height: 1.5rem;
              margin-top: -0.4rem;
            }

            &::-moz-range-progress {
              background-color: var(--maincol);
              height: inherit;
              height: 0.7rem;
              width: inherit;
              border-radius: 1rem;
            }

            &::-webkit-slider-runnable-track {
              background-color: var(--maincol);
              height: 0.8rem;
              border-radius: 1rem;
            }
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
