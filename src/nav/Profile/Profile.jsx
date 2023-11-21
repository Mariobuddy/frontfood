import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import LazyLoading from "../../components/Lazy/LazyLoading";
import Profile2 from "../../components/Skelton/Profile2";

const Profile = () => {
  let navigate = useNavigate();
  const { data, loading, isAuth } = useSelector((state) => state.auth);
  const date = dayjs(data?.user?.createdAt);
  return (
    <Wrapper>
      <p>My Profile</p>
      {isAuth && (
        <>
          {loading === null ? (
            <div className="main-div">
              <div className="l-div">
                <LazyLoading alt="img" src={data?.user?.image?.url} />
                <button onClick={() => navigate("/editprofile")}>
                  Edit Profile
                </button>
              </div>
              <div className="r-div">
                <div className="f">
                  <p className="fone">Full Name -</p>
                  <p className="ftwo">
                    {data?.user?.name} {data?.user?.surname}
                  </p>
                </div>
                <div className="f">
                  <p className="fone">Email -</p>
                  <p className="ftwo">{data?.user?.email}</p>
                </div>
                <div className="f">
                  <p className="fone">Joined On -</p>
                  <p className="ftwo">{date.format("YYYY-MM-DD")}</p>
                </div>
                <div className="main-but">
                  <button className="obut" onClick={() => navigate("/myorderfront")}>My Orders</button>
                  <button
                    className="obut"
                    onClick={() => navigate("/changepassword")}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Profile2 />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  padding: 5rem;

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
