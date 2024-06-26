import { useState, useEffect, useCallback } from 'react';
import MockDashboardDB from '../mock_data/MockDashboardDBEndpoint';

const useFetchMockDatabase = (delayTime = 1000, portraitScreen) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (portraitScreen) return;

    let isMounted = true;
    const timer = setTimeout(async () => {
      if (!isMounted) return;
      try {
        const response = await MockDashboardDB();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    }, delayTime);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [delayTime, portraitScreen]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchMockDatabase;