import React from "react";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <div className="div1">
        <p>
          Ready to get started?
          <br />
          Talk to us today
        </p>
        {/* <Button className='buts'>Get Started</Button> */}
        <Button>Get Started</Button>
      </div>

      <div className="div2">
        <div className="infomain">
          <div className="info1">
            <p className="rohitp">Rohit Bhatt</p>
            <p className="rohitp">
              Rohit Bhatt is a <span>Full Stack Web Developer</span>.He started
              his career in online fashion store with his partner Sagar Kushwaha
            </p>
          </div>
          <div className="info2">
            <p className="subone">Subscribe to get important update</p>
            <input type={"text"} placeholder="YOUR E-MAIL" />
            <Button>SUBSCRIBE</Button>
          </div>
          <div className="info3">
            <p>Follow Us</p>

            <div className="social">
              <a href="www">
                <div className="s1">
                  <FaDiscord className="dis" />
                </div>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100006754845267">
                {" "}
                <div className="s1">
                  <FaFacebook className="fac" />
                </div>
              </a>
              <a href="https://www.instagram.com/https_rohit18/">
                {" "}
                <div className="s1">
                  <FaInstagram className="insta" />
                </div>
              </a>
            </div>
          </div>
          <div className="info4">
            <p className="callone">Call Us</p>
            <p className="callone">+91 7057651379</p>
          </div>
        </div>
      </div>

      <div className="div3">
        <hr></hr>
        <div className="down">
          <p className="tdown">@{new Date().getFullYear()} Rohit Bhatt.All Rights Reserved</p>
          <p className="tdown1">
            PRIVACY POLICY <br /> TERMS & CONDITIONS
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Button = styled.button`
  background-color: orangered;
  padding: 1rem 1.5rem;
  outline: none;
  color: #ffffff;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  &:hover {
    border-radius: 1rem;
  }

  @media (min-width: 350px) and (max-width: 768px) {
    padding: 0.8rem 1rem;
    white-space: nowrap;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #ffffff;
  bottom: 0;

  .div3 {
    background-color: #923cb5;
    background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);
    height: 6vh;
    width: 100%;

    .down {
      margin-top: 0.5rem;
      font-size: 1.2rem;
      display: flex;
      justify-content: space-around;
      color: #ffffff;
      .tdown{
        font-size: 1.3rem;
      }
      .tdown1{
        font-size: 1.1rem;
      }
    }

    hr {
      color: #ffffff;
    }
  }

  .div1 {
    height: 12vh;
    width: 60vw;
    border-radius: 0.5rem;
    position: relative;
    top: 4.5rem;
    background-color: #f0efef;
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
    align-items: center;

    p {
      font-size: 1.3rem;
      letter-spacing: 0.5px;
      font-weight: 500;
      color: #2e2d2d;
    }

    .buts {
      padding: 0.8rem 1.2rem;
      font-weight: 700;
    }
  }

  .div2 {
    height: 32vh;
    width: inherit;
    background-color: #923cb5;
    background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);
    padding: 8rem 34rem 0rem 34rem;
    color: #ffffff;
    display: flex;
    justify-content: center;

    .infomain {
      display: flex;
      margin-left: 5rem;

      .info1 {
        width: 15vw;
        height: 20vh;
        padding-right: 2rem;
        font-size: 1.2rem;
        margin-left: 8rem;

        .rohitp {
          margin-bottom: 1.5rem;
          font-size: 1.3rem;

          span {
            color: #ff3700;
          }
        }
      }

      .info2 {
        width: 15vw;
        height: 20vh;
        padding-right: 2rem;
        font-size: 1.2rem;
        margin-left: 4rem;

        .subone{
          font-size: 1.3rem;
        }

        input {
          outline: none;
          width: 16rem;
          height: 3.8rem;
          padding-left: 1rem;
          margin-bottom: 1rem;
          margin-top: 1rem;

          &::placeholder {
            color: #373636;
            font-size: 1.2rem;
            outline: none;
          }
        }

        .buts2 {
          padding: 0.8rem 1.2rem;
        }
      }

      .info3 {
        width: 15vw;
        height: 20vh;
        padding-right: 2rem;
        font-size: 1.2rem;
        margin-left: 4rem;

        p {
          font-size: 1.2rem;
        }

        .social {
          display: flex;
          margin-top: 1rem;

          .s1 {
            background-color: #ffffff;
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: 2px solid #ffffff;
            cursor: pointer;

            .dis {
              color: #050559;
              font-size: 1.4rem;
            }

            .fac {
              color: #1414dee1;
              font-size: 1.4rem;
            }

            .insta {
              color: #e71f9b;
              font-size: 1.4rem;
            }
          }
        }
      }

      .info4 {
        width: 15vw;
        height: 20vh;
        padding-right: 2rem;
        font-size: 1.2rem;

        .callone {
          font-size: 1.3rem;
          &:nth-child(2) {
            margin-top: 1.5rem;
          }
        }
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    width: 100vw;
    height: 38vh;
    display: flex;
    flex-direction: center;
    align-items: center;
    position: relative;
    bottom: 0;
    left: 0;

    .div3 {
      height: 6vh;
      width: 100vw;

      .down {
        margin-top: 0.5rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-around;
        color: #ffffff;
      }

      hr {
        color: #ffffff;
      }
    }

    .div1 {
      height: 8vh;
      width: 80vw;
      border-radius: 0.5rem;
      position: relative;
      top: 3.5rem;
      background-color: #f0efef;
      display: flex;
      align-items: center;
      padding: 0 1.6rem;

      p {
        font-size: 1rem;
        font-weight: 500;
        color: #2e2d2d;
        width: 30rem;
      }

      .buts {
        padding: 0.6rem 1.2rem;
        font-weight: 700;
        font-size: 1rem;
        white-space: nowrap;
      }
    }

    .div2 {
      height: 24vh;
      width: inherit;
      padding: 5rem 4rem 0rem 4rem;
      color: #ffffff;
      display: flex;
      justify-content: center;

      .infomain {
        display: flex;
        margin-left: 0rem;

        .info1 {
          width: 28vw;
          height: 20vh;
          padding-right: 0rem;
          font-size: 1rem;
          margin-left: 0.1rem;

          p {
            margin-bottom: 1.5rem;
          }
        }

        .info2 {
          width: 25vw;
          height: 20vh;
          padding-right: 0rem;
          font-size: 1rem;
          margin-left: 0.8rem;

          input {
            outline: none;
            width: 8rem;
            height: 2.4rem;
            padding-left: 0.8rem;
            margin-bottom: 1rem;
            padding-bottom: 0.3rem;
            margin-top: 1rem;
            font-size: 0.8rem;

            &::placeholder {
              color: #373636;
              font-size: 0.8rem;
              outline: none;
            }
          }

          .buts2 {
            padding: 0.6rem 1.4rem;
            font-size: 0.8rem;
          }
        }

        .info3 {
          width: 20vw;
          height: 20vh;
          padding-right: 0rem;
          font-size: 1rem;
          margin-left: 1rem;

          p {
            font-size: 1rem;
          }

          .social {
            display: flex;
            margin-top: 1rem;

            .s1 {
              background-color: #ffffff;
              margin-right: 0.6rem;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              border: 2px solid #ffffff;

              .dis {
                color: #050559;
                font-size: 1rem;
              }

              .fac {
                color: #1414dee1;
                font-size: 1rem;
              }

              .insta {
                color: #e71f9b;
                font-size: 1rem;
              }
            }
          }
        }

        .info4 {
          width: 15vw;
          height: 20vh;
          padding-right: 2rem;
          font-size: 1rem;
          margin-left: 1rem;

          p {
            &:nth-child(2) {
              margin-top: 1.5rem;
            }
          }
        }
      }
    }
  }
`;
