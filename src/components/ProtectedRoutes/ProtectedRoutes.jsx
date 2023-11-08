import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component, nav }) => {
  let navigate = useNavigate();
  let token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      if (nav === "regis") {
        navigate("/register");
      } else if (nav === "forgotpassword") {
        navigate("/forgotpassword");
      } else if (nav === "resetpassword") {
        navigate("/resetpassword");
      } else {
        navigate("/login");
      }
    } else if (
      token &&
      (nav === "login" ||
        nav === "regis" ||
        nav === "forgotpassword" ||
        nav === "resetpassword")
    ) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Component />;
};

export default ProtectedRoutes;
