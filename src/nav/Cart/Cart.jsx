import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LazyLoading from "../../components/Lazy/LazyLoading";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import Currency from "../../components/Currency/Currency";
import { HiMinusSm } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";

import {
  decreaseItem,
  increaseItem,
  removeFromCart,
  clearAll,
} from "../../redux/features/cart";

const Cart = () => {
  const { items, gross } = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  const cartCount = (val) => {
    if (val[0] === "add") {
      dispatch(increaseItem(val[1]));
    } else if (val[0] === "minus") {
      dispatch(decreaseItem(val[1]));
    }
  };

  let handAllClear = () => {
    dispatch(clearAll());
  };

  let handDelete = (id) => {
    dispatch(removeFromCart(id));
    toast("Item Deleted");
  };
  return (
    <Wrapper>
      {items.length !== 0 ? (
        <div className="cart-Top">
          <div className="top">
            <span>Product</span>
            <span>Quantity</span>
            <span>SubTotal</span>
          </div>
          <div className="bottom">
            {items.map((val, i) => {
              return (
                <div key={i} className="cartMain">
                  <div className="concart">
                    <div className="cone">
                      <LazyLoading src={val?.image} />
                    </div>
                    <div className="ctwo">
                      <p>{val?.name}</p>
                      <p>
                        <span>Price :</span> <Currency price={val?.price} />
                      </p>
                      <MdDelete
                        onClick={() => handDelete(val.product)}
                        className="del"
                      />
                    </div>
                  </div>
                  <div className="quantity">
                    <div className="main-count">
                      <div className="count">
                        <button onClick={() => cartCount(["add", val.product])}>
                          <GrFormAdd className="add" />
                        </button>
                        <p>{val.quantity}</p>
                        <button
                          onClick={() => cartCount(["minus", val.product])}
                        >
                          <HiMinusSm className="minus" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="subtotal">
                    <p>
                      <Currency price={val.price * val.quantity} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartDown">
            <span>Gross Total</span>
            <span>
              <Currency price={gross} />
            </span>
          </div>
          <NavLink to={"/protected/shipping"}>
            <button className="cart-Buts">Check Out</button>
          </NavLink>
          <button className="cart-But" onClick={handAllClear}>
            Clear Cart
          </button>
        </div>
      ) : (
        <div className="emptyCart">
          <MdRemoveShoppingCart className="emptyicon" />
          <p className="empty1">
            Your cart is <span>Empty!</span>
          </p>
          <p className="empty2">
            Must add item on the cart before you proceed to check out.
          </p>
          <NavLink to={"/protected/product"}>
            <button className="emptybuts">RETURN TO SHOP</button>
          </NavLink>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  .emptyCart {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50vh;
    padding-top: 4rem;

    .emptyicon {
      font-size: 10rem;
      color: orangered;
    }
    .empty1 {
      font-size: 3rem;
      span {
        color: orangered;
      }
    }
    .empty2 {
      font-size: 1.6rem;
    }
    .emptybuts {
      width: 15rem;
      margin-top: 1rem;
      font-size: 1.4rem;
      height: 4rem;
      color: #ffffff;
      border: none;
      cursor: pointer;
      background-color: orangered;
      border-radius: 0.4rem;
      outline: none;
      &:hover {
        color: orangered;
        background-color: transparent;
        border: 2px solid orangered;
      }
    }
  }

  .cart-Top {
    padding: 4rem 12rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    .cart-Buts {
      color: #ffffff;
      margin-top: 4rem;
      background-color: green;
      padding: 1rem 5rem;
      border-radius: 2rem;
      border: none;
      outline: none;
      cursor: pointer;
      border: 2px solid transparent;
      &:hover {
        background-color: #ffffff;
        border: 2px solid green;
        color: green;
      }
    }

    .cart-But {
      color: #ffffff;
      margin-top: 4rem;
      background-color: red;
      padding: 1rem 5rem;
      border-radius: 0.2rem;
      border: none;
      outline: none;
      align-self: flex-start;
      cursor: pointer;
      border: 2px solid transparent;
      &:hover {
        background-color: #ffffff;
        border: 2px solid red;
        color: red;
      }
    }

    .top {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      background-color: orangered;
      color: #ffffff;
      padding: 1rem 0.2rem;
      font-size: 1.6rem;

      span {
        &:nth-child(1) {
          width: 60%;
        }
      }
    }

    .cartDown {
      border-top: 3px solid orangered;
      margin-top: 1rem;
      width: 26%;
      display: flex;
      justify-content: space-between;
      padding: 1rem 0rem;
      span {
        font-size: 1.6rem;
      }
    }

    .bottom {
      width: 100%;
      .cartMain {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .quantity {
          width: 10%;
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
                  font-size: 2rem;
                  margin-right: 2rem;
                  cursor: pointer;
                }

                .minus {
                  font-size: 2rem;
                  margin-left: 2rem;
                  cursor: pointer;
                }
              }

              p {
                font-size: 1.8rem;
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
              &:hover {
                color: orangered;
                background-color: transparent;
                border: 2px solid orangered;
              }
            }
          }
        }

        .subtotal {
          width: 10%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          p {
            font-size: 1.6rem;
          }
        }

        .concart {
          display: flex;
          width: 67%;
          margin: 2rem 0rem;
          justify-content: flex-start;
          align-items: flex-start;
          .cone {
            .lazy-load-image-background {
              width: 7rem;
              height: 8rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .ctwo {
            font-size: 1.4rem;
            margin-left: 2rem;

            .del {
              color: red;
              font-size: 1.6rem;
              cursor: pointer;
            }
            p {
              &:nth-child(1) {
                margin-bottom: 1rem;
              }
              &:nth-child(2) {
                margin-bottom: 1rem;

                span {
                  color: orangered;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    .emptyCart {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 50vh;
      padding-top: 4rem;

      .emptyicon {
        font-size: 8rem;
        color: orangered;
      }
      .empty1 {
        font-size: 2rem;
        span {
          color: orangered;
        }
      }
      .empty2 {
        font-size: 1.2rem;
      }
      .emptybuts {
        width: 15rem;
        margin-top: 1rem;
        font-size: 1.4rem;
        height: 4rem;
        color: #ffffff;
        border: none;
        cursor: pointer;
        background-color: orangered;
        border-radius: 0.4rem;
        outline: none;
        &:hover {
          color: orangered;
          background-color: transparent;
          border: 2px solid orangered;
        }
      }
    }

    .cart-Top {
      padding: 4rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;

      .cart-Buts {
        color: #ffffff;
        margin-top: 4rem;
        background-color: green;
        padding: 1rem 5rem;
        border-radius: 2rem;
        border: none;
        outline: none;
        cursor: pointer;
        border: 2px solid transparent;
        &:hover {
          background-color: #ffffff;
          border: 2px solid green;
          color: green;
        }
      }

      .cart-But {
        color: #ffffff;
        margin-top: 4rem;
        background-color: red;
        padding: 1rem 5rem;
        border-radius: 0.2rem;
        border: none;
        outline: none;
        align-self: flex-start;
        cursor: pointer;
        border: 2px solid transparent;
        &:hover {
          background-color: #ffffff;
          border: 2px solid red;
          color: red;
        }
      }

      .top {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        background-color: orangered;
        color: #ffffff;
        padding: 1rem 0.2rem;
        font-size: 1.6rem;

        span {
          &:nth-child(1) {
            width: 60%;
          }
        }
      }

      .cartDown {
        border-top: 3px solid orangered;
        margin-top: 1rem;
        width: 36%;
        display: flex;
        justify-content: space-between;
        padding: 1rem 0rem;
        span {
          font-size: 1.2rem;
        }
      }

      .bottom {
        width: 100%;
        .cartMain {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .quantity {
            width: fit-content;
            .main-count {

              .count {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 0rem;

                button {
                  background-color: transparent;
                  border: none;
                  outline: none;
                  .add {
                    font-size: 1.6rem;
                    margin-right: 1rem;
                    cursor: pointer;
                  }

                  .minus {
                    font-size: 1.6rem;
                    margin-left: 1rem;
                    cursor: pointer;
                  }
                }

                p {
                  font-size: 1.6rem;
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
                &:hover {
                  color: orangered;
                  background-color: transparent;
                  border: 2px solid orangered;
                }
              }
            }
          }

          .subtotal {
            width: 10%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            p {
              font-size: 1.4rem;
            }
          }

          .concart {
            display: flex;
            width: 55%;
            margin: 2rem 0rem;
            justify-content: flex-start;
            align-items: flex-start;
            .cone {
              .lazy-load-image-background {
                width: 5rem;
                height: 6rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .ctwo {
              font-size: 1.2rem;
              margin-left: 2rem;

              .del {
                color: red;
                font-size: 1.6rem;
                cursor: pointer;
              }
              p {
                &:nth-child(1) {
                  margin-bottom: 1rem;
                }
                &:nth-child(2) {
                  margin-bottom: 1rem;

                  span {
                    color: orangered;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
