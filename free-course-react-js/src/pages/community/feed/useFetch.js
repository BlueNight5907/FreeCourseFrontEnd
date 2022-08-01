import { useState, useEffect } from "react";
import { getNewFeeds } from "services/api/blogAPI";

function useFetch(page) {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeeds = async () => {
      console.log("get feeds from:", page);
      try {
        const { feeds } = await getNewFeeds("", 10, page);
        setList((prev) => [...prev, ...feeds]);
      } catch (err) {
        setError(err);
      }
    };
    getFeeds();
  }, [page]);

  return { error, list };
}

export default useFetch;
