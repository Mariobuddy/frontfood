import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleOrder } from "../../redux/features/order";
import Currency from "../../components/Currency/Currency";
import LazyLoading from "../../components/Lazy/LazyLoading";
import Loading from "./../../components/Loading/Loading";
const SingleOrder = () => {
  let dispatch = useDispatch();
  const { singleOrder, singleLoading } = useSelector((state) => state.order);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);
  return (
    <Wrapper>
      {!singleLoading ? (
        <div className="somain">
          <p>Order #{singleOrder?._id}</p>
          <div className="soone">
            <p className="sop">Shipping Info</p>
            <div className="inner">
              <p>
                Name : <span>{singleOrder?.user?.name}</span>
              </p>
              <p>
                Phone : <span>{singleOrder?.shippingInfo?.phoneNo}</span>
              </p>
              <p>
                Address : <span>{singleOrder?.shippingInfo?.address}</span>
              </p>
            </div>
          </div>
          <div className="soone">
            <p className="sop">Payment</p>
            <div className="inner">
              <p
                style={{
                  color:
                    singleOrder?.paymentInfo?.status === "succeeded"
                      ? "green"
                      : "red",
                }}
              >
                {singleOrder?.paymentInfo?.status === "succeeded"
                  ? "Paid"
                  : "Unpaid"}
              </p>
              <p>
                Amount :{" "}
                <span>
                  <Currency price={singleOrder?.totalPrice} />
                </span>
              </p>
            </div>
          </div>
          <div className="soone">
            <p className="sop">Order Status</p>
            <div className="inner">
              <p
                style={{
                  color:
                    singleOrder?.orderStatus === "Processing" ? "red" : "green",
                }}
              >
                {singleOrder?.orderStatus}
              </p>
            </div>
          </div>
          <div className="coItems">
            <p className="coc">Your Cart Items:</p>
            {singleOrder?.orderItems?.map((val, i) => {
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
      ) : (
        <div className="loadso">
          <Loading />
        </div>
      )}
    </Wrapper>
  );
};

export default SingleOrder;

const Wrapper = styled.div`
  padding: 3rem;
  .loadso {
    position: absolute;
    top: 35%;
    left: 47%;
  }
  .somain {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    flex-direction: column;
    > p {
      font-size: 3rem;
      color: orangered;
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

    .soone {
      margin: 2rem 0rem;
      > p {
        font-size: 2.2rem;
      }
      .inner {
        > p {
          margin-left: 3rem;
          font-size: 1.4rem;
          margin: 1rem;

          span {
            color: var(--dim);
          }
        }
      }
    }
  }
`;
