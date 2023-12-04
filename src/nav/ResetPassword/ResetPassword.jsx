import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import base_url from "../Base_Url/Base_Url";

const ResetPassword = () => {
  const { token } = useParams();
  const nav = useNavigate();
  const [loadCir, setLoadCir] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });
  let [errors, setErrors] = useState({});
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const inp2 = useRef();
  const inp3 = useRef();

  const GetInp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  let validationForm = () => {
    const newErrors = {};
    if (!formData.password.trim()) {
      newErrors.password = "New Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "More than 6 characters required";
    }
    if (!formData.cpassword.trim()) {
      newErrors.cpassword = "Confirm Password is required";
    } else if (formData.cpassword.length < 6) {
      newErrors.cpassword = "More than 6 characters required";
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };

  let hideChan = (val) => {
    if (val === "confirmPassword") {
      setHide2(!hide2);
    } else {
      setHide1(!hide1);
    }
  };

  let fMan = (val) => {
    if (val === "inp3") {
      inp3.current.style.top = "-1rem";
    } else {
      inp2.current.style.top = "-1rem";
    }
  };

  let bMan = (val) => {
    if (val === "inp3") {
      if (formData.password.length === 0) {
        inp3.current.style.top = "0.8rem";
      }
    } else {
      if (formData.cpassword.length === 0) {
        inp2.current.style.top = "0.8rem";
      }
    }
  };

  const InpSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch(
          `${base_url}/resetpassword/${token}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (res.status === 200) {
          nav("/login");
          setFormData({
            cpassword: "",
            password: "",
          });
          setLoadCir(true);
          toast("Password Changed Sucessfull");
        } else if (
          data.message === "Password length is too short" ||
          data.message === "Token is invalid or has expired" ||
          data.message === "All fields are required" ||
          data.message === "ConfirmPassword length is too short" ||
          data.message === "Passwords do not match" ||
          data.message === "Internal server error"
        ) {
          toast(data.message);
          setLoadCir(true);
        }
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <Wrapper>
      <div className="mainDiv">
        <BiUserCircle className="user" />

        <div className="inner">
          <form method="post" action="">
            <div className="two">
              <p className="pshow">{errors.password ? errors.password : ""}</p>
              <p className="pp" ref={inp3}>
                Password
              </p>
              <input
                type={hide1 ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="password"
                onFocus={() => fMan("inp3")}
                onBlur={() => bMan("inp3")}
                value={formData.password}
              ></input>
              {hide1 ? (
                <BiSolidShow
                  onClick={() => {
                    hideChan("newPassword");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              ) : (
                <BiSolidHide
                  onClick={() => {
                    hideChan("newPassword");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              )}
            </div>
            <div className="two">
              <p className="pshow">
                {errors.cpassword ? errors.cpassword : ""}
              </p>
              <p className="pp" ref={inp2}>
                Confirm Password
              </p>
              <input
                type={hide2 ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="cpassword"
                onFocus={() => fMan("inp2")}
                onBlur={() => bMan("inp2")}
                value={formData.cpassword}
              ></input>
              {hide2 ? (
                <BiSolidShow
                  onClick={() => {
                    hideChan("confirmPassword");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              ) : (
                <BiSolidHide
                  onClick={() => {
                    hideChan("confirmPassword");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              )}
            </div>
            <div className="three">
              <button className="buts" type="submit" onClick={InpSubmit}>
                Change
              </button>
            </div>
          </form>
        </div>
        {!loadCir && (
          <span className="pl">
            <Loading />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

export default ResetPassword;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .invis {
    position: absolute;
  }

  .mainDiv {
    width: fit-content;
    height: fit-content;
    padding: 3rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 20px 5px gray;
    position: relative;

    .pl {
      position: absolute;
      bottom: 11rem;
      left: 38%;
    }

    .user {
      font-size: 5rem;
      color: var(--maincol);
      margin-bottom: 2rem;
    }

    .inner {
      form {
        .one {
          margin-bottom: 1.5rem;

          .pshow {
            position: absolute;
            top: 3.5rem;
            left: 0;
            color: red;
          }
          position: relative;
          input {
            outline: none;
            width: 30rem;
            height: 3.5rem;
            margin-bottom: 2rem;
            border: none;
            border-bottom: 2px solid gray;
            z-index: 4444;
            background-color: transparent;
          }

          p {
            font-size: 1.4rem;
            color: gray;
            position: absolute;
            top: 0.8rem;
            z-index: -1;
            transition: all 0.2s ease;
          }
        }

        .two {
          .pshow {
            position: absolute;
            top: 3.5rem;
            left: 0;
            color: red;
          }
          position: relative;
          input {
            outline: none;
            width: 30rem;
            height: 3.5rem;
            margin-bottom: 2rem;
            border: none;
            border-bottom: 2px solid gray;
            z-index: 4444;
            background-color: transparent;
          }

          p {
            font-size: 1.4rem;
            color: gray;
            position: absolute;
            top: 0.8rem;
            z-index: -1;
            transition: all 0.2s ease;
          }
        }

        .pfp {
          text-align: end;
          color: var(--maincol);
          font-size: 1.2rem;
          cursor: pointer;
        }

        .three {
          .buts {
            width: 30rem;
            height: 3.5rem;
            outline: none;
            color: #ffffff;
            border-radius: 2rem;
            cursor: pointer;
            border: none;
            background-color: #923cb5;
            background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);
            &:hover {
              box-shadow: 0 4px 6px rgba(118, 117, 117, 0.1);
            }
            margin-top: 2rem;
          }
        }
      }
    }
    .please {
      width: 100%;
      font-size: 1.2rem;
      margin-top: 2rem;

      .please1 {
        color: var(--maincol);
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    .mainDiv {
      padding: 2rem;
      .pl {
        bottom: 10rem;
        left: 36%;
      }
    }
  }
`;
