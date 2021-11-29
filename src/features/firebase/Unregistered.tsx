import { AnimatePresence, motion } from "framer-motion";
import { userInfo } from "os";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMount } from "../../hooks/useMount";
import { useUnregistered } from "../../hooks/useUnregistered";
import { Path } from "../../routes";
import { toTimeString } from "../../utils/toTimeString";

function Timer(props: { start: number }) {
  const [, setTick] = useState(0);

  useMount(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  });

  return <p>{toTimeString(props.start, Date.now())}</p>;
}

export function Unregistered() {
  const { unregistered, ongoing } = useUnregistered();

  return (
    <div>
      <h1>Register your score!</h1>
      <p>Select your username to register a chance to win a Sonos One!</p>
      <ul>
        {unregistered
          .sort((a, b) => b.start - a.start)
          .map((entry) => (
            <li key={entry.uid}>
              <Link to={Path.REGISTRATION} state={entry}>
                {entry.username}
              </Link>
            </li>
          ))}
      </ul>

      <AnimatePresence>
        {ongoing.length > 0 && (
          <motion.div
            style={{
              display: "inline-block",
              position: "fixed",
              top: 0,
              right: 0,
              color: "#fff",
              backgroundColor: "rgb(0, 41, 255)",
              padding: "0.5rem 0.5rem 4rem 4rem",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
            }}
            initial={{
              right: -200,
            }}
            animate={{
              right: 0,
            }}
            exit={{ right: -200 }}
            transition={{ duration: 0.3 }}
          >
            <Timer start={ongoing[0].start} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
