import axios from "axios";

export const fetchData = async (url) => {
  try {
    let {data} = await axios.get(url,{
      method:"GET",
      withCredentials:true,
    });
    return data;
  } catch (error) {
    return error;
  }
};
