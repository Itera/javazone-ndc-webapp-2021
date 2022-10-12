import { useLocation, useNavigate } from 'react-router-dom';

import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { TimingClock } from '../../components/TimingClock/TimingClock';
import { database } from '../../service/firebase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

const logger = new Logger('BuildQuotePage');

function useViewModel() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useMount(() => {
    if (state === null || state.username === undefined) {
      logger.warn('Attempted to access build page without username in state');
      navigate(Paths.SIGN_UP);
    }
  });

  const [start] = useState(Date.now());

  async function completed() {
    logger.trace('User ended attempt');
    const now = Date.now();

    const attempt = {
      start,
      finish: now,
      username: state.username,
    };
    await database.registerAttempt(attempt);

    navigate(Paths.RANKINGS, {
      state: attempt,
    });
  }

  return {
    data: {
      start,
    },
    handlers: {
      completed,
    },
  };
}

function BuildQuotePage(): JSX.Element {
  const {
    data: { start },
    handlers: { completed },
  } = useViewModel();

  return (
    <h1>
      <TimingClock start={start} />
      <button type="button" onClick={completed}>
        Done
      </button>
    </h1>
  );
}

export default BuildQuotePage;
