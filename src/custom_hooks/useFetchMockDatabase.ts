import { useState, useEffect, useCallback } from 'react';
import MockDashboardDB from '../mock_data/MockDashboardDBEndpoint';
import { DashboardDataItem } from '../ts_types/apiDataTypes'; // Adjust the import path accordingly

type UseFetchMockDatabaseResult = {
  data: DashboardDataItem[] | null;
  loading: boolean;
  error: Error | null;
};

const useFetchMockDatabase = (delayTime: number = 1000): UseFetchMockDatabaseResult => {
  const [data, setData] = useState<DashboardDataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
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
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }, delayTime);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [delayTime]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [delayTime]);

  return { data, loading, error };
};

export default useFetchMockDatabase;