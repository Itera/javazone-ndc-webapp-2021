import { useEffect, useState } from "react";

import { toTimeString } from "../../utils/toTimeString";

interface Props {
  start: number | null;
}

export function TimeDisplay(props: Props): JSX.Element | null {
  const { start } = props;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (start === null) {
      return;
    }

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [start, setTick]);

  if (start === null) {
    return null;
  }

  const time = toTimeString(start, Date.now());

  const [minutes, seconds, milliseconds] = time.split(":");

  return (
    <p style={{ fontSize: "10rem", textAlign: "center" }}>
      {minutes}:<br />
      {seconds}:<br />
      {milliseconds}
    </p>
  );
}
