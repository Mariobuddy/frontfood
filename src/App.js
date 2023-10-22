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
import Footer from './components/Footer/Footer';
import Profile from "./nav/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
     <Wrapper>
     <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<ProtectedRoutes Component={Product} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/products/:id" element={<SingleProducts/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
     </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper=styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;

`;
