import { Link } from 'react-router-dom';
import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import { onValue } from 'firebase/database';
import { useDatabase } from '../../hooks/useDatabase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

const logger = new Logger('Admin');

export function Admin() {
  const { leaderboard } = useDatabase();

  const [data, setData] = useState<Array<string> | null>(null);

  useMount(() => {
    const unsubscribe = onValue(leaderboard, (snapshot) => {
      if (!snapshot.exists()) {
        logger.warn('leaderboard data is unreachable');
        return;
      }

      const dates = Object.keys(snapshot.val());
      const sorted = dates.sort((a, b) => b.localeCompare(a));
      setData(sorted);
    });

    return () => unsubscribe();
  });

  return (
    <div style={{ padding: '24px 32px', height: '100vh', overflow: 'auto' }}>
      <h1>Hent informasjon for en gitt dag</h1>
      <ul>
        {data?.map((datapoint) => (
          <li key={datapoint}>
            <Link to={`${Path.ADMIN}/${datapoint}`}>{datapoint}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
