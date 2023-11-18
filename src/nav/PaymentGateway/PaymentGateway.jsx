import styled from "styled-components";
import StepperMain from "../../components/StepperMain/StepperMain";
import { FaRegCreditCard } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Currency from "../../components/Currency/Currency";
import {
  // useStripe,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

const PaymentGateway = () => {
  let key =
    "pk_test_51ODOcnSHR2EwXYgc9SB5hLvyvO7T54NkOuhInWvYxu70CI2cSny7cU6zJdZyD8GljRMSJMR12yD3UWVPY4PC6h3V00G2DdZs98";
    let stripeKey=loadStripe(key);
  let order = JSON.parse(sessionStorage.getItem("orderconfirm"));
  return (
    <>
      {key && (
        <Elements stripe={stripeKey}>
          <Wrapper>
            <StepperMain val={2} />
            <p className="cip">Cart Info</p>
            <form method="post" action="">
              <div className="card-Info">
                <div className="card-details">
                  <FaRegCreditCard className="ciicon" />
                  <CardNumberElement />
                </div>
                <div className="card-details">
                  <MdDateRange className="ciicon" />
                  <CardExpiryElement />
                </div>
                <div className="card-details">
                  <MdVpnKey className="ciicon" />
                  <CardCvcElement />
                </div>
                <button className="pgbuts">
                  Pay - <Currency price={order?.total} />
                </button>
              </div>
            </form>
          </Wrapper>
        </Elements>
      )}
    </>
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
      }
    }
  }
`;
