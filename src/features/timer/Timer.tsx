import { TimeDisplay } from "../../components/TimeDisplay";
import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";

interface Props {
  username: string;
}

export function Timer(props: Props) {
  const { username } = props;
  const { start, stop } = useTimer();
  const [timer, setTimer] = useState<number | null>(null);

  function startTimer() {
    start(username, Date.now()).then((startTime) => {
      setTimer(() => startTime);
    });
  }

  function stopTimer() {
    stop(Date.now()).then(() => {
      setTimer(() => null);
    });
  }

  return (
    <>
      <h1>Something</h1>
      <TimeDisplay start={timer} />
      <button onClick={timer !== null ? stopTimer : startTimer}>
        {timer !== null ? "Stop" : "Start"}
      </button>
    </>
  );
}
