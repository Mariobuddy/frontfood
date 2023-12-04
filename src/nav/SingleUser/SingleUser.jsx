import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdCategory } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import { fetchAuthSingleAuth } from "../../redux/features/auth";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../Base_Url/Base_Url";

const SingleUser = () => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const [role, setRole] = useState("");
  const { authSingleUser, authSingleUserLoading } = useSelector(
    (state) => state.auth
  );

  const GetInput = (e) => {
    setRole(e.target.value);
  };
  const [loadCir, setLoadCir] = useState(true);
  useEffect(() => {
    dispatch(fetchAuthSingleAuth(id));
  }, [dispatch, id]);
  let handSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadCir(false);
      const res = await fetch(
        `${base_url}/api/products/admin/updaterole/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: role }),
        }
      );

      const data = await res.json();
      if (res.status === 200) {
        setLoadCir(true);
        dispatch(fetchAuthSingleAuth(id));
        toast("Role Updated Sucessfully");
        setRole("");
      } else if (
        data.message === "User not found" ||
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
    <>
      {!authSingleUserLoading ? (
        <Wrapper>
          <div className="sudiv">
            <form action="" method="patch">
              <div className="cpDiv">
                <FaRegUser className="cpicon" />
                <input
                  readOnly
                  placeholder={authSingleUser?.name}
                  name="name"
                />
              </div>
              <div className="cpDiv">
                <MdEmail className="cpicon" />
                <input
                  readOnly
                  placeholder={authSingleUser?.email}
                  name="brand"
                />
              </div>
              <div className="cpDiv">
                <MdCategory className="cpicon" />
                <select onChange={GetInput} value={role} name="category">
                  <option value={""}>Select</option>
                  <option value={"admin"}>Admin</option>
                  <option value={"user"}>User</option>
                </select>
              </div>
              <button
                className="cpcbuts"
                disabled={role === "" ? true : false}
                onClick={handSubmit}
              >
                UPDATE
              </button>
              <span
                style={{ display: loadCir ? "none" : "block" }}
                className="spacp"
              >
                <Loading />
              </span>
            </form>
          </div>
        </Wrapper>
      ) : (
        <div
          className="mos"
          style={{
            position: "absolute",
            top: "35%",
            left: "47%",
            minHeight: "80vh",
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default SingleUser;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 10%;
  .sudiv {
    form {
      border: 2px solid var(--dim);
      position: relative;
      width: 25vw;
      height: 50vh;
      display: flex;
      justify-content: space-between;
      padding: 2.5rem 0rem;
      align-items: center;
      flex-direction: column;

      .cpcbuts {
        width: 20vw;
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
          width: 100%;
        }
      }
    }
  }
  @media (min-width: 350px) and (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-top: 20%;
    .sudiv {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      form {
        border: 2px solid var(--dim);
        position: relative;
        width: 80%;
        height: 50vh;
        display: flex;
        justify-content: space-between;
        padding: 2.5rem 0rem;
        align-items: center;
        flex-direction: column;

        .cpcbuts {
          width: 80%;
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
          width: 80%;
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
            width: 80%;
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
            width: 100%;
          }
        }
      }
    }
  }
`;
