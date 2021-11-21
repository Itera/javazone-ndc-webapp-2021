import { useEffect, useState } from 'react';

import { toTimeString } from '../../utils/toTimeString';

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

  return <h1>{toTimeString(start, Date.now())}</h1>;
}
