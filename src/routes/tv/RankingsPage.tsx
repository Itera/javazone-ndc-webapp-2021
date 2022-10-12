import { useLocation, useNavigate } from 'react-router-dom';

import { DigitalClock } from '../../components/DigitalClock';
import { Logger } from '../../service/logger';
import { Paths } from '../Router';
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

  return {
    data: {
      elapsed,
    },
  };
}

function Rankings(): JSX.Element {
  const {
    data: { elapsed },
  } = useViewModel();

  return (
    <h1>
      <DigitalClock time={elapsed} />
    </h1>
  );
}

export default Rankings;
