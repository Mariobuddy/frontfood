import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const Profile2 = () => {
  return (
    <Wrapper>
      <div className="main-div">
        <div className="l-div">
          <Skeleton circle={true} width={250} height={250} />
          <button>Edit Profile</button>
        </div>
        <div className="r-div">
          <div className="f">
            <p className="fone">Full Name -</p>
            <p className="ftwo">
              <Skeleton width={100} height={30} />
            </p>
          </div>
          <div className="f">
            <p className="fone">Email -</p>
            <Skeleton width={150} height={30} />
          </div>
          <div className="f">
            <p className="fone">Joined On -</p>
            <Skeleton width={100} height={30} />
          </div>
          <div className="main-but">
            <button className="obut">My Orders</button>
            <button className="obut">Change Password</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile2;

const Wrapper = styled.div`
  padding: 0rem;

  p {
    font-size: 2.5rem;
  }

  .main-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .l-div {
      display: flex;
      height: 50vh;
      width: 40vw;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      img {
        border-radius: 50%;
        width: 25rem;
        height: 25rem;
      }

      button {
        background-color: orangered;
        color: #ffffff;
        border: none;
        outline: none;
        padding: 1rem;
        width: 20rem;
        cursor: pointer;
        border: 2px solid transparent;
        &:hover {
          background-color: #ffffff;
          color: orangered;
          border: 2px solid orangered;
        }
      }
    }

    .r-div {
      width: 40vw;
      height: 60vh;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      .f {
        .fone {
          font-size: 2rem;
        }

        .ftwo {
          font-size: 1.6rem;
          margin-top: 0.5rem;
          color: orangered;
        }
      }
      .main-but {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        .obut {
          width: 50%;
          color: #ffffff;
          background-color: var(--maincol);
          border: none;
          outline: none;
          padding: 1rem;
          margin-bottom: 2rem;
          cursor: pointer;
          border: 2px solid transparent;
          &:hover {
            background-color: #ffffff;
            color: var(--maincol);
            border: 2px solid var(--maincol);
          }
        }
      }
    }
  }
`;
