import React, { useState, useEffect, useCallback } from "react";
import { styled, keyframes } from "styled-components";
import Mario from "../../assests/mario.png";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [currentScroll, setCurrentScroll] = useState("top");
  const [lastScroll, setLastScroll] = useState(0);
  const [down, setDown] = useState(false);

  let downProfile = () => {
    setDown(!down);
  };

  let Toggle = () => {
    setShow(!show);
  };

  let remLocal=()=>{
    localStorage.clear();
  }

  const userJSON = localStorage.getItem("userDetails");
  const userLogData = JSON.parse(userJSON);

  const scrollEffect = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScroll && !show) {
        setCurrentScroll("hide");
      } else {
        setCurrentScroll("show");
      }
    } else {
      setCurrentScroll("top");
    }
    setLastScroll(window.scrollY);
  }, [lastScroll, show]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEffect);

    return () => {
      window.removeEventListener("scroll", scrollEffect);
    };
  }, [scrollEffect]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Wrapper className={currentScroll}>
      <div className="left">
        <img alt="Mario" src={Mario} onClick={() => {}} />
      </div>
      <div className="right">
        <ul className={show ? "visible anime" : ""}>
          <li>
            <NavLink
              onClick={() => {
                setShow(false);
              }}
              className={"navL"}
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setShow(false);
              }}
              className={"navL"}
              to={"menu"}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setShow(false);
              }}
              className={"navL"}
              to={"about"}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setShow(false);
              }}
              className={"navL"}
              to={"contact"}
            >
              Contact
            </NavLink>
          </li>
          <li>
            {userLogData ? (
              <div className="disLog" onClick={downProfile}>
                <img alt="Rohit" src={userLogData?.image}></img>
                <p>
                  {userLogData?.name} {userLogData?.surname}
                </p>
                <div
                  className="innerProfile"
                  style={{ display: down ? "block" : "none" }}
                >
                  <div className="innerIn">
                    <NavLink className={"proNav"} to={"dashboard"}>
                      Profile
                    </NavLink>
                    <NavLink className={"proNav"} onClick={remLocal} to={"login"}>
                      Log Out
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                style={{ marginRight: "4rem" }}
                onClick={() => {
                  setShow(false);
                }}
                className={"navL"}
                to={"login"}
              >
                <BiSolidUser style={{ fontSize: "2.5rem" }} />
                <span className="sign">Sign In</span>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              onClick={() => {
                setShow(false);
              }}
              className={"navL"}
              to={"cart"}
            >
              <FaShoppingCart />
              <span className="no">0</span>
            </NavLink>
          </li>
        </ul>
        <div className="mobile">
          {show ? (
            <AiOutlineClose className="logo1" onClick={Toggle} />
          ) : (
            <GiHamburgerMenu className="logo1" onClick={Toggle} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;

const ani = keyframes`
0%{
  top: -20rem;
}
100%{
  top: 0rem;
}
`;

const Wrapper = styled.div`
  height: 5.5rem;
  padding: 0rem 2rem;
  width: 100%;
  z-index: 99999;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--wcol);
  top: 0;
  left: 0;

  .anime {
    animation: ${ani} 0.5s ease;
  }

  .active {
    color: orangered !important;
  }

  &.top {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.5);
  }

  &.show {
    background-color: #020110;
  }

  &.hide {
    transform: translateY(-6rem);
  }
  .visible {
    display: block !important;
  }

  .left {
    img {
      width: 6rem;
      height: 6rem;
      margin-top: 1.4rem;
      cursor: pointer;
    }
  }

  .right {
    width: fit-content;
    .mobile {
      display: none;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        list-style-type: none;
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in;
        margin: 0rem 2rem;

        .disLog {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: orangered;
          border-radius: 2rem;
          padding: 0.4rem 1rem;
          position: relative;

          .innerProfile {
            position: absolute;
            box-shadow: 2px 2px 10px 2px gray;
            background-color: #ffffff;
            height: 5rem;
            width: 12rem;
            border-radius: 0.5rem;
            top: 4rem;

            .innerIn {
              width: inherit;
              height: inherit;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;

              .proNav {
                font-size: 1.2rem;
                white-space: nowrap;
                color: black;

                &:hover{
                  color: orangered;
                }
              }
            }
          }
          img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
            margin-right: 0.5rem;
          }
          p {
            color: #ffffff;
            font-size: 1.2rem;
          }
        }

        .navL {
          color: black;
          position: relative;

          .sign {
            white-space: nowrap;
            font-size: 1.4rem;
            font-weight: 500;
            position: absolute;
            top: 0.3rem;
            left: 3rem;
          }
          .no {
            background-color: orangered;
            border-radius: 50%;
            color: #ffffff;
            font-size: 1rem;
            position: absolute;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -0.5rem;
            left: 1rem;
          }
          &:hover {
            color: orangered;
          }
        }

        .logo {
          font-size: 2rem;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 370px) and (max-width: 768px) {
    justify-content: space-between;
    padding: 0rem 1.5rem;

    .left {
      img {
      }
    }

    .right {
      height: 100%;
      .downSearch {
        input {
          padding: 0rem 2rem;
        }

        .downLogo {
          right: 2rem;
        }
      }
      .mobile {
        display: inline-flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        margin-left: 3rem;

        .logo1 {
          cursor: pointer;
          font-size: 2.5rem;
        }
      }
      ul {
        display: none;
        position: absolute;
        background-color: #ffffff;
        box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.5);
        padding-top: 5.5rem;
        height: fit-content;
        left: 0;
        top: 0;
        width: 100%;
        z-index: -5;
        padding-left: 40%;
        li {
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 1.8rem;
        }
      }
    }
  }
`;
