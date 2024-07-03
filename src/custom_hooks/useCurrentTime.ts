import { useState, useEffect } from 'react';

export default function useCurrentTime(): Date {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []); 
    return currentTime;
}