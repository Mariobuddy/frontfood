import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Contact() {
  let [gdata, sdata] = useState([
    { name: "USERNAME", email: "USEREMAIL", message: "" },
  ]);

  const [loading, setLoading] = useState(true);

  let Chan = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    sdata({ ...gdata, [name]: value });
  };
  let Sendit = async (e) => {
    e.preventDefault();

    try {
      let data1 = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(gdata),
      });

      let maindata = await data1.json();

      if (maindata.con === 200) {
        window.alert("Message sent sucessfully");
        sdata({ ...gdata, message: "" });
      } else if (maindata.con === 400) {
      }
    } catch (error) {
    }
  };
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Wrap>
      <div className="headof">
        <h1 className="cptake">Feel Free To Contact Us</h1>
      </div>
    

      <div className="ifone">
      {
        loading && <Skeleton width={1800} height={412} className="skelcon"/>
      }
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.269906749114!2d72.82611225121593!3d19.443926486813474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a90b498b2c5b%3A0xe1aa47850228c757!2sMahakali%20Temple!5e0!3m2!1sen!2sin!4v1670830333087!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: "none" }}
          allowFullScreen=""
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
          onLoad={handleLoad}
          onLoadStart={handleLoadStart}
        ></iframe>
      </div>

      <div className="formmain">
        <div className="formchild">
          <form method="POST" className="formtake">
            <input
              type="text"
              onChange={Chan}
              value={(gdata && gdata.name) || ""}
              className="sameinp"
              placeholder="USERNAME"
              name="name"
              required
              autoComplete="off"
            ></input>
            <input
              type="email"
              onChange={Chan}
              value={(gdata && gdata.email) || ""}
              className="sameinp"
              placeholder="Email"
              name="email"
              required
              autoComplete="off"
            ></input>
            <textarea
              onChange={Chan}
              value={(gdata && gdata.message) || ""}
              name="message"
              className="sameinp"
              placeholder="How Can We Help You"
              rows="5"
              cols="5"
              required
              autoComplete="off"
            ></textarea>
            <button
              className="but"
              style={{ cursor: "pointer", zIndex: "6666" }}
              type="submit"
              onClick={Sendit}
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </Wrap>
  );
}

export default Contact;

const Wrap = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 4rem;

  .headof {
    width: inherit;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0rem;

    .cptake {
      font-size: 2.5rem;
      color: orangered;
    }
  }

  .ifone {
    width: 100%;
    height: 100%;
    position: relative;

    .skelcon{
     position: absolute;
     top: 0;
     left: 0;
    }
  }

  .formmain {
    width: inherit;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .formchild {
      width: 30vw;
      height: 35vh;
      display: flex;
      flex-direction: column;

      .formtake {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .sameinp {
          width: 350px;
          padding: 1rem;
          margin-top: 2rem;
          outline: none;
          color: gray;
        }

        .but {
          width: 15rem;
          margin-top: 1rem;
          font-size: 1.4rem;
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
      }
    }
  }

  @media (min-width: 300px) and (max-width: 600px) {
    width: 100vw;
    height: fit-content;
    margin-bottom: 4rem;

    .headof {
      width: inherit;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 0rem;
    }

    .ifone {
      width: inherit;
      height: inherit;
    }

    .formmain {
      width: inherit;
      margin-top: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      .formchild {
        width: 30vw;
        height: 35vh;
        display: flex;
        flex-direction: column;

        .formtake {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .sameinp {
            width: 350px;
            padding: 1rem;
            margin-top: 2rem;
            outline: none;
          }

          .but {
            width: 12rem;
            align-self: flex-start;
            margin-left: -11.4rem;
            margin-top: 2rem;
          }
        }
      }
    }
  }
`;
