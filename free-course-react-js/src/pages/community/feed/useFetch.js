import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_MORE_FEEDS_REQUEST } from "store/types/data-types/blog-type";
import { getNewFeeds } from "services/api/blogAPI";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  //   const dispatch = useDispatch();

  const getMoreFeeds = useCallback(async () => {
    // console.log(page);
    try {
      setLoading(true);
      setError(false);
      //   const res = await axios.get(url);
      const { feeds, totalSize, size } = await getNewFeeds("", 10, page);
      setList((prev) => [...prev, ...feeds]);
      setLoading(false);
      //   dispatch({ type: GET_MORE_FEEDS_REQUEST, page_size: 10 });
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    const getFeeds = async () => {
      console.log(page);
      try {
        setLoading(true);
        setError(false);
        //   const res = await axios.get(url);
        const { feeds, totalSize, size } = await getNewFeeds("", 10, page);
        setList((prev) => [...prev, ...feeds]);
        setLoading(false);
        //   dispatch({ type: GET_MORE_FEEDS_REQUEST, page_size: 10 });
      } catch (err) {
        setError(err);
      }
    };
    getFeeds();
  }, [page]);

  return { loading, error, list };
}

export default useFetch;
