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
            element={<ProtectedRoutes Component={Product} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ProtectedRoutes Component={Cart} />} />
          <Route
            path="/login"
            element={<ProtectedRoutes Component={Login} nav={"login"} />}
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
