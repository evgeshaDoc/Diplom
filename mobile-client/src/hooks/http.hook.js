import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url, method = 'get', body = null, headers = {}) => {
      try {
        setLoading(true);
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const res = await fetch(url, { method, body, headers });
        const data = await res.json();

        // if (!res.ok) {
        //   throw new Error(
        //     data.message || 'Запрос не выполнен, повторите позже'
        //   );
        // }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setErrors(e);
      }
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  return { errors, loading, request, clearErrors };
};
