import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ Component, nav }) => {
  const { isAuth } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      if (nav === "regis") {
        navigate("/register");
      } else if (nav === "forgotpassword") {
        navigate("/forgotpassword");
      } else if (nav === "resetpassword") {
        navigate("/resetpassword");
      } else if (nav === "product") {
        navigate("/login");
      } else {
        navigate("/login");
      }
    } else if (
      isAuth &&
      (nav === "login" ||
        nav === "regis" ||
        nav === "forgotpassword" ||
        nav === "resetpassword")
    ) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, nav]);
  return <Component />;
};

export default ProtectedRoutes;
