import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";

const ChangePassword = () => {
  const nav = useNavigate();
  const [loadCir, setLoadCir] = useState(true);
  const [formData, setFormData] = useState({
    currentpassword: "",
    newpassword: "",
    cnewpassword: "",
  });
  let [errors, setErrors] = useState({});
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const inp1 = useRef();
  const inp2 = useRef();
  const inp3 = useRef();

  const GetInp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  let validationForm = () => {
    const newErrors = {};
    if (!formData.currentpassword.trim()) {
      newErrors.currentpassword = "Password is required";
    } else if (formData.currentpassword.length < 6) {
      newErrors.currentpassword = "More than 6 characters required";
    }
    if (!formData.newpassword.trim()) {
      newErrors.newpassword = "New Password is required";
    } else if (formData.newpassword.length < 6) {
      newErrors.newpassword = "More than 6 characters required";
    }
    if (!formData.cnewpassword.trim()) {
      newErrors.cnewpassword = "Confirm Password is required";
    } else if (formData.cnewpassword.length < 6) {
      newErrors.cnewpassword = "More than 6 characters required";
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };

  let hideChan = (val) => {
    if (val === "password") {
      setHide(!hide);
    } else if (val === "confirmPassword") {
      setHide2(!hide2);
    } else {
      setHide1(!hide1);
    }
  };

  let fMan = (val) => {
    if (val === "inp1") {
      inp1.current.style.top = "-1rem";
    } else if (val === "inp3") {
      inp3.current.style.top = "-1rem";
    } else {
      inp2.current.style.top = "-1rem";
    }
  };

  let bMan = (val) => {
    if (val === "inp1") {
      if (formData.currentpassword.length === 0) {
        inp1.current.style.top = "0.8rem";
      }
    } else if (val === "inp3") {
      if (formData.newpassword.length === 0) {
        inp3.current.style.top = "0.8rem";
      }
    } else {
      if (formData.cnewpassword.length === 0) {
        inp2.current.style.top = "0.8rem";
      }
    }
  };

  const InpSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch("http://localhost:4000/updatepassword", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.status === 200) {
          nav("/protected/profile");
          setFormData({
            currentpassword: "",
            cnewpassword: "",
            newpassword: "",
          });
          setLoadCir(true);
          toast("Password Changed SucessFull");
        } else if (
          data.message === "Password is incorrect" ||
          data.message === "Password length is too short" ||
          data.message === "ConfirmPassword length is too short" ||
          data.message === "Passwords do not match" ||
          data.message === "All fields are required" ||
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
              <p className="pshow">
                {errors.currentpassword ? errors.currentpassword : ""}
              </p>
              <p className="pp" ref={inp1}>
                Old Password
              </p>
              <input
                type={hide ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="currentpassword"
                onFocus={() => fMan("inp1")}
                onBlur={() => bMan("inp1")}
                value={formData.currentpassword}
              ></input>
              {hide ? (
                <BiSolidShow
                  onClick={() => {
                    hideChan("password");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              ) : (
                <BiSolidHide
                  onClick={() => {
                    hideChan("password");
                  }}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              )}
            </div>
            <div className="two">
              <p className="pshow">
                {errors.newpassword ? errors.newpassword : ""}
              </p>
              <p className="pp" ref={inp3}>
                New Password
              </p>
              <input
                type={hide1 ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="newpassword"
                onFocus={() => fMan("inp3")}
                onBlur={() => bMan("inp3")}
                value={formData.newpassword}
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
                {errors.cnewpassword ? errors.cnewpassword : ""}
              </p>
              <p className="pp" ref={inp2}>
                Confirm Password
              </p>
              <input
                type={hide2 ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="cnewpassword"
                onFocus={() => fMan("inp2")}
                onBlur={() => bMan("inp2")}
                value={formData.cnewpassword}
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

export default ChangePassword;

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
