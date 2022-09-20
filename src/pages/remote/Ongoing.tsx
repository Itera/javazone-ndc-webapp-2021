import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import { TimeDisplay } from '../../components/TimeDisplay';
import { update } from 'firebase/database';
import { useDatabase } from '../../hooks/useDatabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUnregistered } from '../../hooks/useUnregistered';

export function Ongoing(): JSX.Element {
  const [logger] = useState(new Logger('Ongoing'));
  const navigate = useNavigate();

  const { ongoing } = useUnregistered();
  const { unregistered } = useDatabase();

  async function clickHandler() {
    const { uid, username, start } = ongoing[0];
    logger.debug(`Ending run for [uid=${uid}`);

    const now = Date.now();

    await update(unregistered, {
      [uid]: {
        start,
        username,
        finish: now,
        elapsed: now - start,
      },
    });

    navigate(Path.EXPLANATION);
  }

  const current = ongoing[0];

  if (typeof current === 'undefined' || typeof current.start === 'undefined') {
    return (
      <div
        className="center-content"
        style={{
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <h1>Get Ready!</h1>
      </div>
    );
  }

  return (
    <div
      className="center-content"
      style={{
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <TimeDisplay start={current.start} />
      <button
        style={{
          fontSize: 150,
        }}
        onClick={clickHandler}
      >
        Done
      </button>
    </div>
  );
}
