import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
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
import PaymentSucess from "./nav/PaymentSucess/PaymentSucess";
import PaymentWrapper from "./nav/PaymentGateway/PaymentWrapper";
import Myorder from "./nav/Myorder/Myorder";
import SingleOrder from "./nav/SingleOrder/SingleOrder";
import DashBoard from "./nav/DashBoard/DashBoard";
import DashDashboard from "./nav/DashBoard/DashDashboard";
import DashOrders from "./nav/DashBoard/DashOrders";
import DashProduct from "./nav/DashBoard/DashProduct";
import DashReviews from "./nav/DashBoard/DashReviews";
import DashUser from "./nav/DashBoard/DashUser";
import CreateProduct from "./nav/DashBoard/CreateProduct";
import ViewProduct from "./nav/DashBoard/ViewProduct";
import Loading from "./components/Loading/Loading";
import { useSelector } from "react-redux";
const LazyHome = lazy(() => import("./nav/Home/Home"));

function App() {
  const { isAuth, isAdmin } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyHome />
              </Suspense>
            }
          />
          {/* ---------------------------Not Login-------------------------------- */}

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetpassword/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/register" element={<Register />} />

          {/* -----------------------------Protected Routes-------------------------------- */}

          <Route
            path="/protected"
            element={<ProtectedRoutes isAuth={isAuth} />}
          >
            <Route exact path="profile" element={<Profile />} />
            <Route exact path="product" element={<Product />} />
            <Route exact path="paymentsucess" element={<PaymentSucess />} />
            <Route exact path="paymentgateway" element={<PaymentWrapper />} />
            <Route exact path="contact" element={<Contact />} />
            <Route exact path="cart" element={<Cart />} />
            <Route exact path="order/confirm" element={<OrderConfirm />} />
            <Route exact path="singleorderget/:id" element={<SingleOrder />} />
            <Route exact path="myorderfront" element={<Myorder />} />
            <Route exact path="shipping" element={<Shipping />} />
            <Route exact path="api/products/:id" element={<SingleProducts />} />
            <Route exact path="editprofile" element={<EditProfile />} />
            <Route exact path="changepassword" element={<ChangePassword />} />
          </Route>

          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoutes
                isAuth={isAuth}
                adminRoute={true}
                isAdmin={isAdmin === "admin"}
              >
                <DashBoard />
              </ProtectedRoutes>
            }
          >
            <Route path="dashdashboard" element={<DashDashboard />} />
            <Route path="dashproducts" element={<DashProduct />} />
            <Route path="dashorders" element={<DashOrders />} />
            <Route path="dashusers" element={<DashUser />} />
            <Route path="dashreviews" element={<DashReviews />} />
            <Route path="dashcreateproduct" element={<CreateProduct />} />
            <Route path="dashviewproduct" element={<ViewProduct />} />
          </Route>

          <Route exact path="*" element={<PageNotFound />} />
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

  .cirDiv {
    position: absolute;
    top: 30rem;
    left: 70rem;
  }
`;
