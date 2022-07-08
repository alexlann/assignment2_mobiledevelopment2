import { useState } from "react";
import { useAuthContext } from "../../components/App/AuthContainer";
import { handleErrors } from "../helpers/api";

const useMutation = () => {
  const auth = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // method is pretty long, so async/await looks better than Promise.then()
  const mutate = async (url, options = {}) => {
    setIsLoading(true);

    const headers = {
      accept: "application/json",
      "content-type": "application/json",
    };

    // only add auth if exists (e.g. login call has no auth yet)
    if (auth && auth.user) {
      headers.Authorization = auth.user._id;
    }

    try {
      const result = await fetch(url, {
        method: options.method ?? "POST",
        headers: headers,
        body: JSON.stringify(options.data ?? {}),
      });

      const data = await handleErrors(result);

      if (options.onSuccess) {
        options.onSuccess(data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      if (options.onError) {
        options.onError(error);
      } else {
        setIsLoading(false);
        setError(String(error));
      }
    }
  };

  return {
    isLoading,
    error,
    mutate,
  };
};

export default useMutation;