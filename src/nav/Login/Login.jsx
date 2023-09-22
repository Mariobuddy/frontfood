import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  let [errors, setErrors] = useState({});
  const [hide, setHide] = useState(false);
  const inp1 = useRef();
  const inp2 = useRef();

  const GetInp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  let validationForm = () => {
    const newErrors = {};
    // Email validation (required and format)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "More than 6 characters required";
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };

  let hideChan = () => {
    setHide(!hide);
  };

  let fMan = (val) => {
    if (val === "inp1") {
      inp1.current.style.top = "-1rem";
    } else {
      inp2.current.style.top = "-1rem";
    }
  };

  let bMan = (val) => {
    if (val === "inp1") {
      if (formData.email.length === 0) {
        inp1.current.style.top = "0.8rem";
      }
    } else {
      if (formData.password.length === 0) {
        inp2.current.style.top = "0.8rem";
      }
    }
  };

  const InpSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      try {
        const res = await fetch("https://food-backend-auth.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      
        const data = await res.json();
        if (res.status === 200) {
          localStorage.setItem("authUser",data[1]);
          const userJSON = JSON.stringify(data[0]);
          localStorage.setItem("userDetails",userJSON);
          nav("/");
          setFormData({
            password: "",
            email: "",
          });
        } else if (data.error === "Invalid email") {
          errors.email = "Invalid email";
          setErrors({ ...errors });
        } else if (data.error === "Password does not match") {
          errors.password = "Password does not match";
          setErrors({ ...errors });
        }
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    } 
  };

  return (
    <Wrapper>
      <div className="mainDiv">
        <BiUserCircle className="user" />

        <div className="inner">
          <form method="post" action="">
            <div className="one">
              <p className="pshow">{errors.email ? errors.email : ""}</p>
              <p className="pe" ref={inp1}>
                Your email
              </p>
              <input
                type="text"
                name="email"
                onChange={GetInp}
                autoComplete="nope"
                onFocus={() => fMan("inp1")}
                onBlur={() => bMan("inp1")}
              ></input>
            </div>
            <div className="two">
              <p className="pshow">{errors.password ? errors.password : ""}</p>
              <p className="pp" ref={inp2}>
                Your password
              </p>
              <input
                type={hide ? "text" : "password"}
                onChange={GetInp}
                autoComplete="nope"
                name="password"
                onFocus={() => fMan("inp2")}
                onBlur={() => bMan("inp2")}
                value={formData.password}
              ></input>
              {hide ? (
                <BiSolidShow
                  onClick={hideChan}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              ) : (
                <BiSolidHide
                  onClick={hideChan}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              )}
            </div>
            <p className="pfp">Forgot password?</p>
            <div className="three">
              <button className="buts" type="submit" onClick={InpSubmit}>
                SIGN IN
              </button>
            </div>
          </form>
        </div>

        <p className="please">
          Don't have an account?{" "}
          <NavLink className={"please1"} to={"/register"}>
            Sign up
          </NavLink>
        </p>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .mainDiv {
    width: fit-content;
    height: fit-content;
    padding: 3rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 20px 5px gray;

    .user {
      font-size: 5rem;
      color: orangered;
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
          color: orangered;
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
            background: linear-gradient(to right, #f5714d, #ff3700);
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
        color: orangered;
      }
    }
  }

  @media (min-width: 370px) and (max-width: 768px) {
    .mainDiv {
      padding: 2rem;
    }
  }
`;
