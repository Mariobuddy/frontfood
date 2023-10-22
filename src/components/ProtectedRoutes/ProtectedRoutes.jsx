import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component }) => {
  let navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      if (Component === "Product") {
        navigate("/Product");
      }
    }
  }, [data, navigate, Component]);
  return <>
  {
    data && <Component/>
  }
  </>
};

export default ProtectedRoutes;
