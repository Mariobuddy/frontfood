import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdHome } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import { shippingUpdate } from "../../redux/features/cart";
import StepperMain from "../../components/StepperMain/StepperMain";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { shippingDetails } = useSelector((state) => state.cart);
  let [errors, setErrors] = useState({});
  let [formData, setformData] = useState(shippingDetails);
  const GetInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setformData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setformData(shippingDetails);
  }, [shippingDetails]);

  let validationForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "More than 10 characters required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.state.trim() && formData.country) {
      newErrors.state = "State is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number should be 10 digits";
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };

  let handShipClick = (e) => {
    e.preventDefault();
    if (validationForm()) {
      dispatch(shippingUpdate(formData));
      navigate("/order/confirm");
      setformData({
        address: "",
        pincode: "",
        phone: "",
        country: "",
        state: "",
        city: "",
      });
    }
  };

  return (
    <Wrapper>
      <StepperMain val={0} />
      <p className="shipp">Shipping Details</p>
      <div className="ship-form">
        <form action="" method="post">
          <div className="formcon">
            <p className="pshow">{errors.address ? errors.address : ""}</p>
            <span>
              <MdHome className="shipicon" />
            </span>
            <input
              type="text"
              className={errors.address ? "red" : "gray"}
              onChange={GetInput}
              name="address"
              placeholder="Enter Address *"
              value={formData?.address || ""}
            ></input>
          </div>
          <div className="formcon">
            <p className="pshow">{errors.city ? errors.city : ""}</p>
            <span>
              <MdLocationCity className="shipicon" />
            </span>
            <input
              type="text"
              className={errors.city ? "red" : "gray"}
              onChange={GetInput}
              name="city"
              placeholder="Enter City *"
              value={formData?.city || ""}
            ></input>
          </div>
          <div className="formcon">
            <p className="pshow">{errors.pincode ? errors.pincode : ""}</p>
            <span>
              <MdLocationOn className="shipicon" />
            </span>
            <input
              type="text"
              className={errors.pincode ? "red" : "gray"}
              onChange={GetInput}
              name="pincode"
              placeholder="Enter Pincode*"
              value={formData?.pincode || ""}
            ></input>
          </div>
          <div className="formcon">
            <p className="pshow">{errors.phone ? errors.phone : ""}</p>
            <span>
              <FaPhoneAlt className="shipicon" />
            </span>
            <input
              type="text"
              className={errors.phone ? "red" : "gray"}
              onChange={GetInput}
              name="phone"
              placeholder="Enter Phone Number *"
              value={formData?.phone || ""}
            ></input>
          </div>
          <div className="formcon">
            <p className="pshow">{errors.country ? errors.country : ""}</p>
            <span>
              <IoEarth className="shipicon" />
            </span>
            <select
              required
              className={errors.country ? "red" : "gray"}
              value={formData?.country || ""}
              name="country"
              onChange={GetInput}
            >
              <option value={""}>Country</option>
              {Country?.getAllCountries()?.map((val, i) => {
                return (
                  <option key={i} value={val.isoCode || ""}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          {formData?.country ? (
            <>
              <div className="formcon">
                <p className="pshow">{errors.state ? errors.state : ""}</p>
                <span>
                  <FaPlaceOfWorship className="shipicon" />
                </span>
                <select
                  value={formData?.state || ""}
                  name="state"
                  onChange={GetInput}
                  className={
                    errors.state && (formData?.country || "") ? "red" : "gray"
                  }
                >
                  <option value={""}>State</option>
                  {State?.getStatesOfCountry(formData?.country || "")?.map(
                    (val, i) => {
                      return (
                        <option key={i} value={val.isoCode || ""}>
                          {val.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </>
          ) : (
            <></>
          )}
          <button className="shipb" onClick={handShipClick}>
            Continue
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Shipping;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0rem;

  .shipp {
    font-size: 2rem;
    border-bottom: 4px solid orangered;
    padding: 0.5rem 3rem;
    margin: 2rem 0rem;
  }
  .red {
    border-bottom: 2px solid red !important;
  }

  .gray {
    border-bottom: 2px solid gray !important;
  }
  .ship-form {
    form {
      .shipb {
        width: 15rem;
        margin-top: 1rem;
        font-size: 1.4rem;
        height: 4rem;
        color: #ffffff;
        border: none;
        cursor: pointer;
        background-color: orangered;
        border-radius: 4rem;
        margin-left: 22%;
        outline: none;
        &:hover {
          color: orangered;
          background-color: transparent;
          border: 2px solid orangered;
        }
      }

      .formcon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        select {
          width: 30rem;
          height: 4rem;
          margin-bottom: 2rem;
          border: none;
          margin-top: 0.8rem;
          outline: none;
          cursor: pointer;
          border-bottom: 2px solid gray;
          option {
          }
        }

        .pshow {
          position: absolute;
          top: 0;
          left: 0;
          color: red;
          margin-left: 3rem;
        }
        .shipicon {
          color: orangered;
          font-size: 2rem;
          margin-right: 1rem;
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
`;
