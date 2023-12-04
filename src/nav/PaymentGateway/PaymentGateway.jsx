import styled from "styled-components";
import { useRef } from "react";
import { useState } from "react";
import StepperMain from "../../components/StepperMain/StepperMain";
import { FaRegCreditCard } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import Currency from "../../components/Currency/Currency";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { makeOrder } from "../../redux/features/order";
import base_url from "../Base_Url/Base_Url";
import {
  useStripe,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentGateway = () => {
  let dispatch = useDispatch();
  let paybtn = useRef("");
  let stripe = useStripe();
  const [cir, setCir] = useState(true);
  let element = useElements();
  let navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const { shippingDetails, items } = useSelector((state) => state.cart);
  let userDetail = data?.user;
  let order = JSON.parse(sessionStorage.getItem("orderconfirm"));
  let paymentAmount = {
    amount: Math.round(order?.total * 100),
  };
  let orderDetails = {
    itemPrice: order?.subTotal,
    taxPrice: order?.gst,
    shippingPrice: order?.shippingCharges,
    totalPrice: order?.total,
    orderItems: items,
    shippingInfo: {
      address: shippingDetails?.address,
      city: shippingDetails?.city,
      state: shippingDetails?.state,
      country: shippingDetails?.country,
      pinCode: shippingDetails?.pincode,
      phoneNo: shippingDetails?.phone,
    },
    paymentInfo: {},
  };
  let handPayment = async (e) => {
    e.preventDefault();
    setCir(false);
    paybtn.current.disabled = true;
    try {
      const res = await fetch(`${base_url}/paymentgateway`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentAmount),
      });
      const data = await res.json();
      let clientkey = data.client_secret;
      if (!stripe || !element) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientkey, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: userDetail?.name,
            email: userDetail?.email,
            address: {
              line1: shippingDetails?.address,
              city: shippingDetails?.city,
              state: shippingDetails?.state,
              postal_code: shippingDetails?.pincode,
              country: shippingDetails?.country,
            },
          },
        },
      });
      if (result.error) {
        paybtn.current.disabled = false;
        setCir(true);
        toast(result.error.message);
        return result.error;
      } else if (result.paymentIntent.status === "succeeded") {
        orderDetails.paymentInfo.id = result?.paymentIntent.id;
        orderDetails.paymentInfo.status = result.paymentIntent.status;
        dispatch(makeOrder(orderDetails));
        setCir(true);
        navigate("/protected/paymentsucess");
      } else {
        toast("There is some issue while processing payment");
        setCir(true);
        return;
      }
    } catch (error) {
      paybtn.current.disabled = false;
      setCir(true);
      toast(error.response.data.message);
      return error;
    }
  };
  return (
    <Wrapper>
      <StepperMain val={2} />
      <p className="cip">Cart Info</p>
      <form method="post" action="">
        <div className="card-Info">
          <div className="card-details">
            <FaRegCreditCard className="ciicon" />
            <CardNumberElement className="make" />
          </div>
          <div className="card-details">
            <MdDateRange className="ciicon" />
            <CardExpiryElement className="make" />
          </div>
          <div className="card-details">
            <MdVpnKey className="ciicon" />
            <CardCvcElement className="make" />
          </div>
          <button
            className="pgbuts"
            ref={paybtn}
            onClick={handPayment}
            disabled={false}
          >
            Pay - <Currency price={order?.total} />
          </button>
          <span className="cirspan" style={{ display: cir ? "none" : "block" }}>
            <Loading />
          </span>
        </div>
      </form>
    </Wrapper>
  );
};

export default PaymentGateway;

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cip {
    font-size: 2.5rem;
    border-bottom: 4px solid orangered;
    padding: 0.5rem 1rem;
    margin: 2rem 0rem;
  }
  form {
    .card-Info {
      position: relative;

      .cirspan {
        position: absolute;
        bottom: 4rem;
        left: 30%;
      }
      .pgbuts {
        width: 100%;
        margin-top: 1rem;
        font-size: 1.4rem;
        height: 4rem;
        color: #ffffff;
        border: 2px solid transparent;
        cursor: pointer;
        background-color: orangered;
        border-radius: 0.4rem;
        outline: none;
        &:hover {
          color: #ffffff;
          background-color: #8b2a07;
          border: 2px solid #8b2a07;
        }
      }
      .card-details {
        width: 30rem;
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 1rem;
        border: 1px solid black;
        margin: 2rem 0rem;

        .ciicon {
          font-size: 2rem;
        }
        .make {
          width: 23rem;
        }
      }
    }
  }
  @media (min-width: 350px) and (max-width: 768px) {
    min-height: 60vh;
    justify-content: flex-start;
    align-items: center;
  }
`;
