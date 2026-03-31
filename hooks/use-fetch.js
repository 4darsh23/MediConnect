"use client";

import { useState } from "react";
import { toast } from "sonner";

/**
 * Generic helper hook to call a server action and expose { loading, data, error }.
 *
 * Usage:
 *   const { loading, data, error, fn } = useFetch(serverAction);
 *   fn(arg1, arg2...)
 */
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
      return response;
    } catch (err) {
      const errorMessage =
        err?.message || err?.toString?.() || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
