import { useState, useEffect } from 'react';

export default function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      // Update the current time every minute
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []); 
    return currentTime;
}