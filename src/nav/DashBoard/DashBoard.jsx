import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Outlet,useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { CiDiscount1 } from "react-icons/ci";
import { TbUserSquareRounded } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { TbSquareKey } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import LazyLoading from "../../components/Lazy/LazyLoading";

const DashBoard = () => {
  let location=useLocation();
  const { data } = useSelector((state) => state.auth);
  const [currentSelect, setCurrentSelect] = useState(location.pathname);
  const [size, setSize] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let resizeRes = () => {
      if (window.innerWidth <= 768) {
        setSize(true);
      } else {
        setSize(false);
      }
    };
    window.addEventListener("resize", resizeRes);
    return () => {
      window.removeEventListener("resize", resizeRes);
    };
  }, []);

  let Toggle = () => {
    setShow(!show);
  };

  const handnav = (val) => {
    setCurrentSelect(val);
    setShow(false);
  };
  return (
    <Wrapper>
      <div
        className="left"
        style={{
          display: show || (window.innerWidth > 768 && !size) ? "flex" : "none",
        }}
      >
        <div className="link">
          <p>
            <TbSettings2 className="setting" />
            Dashboard
          </p>
          <NavLink
            className={location.pathname==="/dashboard" || location.pathname==="/dashboard/dashdashboard"?"navOne active":"navOne"}
            to={"dashdashboard"}
            onClick={() => handnav("/dashboard/dashdashboard")}
          >
            <div className="in">
              <TbSquareKey className="icon" />
              Dashboard
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashdashboard"
                    ? "none"
                    : "block",
              }}
            />
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"dashcreateproduct"}
            onClick={() => handnav("/dashboard/dashcreateproduct")}
          >
            <div className="in">
              <TbSquareKey className="icon" />
              Create Product
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashcreateproduct"
                    ? "none"
                    : "block",
              }}
            />
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"dashviewproduct"}
            onClick={() => handnav("/dashboard/dashviewproduct")}
          >
            <div className="in">
              <TbSquareKey className="icon" />
              View Product
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashviewproduct"
                    ? "none"
                    : "block",
              }}
            />
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"dashorders"}
            onClick={() => handnav("/dashboard/dashorders")}
          >
            <div className="in">
              <TbUserSquareRounded className="icon" /> Orders{" "}
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashorders" ? "none" : "block",
              }}
            />
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"dashusers"}
            onClick={() => handnav("/dashboard/dashusers")}
          >
            <div className="in">
              <FaWallet className="icon" /> Users{" "}
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashusers" ? "none" : "block",
              }}
            />
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"dashreviews"}
            onClick={() => handnav("/dashboard/dashreviews")}
          >
            <div className="in">
              <CiDiscount1 className="icon" /> Reviews{" "}
            </div>
            <MdKeyboardArrowRight
              className="arrow"
              style={{
                display:
                  currentSelect === "/dashboard/dashreviews" ? "none" : "block",
              }}
            />
          </NavLink>
        </div>
        <div className="profile">
          <div className="inner-profile">
            <LazyLoading src={data?.user?.image?.url} />
            <div className="name-div">
              <p className="name">
                {data?.user?.name} {data?.user?.surname}
              </p>
              <p className="role">Admin</p>
            </div>
          </div>
          <MdKeyboardArrowDown className="down-arrow" />
        </div>
      </div>
      <div className="mobile">
        {show ? (
          <AiOutlineClose className="logo1" onClick={Toggle} />
        ) : (
          <GiHamburgerMenu className="logo1" onClick={Toggle} />
        )}
      </div>
      <div className="right">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default DashBoard;

const Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;

  .mobile {
    display: none;
  }

  .active {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.4rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    color: #ffffff !important;
  }

  .back {
    display: none;
  }

  .right {
    width: 84vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 16vw;
    padding-top: 5.5rem;
  }

  .left {
    background-color: #4a0c63;
    padding: 2rem;
    width: 16vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40000;

    .link {
      display: flex;
      flex-direction: column;

      p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #ffffff;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        font-weight: bold;
        .setting {
          margin-right: 0.5rem;
        }
      }

      .navOne {
        color: #b7b2b2;
        font-size: 1.4rem;
        margin: 1rem 0rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 0.4rem;

        .in {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            font-size: 1.6rem;
            margin-right: 0.5rem;
          }
        }

        .arrow {
          color: #ffffff;
          font-size: 1.6rem;
        }
      }
    }

    .profile {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.6rem 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.4rem;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      margin-left: -1.3rem;
      width: 15vw;

      .down-arrow {
        font-size: 2.5rem;
        color: #b7b2b2;
      }

      .inner-profile {
        display: flex;
        color: #b7b2b2;
        justify-content: center;
        align-items: center;

        .name-div {
          margin-left: 0.8rem;
          p {
            font-size: 1rem;
            &:nth-child(1) {
              color: #ffffff;
            }
          }
        }

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
        }
      }
    }
  }

  @media (min-width: 360px) and (max-width: 768px) {
    .mobile {
      display: inline-flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      margin-left: 0rem;
      position: fixed;
      top: -36rem;
      z-index: 99999999;
      right: 1rem;

      .logo1 {
        cursor: pointer;
        font-size: 3rem;
        color: orangered;
      }
    }
    .right {
      width: 100vw;
      height: 100%;
      flex-direction: column;
    }

    .left {
      background-color: #03002e;
      padding: 2rem;
      width: 100%;
      height: fit-content;
      display: none;

      .profile {
        margin-left: 0rem;
        width: 100%;
        margin-top: 10rem;
      }
    }
  }
`;
