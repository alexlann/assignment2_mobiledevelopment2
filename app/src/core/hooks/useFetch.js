import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../components/App/AuthContainer";
import { handleErrors } from "../helpers/api";

const useFetch = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { user } = useAuthContext();

  const userId = user._id;

  const fetchData = useCallback(() => {
    let isCurrent = true;
    fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: { Authorization: userId },
    })
      .then(handleErrors)
      .then((data) => isCurrent && setData(data))
      .catch((error) => isCurrent && setError(String(error)));

    return () => (isCurrent = false);
  }, [path, userId]);

  useEffect(() => {
    return fetchData();
  }, [fetchData]);

  const invalidate = () => {
    // refresh data
    fetchData();
  };

  const isLoading = !error && !data;

  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;