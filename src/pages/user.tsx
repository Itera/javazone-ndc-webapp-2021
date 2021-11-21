import { useEffect, useState } from 'react';

import { Path } from '../routes';
import { Timer } from '../features/timer/TimeDisplay';
import { useNavigate } from 'react-router';
import { useTimer } from '../hooks/useTimer';
import { useUser } from '../hooks/useUser';

export function User() {
  const navigate = useNavigate();
  const user = useUser();
  const [timer, setTimer] = useState<number | null>(null);
  const { start, stop } = useTimer();

  useEffect(() => {
    if (user === null) {
      navigate(Path.REGISTRATION);
    }
  }, [user, navigate]);

  function startTimer() {
    if (user === null) {
      throw new Error('Unauthorized user');
    }

    start(user).then((startTime) => {
      setTimer(() => startTime);
    });
  }

  function stopTimer() {
    if (user === null) {
      throw new Error('Unauthorized user');
    }

    stop().then((elapsed) => {
      console.log('elapsed time:', elapsed);
      setTimer(() => null);
    });
  }

  return (
    <>
      <h1>Hello there {user?.displayName}</h1>
      <Timer start={timer} />
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
    </>
  );
}
