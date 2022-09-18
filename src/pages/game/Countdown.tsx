import { useLocation, useNavigate } from 'react-router';

import { Countdown as InternalCountdown } from '../../features/game-screen/countdown/Countdown';
import { Path } from '../../routes';
import { useMount } from '../../hooks/useMount';

export function Countdown() {
  const location = useLocation();
  const navigate = useNavigate();

  useMount(() => {
    const timer = setTimeout(() => {
      navigate(Path.GAME, {
        state: location.state,
        replace: true,
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return <InternalCountdown />;
}
