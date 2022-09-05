import { AnimatePresence, motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Path } from '../../routes';
import { toTimeString } from '../../utils/toTimeString';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';
import { useUnregistered } from '../../hooks/useUnregistered';

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

  const [minutes, seconds, milliseconds] = toTimeString(
    props.start,
    Date.now(),
  ).split(':');

  return (
    <p className="column font-family-neue-machina center-content">
      <span>{minutes}:</span>
      <span>{seconds}:</span>
      <span>{milliseconds}</span>
    </p>
  );
}

export function Unregistered() {
  const { unregistered, ongoing } = useUnregistered();

  return (
    <div style={{ padding: '2rem 3rem', height: '100vh', overflow: 'auto' }}>
      <Logo />
      <h1
        style={{
          fontSize: '5.25rem',
          lineHeight: '5rem',
          color: 'rgb(0, 41, 255)',
        }}
      >
        Register your score!
      </h1>
      <p
        style={{
          fontSize: '1.75rem',
          lineHeight: '3rem',
        }}
      >
        Select your username to register for a chance to win a Sonos One!
      </p>
      <ul>
        {unregistered
          .sort((a, b) => b.start - a.start)
          .map((entry) => (
            <li key={entry.uid}>
              <Link
                to={Path.REGISTRATION}
                state={entry}
                style={{ color: 'rgb(0, 41, 255)', textDecoration: 'none' }}
              >
                {entry.username}
              </Link>
            </li>
          ))}
      </ul>

      <AnimatePresence>
        {ongoing.length > 0 && (
          <motion.div
            style={{
              display: 'inline-block',
              position: 'fixed',
              top: 0,
              right: 0,
              color: '#fff',
              backgroundColor: 'rgb(0, 41, 255)',
              padding: '0.5rem 1rem',
              fontSize: '1.75rem',
              minWidth: 90,
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
