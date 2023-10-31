import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component, nav }) => {
  let navigate = useNavigate();
  let token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
       if(nav==="regis"){
        navigate("/register");
       }else{
       navigate("/login");
       }
    } else if (token && (nav === "login" || nav === "regis")) {
      navigate("/");
    }
  }, [navigate, Component, token, nav]);
  return <Component />;
};

export default ProtectedRoutes;
