import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
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
    const { uid, username } = ongoing[0];
    logger.debug(`Ending run for [uid=${uid}`);

    const now = Date.now();

    await update(unregistered, {
      [uid]: {
        username,
        finish: now,
      },
    });

    navigate(Path.EXPLANATION);
  }

  return (
    <div
      className="center-content"
      style={{ justifyContent: 'center', height: '100vh' }}
    >
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
