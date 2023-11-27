import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, isAuth, isAdmin, adminRoute }) => {
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to={"/"} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
