import axios from "axios";

export const fetchData = async (url) => {
  try {
    let {data} = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
