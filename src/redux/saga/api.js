import axios from "axios";


export const productsApi=async()=>{
    let data=await axios.get(`http://localhost:4000/api/products`);
    return data.data;
}