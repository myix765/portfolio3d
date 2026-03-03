import { useEffect, useState } from 'react';

const useClock = () => {
  const [dateArr, setDateArr] = useState<string[]>([]);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const timerId = setInterval(() => {
      const currDateTime = new Date();
      setDateArr(currDateTime.toDateString().split(' '));
      setTime(currDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, ''));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return { dateArr, time };
};
export default useClock;
