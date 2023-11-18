import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseImg from "../../components/Base64/BaseImg";
import { AiFillCamera } from "react-icons/ai";
import Rohit from "../../assests/profile.jpeg";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/features/auth";

const EditProfile = () => {
  let dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  let nav = useNavigate();
  const [loadCir, setLoadCir] = useState(true);
  let [formData, setformData] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    image: "",
  });
  let [errors, setErrors] = useState({});

  let handleProfile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let data = await BaseImg(file);
      setformData({ ...formData, image: data });
    }
  };

  useEffect(() => {
    setformData({
      name: data?.user?.name,
      surname: data?.user?.surname,
      gender: data?.user?.gender,
      email: data?.user?.email,
      image: data?.user?.image?.url,
    });
  }, [data]);

  const GetInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setformData({ ...formData, [name]: value });
  };

  let validationForm = () => {
    const newErrors = {};

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "More than 3 characters required";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    } else if (formData.surname.length < 3) {
      newErrors.surname = "More than 3 characters required";
    }

    // Email validation (required and format)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.image) {
      newErrors.image = "Please upload image";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    errors = newErrors;
    setErrors(errors);

    return Object.keys(newErrors).length === 0;
  };

  const PostBut = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch("http://localhost:4000/updateprofile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.status === 200) {
          setLoadCir(true);
          toast("Profile Updated Sucessfull");
          nav("/profile");
          setformData({
            name: "",
            surname: "",
            gender: "",
            email: "",
            image: "",
          });
          dispatch(fetchAuth());
        } else if (
          data.message === "Email already exists" ||
          data.message === "Nothing to update" ||
          data.message === "Internal server error"
        ) {
          setLoadCir(true);
          toast(data.message);
        }
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <Wrapper>
      <div className="mainDiv">
        <div
          className="profileDiv"
          style={{ border: errors.image ? "5px solid red" : "5px solid gray" }}
        >
          <img
            alt="img"
            src={formData.image ? formData.image : Rohit}
            className="profile"
          />
        </div>
        <label htmlFor="profileLab">
          <AiFillCamera className="up" />
          <input
            id="profileLab"
            onChange={handleProfile}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
        </label>

        <form method="post">
          <div className="formcon">
            <p className="pshow">{errors.name ? errors.name : ""}</p>
            <input
              type="text"
              className={errors.name ? "red" : "gray"}
              onChange={GetInput}
              name="name"
              placeholder="First Name *"
              value={formData.name}
            ></input>
          </div>

          <div className="formcon">
            <p className="pshow">{errors.surname ? errors.surname : ""}</p>
            <input
              type="text"
              className={errors.surname ? "red" : "gray"}
              name="surname"
              onChange={GetInput}
              placeholder="Last Name *"
              value={formData.surname}
            ></input>
          </div>
          <div className="lab">
            <input
              type="radio"
              name="gender"
              value="Male"
              style={{ border: "2px solid red" }}
              onChange={GetInput}
              checked={formData.gender === "Male"}
            ></input>
            <label className="cir">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={GetInput}
              checked={formData.gender === "Female"}
            ></input>
            <label className="cir">Female</label>
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={GetInput}
              checked={formData.gender === "Other"}
            ></input>
            <label className="cir">Other</label>
          </div>
          <div className="formcon">
            <p className="pshow">{errors.email ? errors.email : ""}</p>
            <input
              type="text"
              id="email"
              className={errors.email ? "red" : "gray"}
              name="email"
              onChange={GetInput}
              placeholder="Your Email *"
              value={formData.email}
            ></input>
          </div>
          <div className="bdiv">
            <button className="sub" id="buts" type="submit" onClick={PostBut}>
              Change
            </button>
          </div>
        </form>
        {!loadCir && (
          <span className="pl">
            <Loading />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

export default EditProfile;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12rem 0rem;
  justify-content: center;
  align-items: center;

  .red {
    border-bottom: 2px solid red !important;
  }

  .gray {
    border-bottom: 2px solid gray !important;
  }

  .mainDiv {
    padding: 2rem 0rem;
    width: 50%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 20px 5px gray;
    position: relative;

    .pl {
      position: absolute;
      bottom: 8rem;
      left: 43%;
    }

    label {
      .up {
        font-size: 3rem;
        position: absolute;
        top: 4rem;
        left: 48%;
        color: #ffffffd6;
        cursor: pointer;
      }
    }

    .profileDiv {
      border-radius: 50%;
      width: 7rem;
      height: 7rem;
      border: 5px solid gray;
      position: relative;
      overflow: hidden;
      .profile {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;

      .bdiv {
        width: 18rem;
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        #buts {
          width: 15rem;
          background-color: #923cb5;
          background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);
          &:hover {
            box-shadow: 0 4px 6px rgba(118, 117, 117, 0.1);
          }
          color: #ffffff;
          outline: none;
          border: none;
          height: 4rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.1s ease;
        }
      }

      .lab {
        width: 30rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 5.5rem;
        position: relative;
        /* flex-direction: column; */

        label {
          font-size: 1.4rem;
          margin-right: 1rem;
          margin-bottom: 1rem;
          color: #5c5a5a;
        }

        input {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      }

      .formcon {
        position: relative;

        .pshow {
          position: absolute;
          top: 0;
          left: 0;
          color: red;
        }
        input {
          outline: none;
          width: 30rem;
          height: 3.5rem;
          margin-bottom: 2rem;
          border: none;
          z-index: 4444;
          background-color: transparent;
          margin-top: 1rem;
        }
      }
    }
  }

  @media (min-width: 350px) and (max-width: 768px) {
    padding-top: 3rem;

    .mainDiv {
      padding: 1rem 0rem;
      width: 90%;

      #buts {
        margin-top: 2rem;
      }

      .pl {
        position: absolute;
        bottom: 5.5rem;
        left: 36%;
      }

      label {
        .up {
          left: 46%;
          top: 3rem;
        }
      }
    }
  }
`;
