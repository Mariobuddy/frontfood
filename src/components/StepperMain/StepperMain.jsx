import React from "react";
import styled from "styled-components";
import Stepper from "react-stepper-horizontal";

const StepperMain = ({ val }) => {
  return (
    <Wrapper>
      <Stepper
        steps={[
          { title: "Shipping Details" },
          { title: "Confirm Order" },
          { title: "Payment" },
        ]}
        activeStep={val}
        activeTitleColor="orangered"
        activeColor="orangered"
        completeColor="green"
        completeTitleColor="green"
        circleFontSize={12}
        size={28}
        titleFontSize={14}
        circleTop={4}
      />
    </Wrapper>
  );
};

export default StepperMain;

const Wrapper = styled.div`
  width: 100%;

  .istep {
    font-size: 2rem;
    color: orangered;
  }

  .pstep {
    font-size: 1.2rem;
  }
`;
