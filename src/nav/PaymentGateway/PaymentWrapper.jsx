import React, { useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentGateway from "./PaymentGateway";

const PaymentWrapper = () => {
  let key =
    "pk_test_51ODOcnSHR2EwXYgc9SB5hLvyvO7T54NkOuhInWvYxu70CI2cSny7cU6zJdZyD8GljRMSJMR12yD3UWVPY4PC6h3V00G2DdZs98";
  let stripeKey = useMemo(() => {
    return loadStripe(key);
  }, [key]);
  return (
    <>
      {key && (
        <Elements stripe={stripeKey}>
          <PaymentGateway />
        </Elements>
      )}
    </>
  );
};

export default PaymentWrapper;
