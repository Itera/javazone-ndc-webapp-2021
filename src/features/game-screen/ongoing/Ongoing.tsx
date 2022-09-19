import { onValue, update } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router';

import { Path } from '../../../routes';
import { TimeDisplay } from '../../../components/TimeDisplay';
import { toTimeString } from '../../../utils/toTimeString';
import { useDatabase } from '../../../hooks/useDatabase';
import { useLeaderboard } from '../../../hooks/useLeaderboard';
import { useMount } from '../../../hooks/useMount';
import { useState } from 'react';

export function Ongoing() {
  const location = useLocation();
  const navigate = useNavigate();
  const leaderboard = useLeaderboard();

  const [start] = useState(Date.now());

  const fastest = leaderboard[0];

  const { unregistered } = useDatabase();

  useMount(() => {
    const uid = location.state.uid;

    const unsubscribe = onValue(unregistered, (snapshot) => {
      if (snapshot.exists()) {
        const values = snapshot.val();
        const run = values[uid];

        if (typeof run === 'undefined') {
          return;
        }

        if (
          typeof run.finish === 'undefined' &&
          typeof run.start === 'undefined'
        ) {
          update(unregistered, {
            [uid]: {
              ...run,
              start: start,
            },
          });
        }

        if (typeof run.finish !== 'undefined') {
          navigate(Path.FINISH, {
            state: {
              ...run,
              start: start,
              elapsed: run.finish - start,
            },
            replace: true,
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <div
      className="column center-content bg-ivory fill-vh"
      style={{
        width: '25vw',
        minWidth: 480,
        justifyContent: 'space-between',
      }}
    >
      <section
        className="center font-family-neue-machina"
        style={{ color: '#606060', marginTop: '4rem' }}
      >
        <h2 style={{ fontSize: '3rem', marginTop: 0, marginBottom: '1rem' }}>
          Highscore
        </h2>
        {fastest && (
          <p style={{ fontSize: '4.5rem', marginTop: '0rem' }}>
            {toTimeString(fastest.start, fastest.finish)}
          </p>
        )}
        {!fastest && <p>Pending...</p>}
      </section>
      <TimeDisplay start={start} column />
      <div style={{ height: '15%' }}></div>
    </div>
  );
}
