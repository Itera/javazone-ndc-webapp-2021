import { Entry } from '../domain';
import { Logger } from '../features/logging/logger';
import { onValue } from 'firebase/database';
import { useDatabase } from './useDatabase';
import { useMount } from './useMount';
import { useState } from 'react';

export function useLeaderboard(): Array<Entry> {
  const [logger] = useState(new Logger('useLeaderboard'));
  const { daily } = useDatabase();
  const [leaderboard, setLeaderboard] = useState<Array<Entry>>([]);

  function updateStandings(entries: Array<Entry>) {
    logger.trace('Updating leaderboard');

    const finished = entries.filter((entry) =>
      entry.hasOwnProperty('finish'),
    ) as Array<Required<Entry>>;

    logger.debug('Found', `[finished=${finished.length}]`, 'finished entries');
    setLeaderboard(() => finished.sort((a, b) => a.elapsed - b.elapsed));
  }

  function attachObserver() {
    logger.trace(
      'Attaching listener to leaderboard document',
      daily.toString(),
    );
    return onValue(daily, (snapshot) => {
      if (!snapshot.exists()) {
        logger.warn('Found no data on', `[src=${daily.toString()}]`);
        return;
      }

      const data = snapshot.val() as Record<string, Entry>;
      const entries = Object.values(data);
      updateStandings(entries);
    });
  }

  useMount(() => {
    const unsubscibe = attachObserver();
    return () => unsubscibe();
  });

  return leaderboard;
}
