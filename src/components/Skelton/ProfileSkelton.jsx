import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkelton = () => {
  return (
    <Wrapper>
      <Skeleton circle={true} width={28} height={28} />
      <p style={{ marginLeft: "0.5rem" }}>
        <Skeleton width={62} height={10} />
      </p>
    </Wrapper>
  );
};

export default ProfileSkelton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orangered;
  border-radius: 2rem;
  padding: 0.4rem 1.5rem;
  position: relative;
`;
