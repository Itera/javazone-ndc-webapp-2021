import { TimeDisplay } from './TimeDisplay';
import { User } from '../../domain';
import { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';

interface Props {
  user: User;
}

export function Timer(props: Props) {
  const { user } = props;
  const { start, stop } = useTimer();
  const [timer, setTimer] = useState<number | null>(null);

  function startTimer() {
    start(user).then((startTime) => {
      setTimer(() => startTime);
    });
  }

  function stopTimer() {
    stop().then(() => {
      setTimer(() => null);
    });
  }

  return (
    <>
      <h1>Something</h1>
      <TimeDisplay start={timer} />
      <button onClick={timer !== null ? stopTimer : startTimer}>
        {timer !== null ? 'Stop' : 'Start'}
      </button>
    </>
  );
}
