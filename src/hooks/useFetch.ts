import { useEffect, useState } from 'react';
import { TData } from '../utils/types.ts';

interface FetchResult {
  data: TData[] | null;
  loading: boolean;
  error: string | null;
}

function useFetch(url: string): FetchResult {
  const [data, setData] = useState<TData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: { success: boolean; data: TData[] } =
          await response.json();
        setData(result.data);
      } catch (error: Error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
