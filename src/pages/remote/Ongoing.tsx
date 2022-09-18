import { useLocation, useNavigate } from 'react-router-dom';

import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import { update } from 'firebase/database';
import { useDatabase } from '../../hooks/useDatabase';
import { useState } from 'react';

export function Ongoing(): JSX.Element {
  const [logger] = useState(new Logger('Ongoing'));
  const navigate = useNavigate();
  const location = useLocation();

  const { unregistered } = useDatabase();
  const { uuid, username, registrationTime } = location.state;

  async function clickHandler() {
    logger.info(`Ending run for [uuid=${uuid}`);

    await update(unregistered, {
      [uuid]: {
        username,
        registrationTime,
        finish: Date.now(),
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
