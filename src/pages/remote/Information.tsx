import { Link, useNavigate } from 'react-router-dom';

import { Entry } from '../../domain';
import { Path } from '../../routes';
import { get } from 'firebase/database';
import { useDatabase } from '../../hooks/useDatabase';
import { useMount } from '../../hooks/useMount';

export function Information(): JSX.Element {
  const navigate = useNavigate();
  const { unregistered } = useDatabase();

  async function verifyOngoingGame() {
    const snapshot = await get(unregistered);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const entries = Object.entries(data) as Array<[string, Entry]>;
      const ongoing = entries.find(
        ([_, entry]) => typeof entry.finish === 'undefined',
      );

      if (typeof ongoing !== 'undefined') {
        navigate(Path.ONGOING);
      }
    }
  }

  useMount(() => {
    verifyOngoingGame();
  });

  return (
    <div style={{ padding: '24px 32px', height: '100vh', overflow: 'auto' }}>
      <h1>Build Itera with us!</h1>
      <p style={{ fontSize: 45, lineHeight: 1.5 }}>
        Use the cubes on the ground to build the image that pops up on this
        screen.
      </p>
      <p style={{ fontSize: 45, lineHeight: 1.5 }}>
        Touch "DONE" when you are finished to stop the timer.
      </p>
      <Link to={Path.USER_REGISTRATION} className="button">
        PLAY GAME
      </Link>
    </div>
  );
}
