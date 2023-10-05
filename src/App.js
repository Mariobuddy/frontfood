import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./nav/Home/Home";
import Contact from "./nav/Contact/Contact";
import Cart from "./nav/Cart/Cart";
import PageNotFound from "./nav/404/PageNotFound";
import Header from "./components/Header/Header";
import Login from "./nav/Login/Login";
import Register from "./nav/Register/Register";
import Product from "./nav/Product/Product";
// import Footer from "./components/Footer/Footer";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./redux/features/products";

function App() {
  let dispatch=useDispatch();
  const {data}=useSelector((state)=>state.products);
  console.log(data);

  useEffect(()=>{
  dispatch(fetchUser());
  },[dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
