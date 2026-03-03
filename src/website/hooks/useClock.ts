import { useEffect, useState } from 'react';

// real time live clock synced to the exact millisecond
const useClock = () => {
  const [dateArr, setDateArr] = useState<string[]>([]);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    let timerId: number;

    const tick = () => {
      const now = new Date();
      setDateArr(now.toDateString().split(' '));
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, ''));

      const delay = 1000 - now.getMilliseconds();

      timerId = setTimeout(tick, delay);
    };

    tick();

    return () => clearInterval(timerId);
  }, []);

  return { dateArr, time };
};
export default useClock;
