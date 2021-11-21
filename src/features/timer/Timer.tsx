import { useEffect, useState } from 'react';

interface Props {
  start: number | null;
}

export function Timer(props: Props): JSX.Element | null {
  const { start } = props;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (start === null) {
      return;
    }

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [start, setTick]);

  if (start === null) {
    return null;
  }

  const elapsed = Date.now() - start;
  const time = new Date(elapsed);

  return (
    <h1>
      {time.getMinutes()}:{time.getSeconds()}:{time.getMilliseconds()}
    </h1>
  );
}
