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
import Shipping from "./nav/Shipping/Shipping";
import OrderConfirm from "./nav/OrderConfirm/OrderConfirm";
import PaymentGateway from "./nav/PaymentGateway/PaymentGateway";
import PaymentSucess from "./nav/PaymentSucess/PaymentSucess";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/profile"
            element={<ProtectedRoutes Component={Profile} nav={"profile"} />}
          />
            <Route
            exact
            path="/paymentsucess"
            element={<ProtectedRoutes Component={PaymentSucess} nav={"paymentsucess"} />}
          />
          <Route
            exact
            path="/paymentgateway"
            element={
              <ProtectedRoutes
                Component={PaymentGateway}
                nav={"paymentgateway"}
              />
            }
          />
          <Route
            exact
            path="/product"
            element={<ProtectedRoutes Component={Product} nav={"product"} />}
          />
          <Route exact path="/contact" element={<Contact />} />
          <Route
            exact
            path="/cart"
            element={<ProtectedRoutes Component={Cart} nav={"cart"} />}
          />
          <Route
            exact
            path="/login"
            element={<ProtectedRoutes Component={Login} nav={"login"} />}
          />
          <Route
            exact
            path="/forgotpassword"
            element={
              <ProtectedRoutes
                Component={ForgotPassword}
                nav={"forgotpassword"}
              />
            }
          />
          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoutes Component={OrderConfirm} nav={"orderconfirm"} />
            }
          />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoutes Component={Shipping} nav={"shipping"} />}
          />
          <Route
            exact
            path="/resetpassword/:token"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/register"
            element={<ProtectedRoutes Component={Register} nav={"regis"} />}
          />
          <Route exact path="/api/products/:id" element={<SingleProducts />} />
          <Route
            exact
            path="/editprofile"
            element={<ProtectedRoutes Component={EditProfile} />}
          />
          <Route exact path="*" element={<PageNotFound />} />
          <Route
            exact
            path="/changepassword"
            element={<ProtectedRoutes Component={ChangePassword} />}
          />
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
