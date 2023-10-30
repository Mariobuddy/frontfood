import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({Component}) => {
  let navigate = useNavigate();
  let token=localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, Component,token]);
  return <Component/>;
};

export default ProtectedRoutes;
