import React from "react";
import styled from "styled-components";
import StepperMain from "../../components/StepperMain/StepperMain";
import { useSelector } from "react-redux";
import LazyLoading from "../../components/Lazy/LazyLoading";
import Currency from "../../components/Currency/Currency";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  let navigate = useNavigate();
  const { items, shippingDetails, gross } = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.auth);
  let shippingCharges = gross > 500 ? 0 : 60;
  let gst = gross * 0.18;
  let confirmOrder = {
    subTotal: gross,
    shippingCharges: shippingCharges,
    gst: gst,
    total: gross + shippingCharges + gst,
  };
  let handPayment = () => {
    navigate("/protected/paymentgateway");
    sessionStorage.setItem("orderconfirm", JSON.stringify(confirmOrder));
  };
  return (
    <Wrapper>
      <StepperMain val={1} />
      <div className="corderMain">
        <div className="coleft">
          <p className="cop">Shipping Info</p>
          <div className="coInfo">
            <p>
              <span>Name : </span>
              {data?.user?.name} {data?.user?.surname}
            </p>
            <p>
              <span>Phone : </span>
              {shippingDetails.phone}
            </p>
            <p>
              <span>Address : </span>
              {shippingDetails.address}, {shippingDetails.city},
              {shippingDetails.state}, {shippingDetails.country}.
            </p>
          </div>
          <div className="coItems">
            <p className="coc">Your Cart Items:</p>
            {items.map((val, i) => {
              return (
                <div key={i} className="coInner">
                  <div className="coip">
                    <LazyLoading src={val?.image} alt="items" />
                    <p>{val?.name}</p>
                  </div>
                  <p>
                    {val?.quantity} X {val?.price} ={" "}
                    <span>
                      <Currency price={val?.quantity * val?.price} />
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="coright">
          <p className="cop2">Order Summary</p>
          <div className="copcover">
            <div className="copmix">
              <span className="copmixf">SubTotal:</span>
              <span className="copmixs">
                <Currency price={gross} />
              </span>
            </div>
            <div className="copmix">
              <span className="copmixf">Shipping Charges:</span>
              <span className="copmixs">
                <Currency price={shippingCharges} />
              </span>
            </div>
            <div className="copmix">
              <span className="copmixf">GST:</span>
              <span className="copmixs">
                <Currency price={gst} />
              </span>
            </div>
          </div>
          <div className="copmix2">
            <span className="copmixf2">Total:</span>
            <span className="copmixs2">
              <Currency price={gross + gst + shippingCharges} />
            </span>
          </div>
          <button className="cobuts" onClick={handPayment}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderConfirm;

const Wrapper = styled.div`
  padding: 1rem 4rem;

  .corderMain {
    display: flex;
    position: relative;
    margin-top: 5rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: inherit;
    .coleft {
      width: 70%;
      height: 100%;
      border-right: 2px solid var(--dim);
      padding-left: 5rem;

      .cop {
        font-size: 2.2rem;
        margin-bottom: 3rem;
      }
      .coInfo {
        p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          margin-left: 2rem;
          color: var(--dim);
          span {
            color: black;
          }
        }
      }
      .coItems {
        margin-top: 3rem;
        width: 100%;
        .coc {
          font-size: 2.2rem;
          margin-bottom: 3rem;
        }
        .coInner {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 0rem 3rem;
          margin: 1rem;

          p {
            font-size: 1.3rem;
            color: var(--dim);
            span {
              color: black;
            }
          }

          .coip {
            display: flex;
            justify-content: center;
            align-items: center;
            p {
              font-size: 1.3rem;
              color: var(--dim);
              margin-left: 5rem;
            }
            .lazy-load-image-background {
              width: 5rem;
              height: 6rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }

    .coright {
      width: 30%;
      height: inherit;
      padding: 0rem 5rem;
      position: absolute;
      top: 2rem;
      right: 0rem;

      .cop2 {
        font-size: 2.2rem;
        text-align: center;
        padding-bottom: 0.5rem;
        color: black;
      }
      .copcover {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid var(--dim);
        border-bottom: 2px solid var(--dim);
        margin: 1rem 0rem;
        .copmix {
          display: flex;
          width: 100%;
          font-size: 1.3rem;
          margin: 1.5rem 0rem;
          justify-content: space-between;
          align-items: center;
          .copmixf {
          }
          .copmixs {
            color: var(--dim);
          }
        }
      }
      .copmix2 {
        display: flex;
        width: 100%;
        font-size: 1.3rem;
        margin: 1.5rem 0rem;
        justify-content: space-between;
        align-items: center;
        .copmixf2 {
          font-weight: 600;
        }
        .copmixs2 {
          color: var(--dim);
        }
      }
    }

    .cobuts {
      width: 100%;
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

  @media (min-width: 350px) and (max-width: 768px) {
    padding: 1rem 0rem;
    .corderMain {
      display: flex;
      position: relative;
      margin-top: 5rem;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: inherit;
      flex-direction: column;

      .coleft {
        width: fit-content;
        height: fit-content;
        border-right: none;
        padding-left: 0rem;

        .cop {
          font-size: 2.2rem;
          margin-bottom: 3rem;
        }
        .coInfo {
          p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            margin-left: 2rem;
            color: var(--dim);
            span {
              color: black;
            }
          }
        }
        .coItems {
          margin-top: 3rem;
          width: 100%;
          .coc {
            font-size: 2.2rem;
            margin-bottom: 3rem;
          }
          .coInner {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 0rem 3rem;
            margin: 1rem;

            p {
              font-size: 1.3rem;
              color: var(--dim);
              span {
                color: black;
              }
            }

            .coip {
              display: flex;
              justify-content: center;
              align-items: center;
              p {
                font-size: 1.3rem;
                color: var(--dim);
                margin-left: 5rem;
              }
              .lazy-load-image-background {
                width: 5rem;
                height: 6rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }

      .coright {
        width: 80%;
        height: inherit;
        padding: 0rem 0rem;
        position: relative;
        top: 2rem;
        right: 0rem;
        margin-bottom: 1rem;

        .cop2 {
          font-size: 2.2rem;
          text-align: center;
          padding-bottom: 0.5rem;
          color: black;
        }
        .copcover {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid var(--dim);
          border-bottom: 2px solid var(--dim);
          margin: 1rem 0rem;
          .copmix {
            display: flex;
            width: 100%;
            font-size: 1.3rem;
            margin: 1.5rem 0rem;
            justify-content: space-between;
            align-items: center;
            .copmixf {
            }
            .copmixs {
              color: var(--dim);
            }
          }
        }
        .copmix2 {
          display: flex;
          width: 100%;
          font-size: 1.3rem;
          margin: 1.5rem 0rem;
          justify-content: space-between;
          align-items: center;
          .copmixf2 {
            font-weight: 600;
          }
          .copmixs2 {
            color: var(--dim);
          }
        }
      }

      .cobuts {
        width: 100%;
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
  }
`;
