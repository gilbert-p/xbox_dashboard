import { useState, useEffect } from 'react';

const useDelayedFetchDatabase = (url, delayTime = 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          setData(json);
          setLoading(false);
        }, delayTime);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, delayTime]);

  return { data, loading, error };
};

export default useDelayedFetchDatabase;