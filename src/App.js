import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./nav/Home/Home";
import Contact from "./nav/Contact/Contact";
import Cart from "./nav/Cart/Cart";
import PageNotFound from "./nav/404/PageNotFound";
import Header from "./components/Header/Header";
import Login from "./nav/Login/Login";
import Register from "./nav/Register/Register";
import Product from "./nav/Product/Product";
import SingleProducts from "./nav/SingleProducts/SingleProducts";
import Footer from "./components/Footer/Footer";
import Profile from "./nav/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import styled from "styled-components";
import EditProfile from "./nav/EditProfile/EditProfile";
import ChangePassword from "./nav/ChangePassword/ChangePassword";
import ForgotPassword from "./nav/ForgotPassword/ForgotPassword";
import ResetPassword from "./nav/ResetPassword/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<ProtectedRoutes Component={Profile} />}
          />
          <Route
            path="/product"
            element={<ProtectedRoutes Component={Product} nav={"product"} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ProtectedRoutes Component={Cart} nav={"cart"}/>} />
          <Route
            path="/login"
            element={<ProtectedRoutes Component={Login} nav={"login"} />}
          />
           <Route
            path="/forgotpassword"
            element={<ProtectedRoutes Component={ForgotPassword} nav={"forgotpassword"} />}
          />
           <Route
            path="/resetpassword/:token"
            element={<ResetPassword/>}
          />
          <Route
            path="/register"
            element={<ProtectedRoutes Component={Register} nav={"regis"} />}
          />
          <Route path="/api/products/:id" element={<SingleProducts />} />
          <Route
            path="/editprofile"
            element={<ProtectedRoutes Component={EditProfile} />}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/changepassword" element={<ProtectedRoutes Component={ChangePassword}/>} />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
