import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('CountdownPage');

function useViewModel() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useMount(() => {
    if (state === null || state.username === undefined) {
      logger.warn(
        'Attempted to access countdown page without username in state',
      );
      navigate(Paths.SIGN_UP);
    }
  });

  const [countdown, setCountdown] = useState(3);
  useMount(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (countdown === 0) {
      logger.trace('Countdown reached 0, pushing user to next phase');
      navigate(Paths.BUILD_QUOTE, {
        state,
      });
    }
  }, [countdown, navigate, state]);

  return { countdown };
}

function Countdown(): JSX.Element {
  const { countdown } = useViewModel();

  return <>{countdown}</>;
}

export default Countdown;
