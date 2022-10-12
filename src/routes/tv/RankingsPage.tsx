import { useLocation, useNavigate } from 'react-router-dom';

import { DigitalClock } from '../../components/DigitalClock';
import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { useCallback } from 'react';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('RankingsPage');

function useViewModel() {
  const { state } = useLocation();
  const elapsed = state.finish - state.start;

  const navigate = useNavigate();
  useMount(() => {
    if (state === null || state.start === null || state.finish === null) {
      logger.warn(
        'Attempted to access rankings page without any information of recent run in state',
      );
      navigate(Paths.SIGN_UP);
    }
  });

  const reset = useCallback(() => {
    navigate(Paths.VIDEO);
  }, [navigate]);

  return {
    data: {
      elapsed,
    },
    handlers: {
      reset,
    },
  };
}

function Rankings(): JSX.Element {
  const {
    data: { elapsed },
    handlers: { reset },
  } = useViewModel();

  return (
    <h1>
      <DigitalClock time={elapsed} />
      <button type="button" onClick={reset}>
        Back to start
      </button>
    </h1>
  );
}

export default Rankings;
