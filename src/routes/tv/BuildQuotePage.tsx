import { useLocation, useNavigate } from 'react-router-dom';

import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { useMount } from '../../hooks/useMount';

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
}

function BuildQuote(): JSX.Element {
  useViewModel();

  return <h1>Hello</h1>;
}

export default BuildQuote;
