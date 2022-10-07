import { useState } from 'react';
import { ZodSchema } from 'zod';

const useFetch = <ResponseSchema extends ZodSchema>(
  method: 'POST' | 'GET',
  url: string,
  responseSchema: ResponseSchema,
  headers?: { [key: string]: string }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<typeof responseSchema | null>(null);
  const [error, setError] = useState<any>(null);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const doFetch = async (body: any) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { ...defaultHeaders, ...headers },
      });

      const jsonRaw = await response.json();
      const data = responseSchema.parse(jsonRaw);

      if (response.status !== 200) {
        setData(null);
        setError(data.message);
      } else {
        setData(data);
        setError(null);
      }
    } catch (error) {
      setData(null);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { doFetch, data, isLoading, error };
};

export default useFetch;
