import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import base_url from "../Base_Url/Base_Url";

const ForgotPassword = () => {
  const [formData, setFormData] = useState("");
  let nav = useNavigate();
  let [errors, setErrors] = useState("");
  const [loadCir, setLoadCir] = useState(true);
  const inp1 = useRef();
  const GetInp = (e) => {
    let value = e.target.value;
    setFormData(value);
  };

  let validationForm = () => {
    let newErrors = "";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.trim()) {
      newErrors = "Email is required";
    } else if (!emailRegex.test(formData)) {
      newErrors = "Invalid email format";
    }
    errors = newErrors;
    setErrors(errors);
    return errors ? false : true;
  };

  const InpSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch(`${base_url}/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: formData }),
        });

        const data = await res.json();
        if (res.status === 200) {
          nav("/login");
          setFormData("");
          setLoadCir(true);
          toast("Reset Link Send");
        } else if (
          data.message === "Enter your email" ||
          data.message === "Email not found" ||
          data.message ===
            "There was an error sending password request email" ||
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

  let fMan = () => {
    inp1.current.style.top = "-1rem";
  };

  let bMan = () => {
    if (formData.length === 0) {
      inp1.current.style.top = "0.8rem";
    }
  };
  return (
    <Wrapper>
      <div className="mainDiv">
        <BiUserCircle className="user" />

        <div className="inner">
          <form method="post" action="">
            <div className="one">
              <p className="pshow">{errors ? errors : ""}</p>
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
            <div className="three">
              <button className="buts" type="submit" onClick={InpSubmit}>
                Send
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

export default ForgotPassword;

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
      bottom: 7rem;
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
          height: fit-content;
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
