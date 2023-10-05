import axios from "axios";


export const productsApi=async()=>{
    return await axios.get(`http://localhost:4000/api/products`);
}