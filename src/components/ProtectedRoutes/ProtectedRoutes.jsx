import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ Component, nav }) => {
  const { isAuth,data } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      switch (nav) {
        case "regis":
          navigate("/register");
          break;
        case "forgotpassword":
          navigate("/forgotpassword");
          break;
        case "resetpassword":
          navigate("/resetpassword");
          break;
        default:
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
    if(data?.user?.role==="user"){
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, nav,data]);
  return <Component />;
};

export default ProtectedRoutes;
