import { useState, useEffect } from "react";
import { fetchData } from "../utils/Api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  let Fetching = async (url) => {
    setLoading("loading....");
    setData(null);
    setError(null);
    try {
      let data = await fetchData(url);
      setLoading(false);
      setData(data);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    Fetching(url);
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
