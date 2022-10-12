import { DigitalClock } from '../DigitalClock';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

function useViewModel() {
  const [, setTick] = useState(0);

  useMount(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  });

  return {
    data: {
      now: Date.now(),
    },
  };
}

export function TimingClock(props: { start: number }): JSX.Element {
  const {
    data: { now },
  } = useViewModel();

  const { start } = props;
  return <DigitalClock time={now - start} />;
}
