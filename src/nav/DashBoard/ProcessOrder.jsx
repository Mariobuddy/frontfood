import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleOrder } from "../../redux/features/order";
import Currency from "../../components/Currency/Currency";
import LazyLoading from "../../components/Lazy/LazyLoading";
import Loading from "./../../components/Loading/Loading";
import { MdCategory } from "react-icons/md";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  let dispatch = useDispatch();
  let [status, setStatus] = useState("");
  const { singleOrder, singleLoading } = useSelector((state) => state.order);
  const [loadCir, setLoadCir] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);
  let GetInput = (e) => {
    setStatus(e.target.value);
  };
  let handUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoadCir(false);
      const res = await fetch(`http://localhost:4000/admin/updatestock/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: status }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setLoadCir(true);
        toast("Order Status Updated Sucessfully");
        dispatch(fetchSingleOrder(id));
        setStatus("");
      } else if (
        data.message === "Order not found" ||
        data.message === "Order already delivered" ||
        data.message === "Internal Server Error"
      ) {
        toast(data.message);
        setLoadCir(true);
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <Wrapper>
      {!singleLoading ? (
        <div className="potop">
          <div
            className="somain"
            style={{
              width: singleOrder?.orderStatus === "Delivered" ? "100%" : "70%",
              borderRight:
                singleOrder?.orderStatus === "Delivered"
                  ? "none"
                  : "2px solid gray",
            }}
          >
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
                      singleOrder?.orderStatus === "Processing"
                        ? "red"
                        : "green",
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
          <div
            className="poright"
            style={{
              display:
                singleOrder?.orderStatus === "Delivered" ? "none" : "flex",
            }}
          >
            <p>Process Order</p>
            <div className="cpDiv">
              <MdCategory className="cpicon" />
              <select onChange={GetInput} value={status} name="category">
                <option value={""}>Select</option>
                {singleOrder?.orderStatus === "Processing" &&
                  singleOrder?.orderStatus !== "Delivered" && (
                    <option value={"Shipped"}>Shipped</option>
                  )}
                {singleOrder?.orderStatus === "Shipped" && (
                  <option value={"Delivered"}>Delivered</option>
                )}
              </select>
            </div>
            <button
              className="cpcbuts"
              disabled={status === "" ? true : false}
              onClick={handUpdate}
            >
              PROCESS
            </button>
            <span
              style={{ display: loadCir ? "none" : "block" }}
              className="spacp"
            >
              <Loading />
            </span>
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

export default ProcessOrder;

const Wrapper = styled.div`
  padding: 3rem;
  .loadso {
    position: absolute;
    top: 35%;
    left: 47%;
  }
  .potop {
    height: 100%;
    width: 100%;
    display: flex;

    .poright {
      width: 26%;
      margin-top: 10rem;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 5rem;
      right: 0rem;
      .spacp {
        position: absolute;
        bottom: 4.5rem;
        left: 40%;
      }

      > p {
        font-size: 2rem;
        margin-bottom: 3rem;
        text-align: center;
      }

      .cpcbuts {
        width: 20vw;
        margin-top: 4rem;
        font-size: 1.6rem;
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

      .cpDiv {
        border: 2px solid var(--dim);
        padding: 1rem 0rem;
        width: 20vw;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .cpicon {
          font-size: 2rem;
          margin: 0rem 1.5rem;
          color: orangered;
        }

        select {
          background-color: transparent;
          width: 20vw;
          outline: none;
          color: var(--dim);
          cursor: pointer;
          border: none;
          &:focus {
            color: black;
          }
          outline: none;
          font-size: 1.6rem;
          option {
            font-size: 1.6rem;
            cursor: pointer;
          }
        }

        input {
          border: none;
          outline: none;
          font-size: 1.6rem;
        }
      }
    }

    .somain {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      width: 70%;
      flex-direction: column;
      border-right: 2px solid var(--dim);
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
  }
`;
