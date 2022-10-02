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
}

function Countdown(): JSX.Element {
  useViewModel();

  return <>we here..</>;
}

export default Countdown;
