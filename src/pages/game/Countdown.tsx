import { useLocation, useNavigate } from "react-router";
import { Countdown as InternalCountdown } from "../../features/game-screen/countdown/Countdown";
import { useMount } from "../../hooks/useMount";
import { Path } from "../../routes";

export function Countdown() {
  const location = useLocation();
  const navigate = useNavigate();

  useMount(() => {
    const timer = setTimeout(() => {
      navigate(Path.GAME, {
        replace: true,
        state: {
          username: location.state,
        },
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return <InternalCountdown />;
}
