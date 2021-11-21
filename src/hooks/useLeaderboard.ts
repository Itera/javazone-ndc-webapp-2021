import { Entry, Leaderboard } from '../domain';

import { onValue } from 'firebase/database';
import { useDatabase } from './useDatabase';
import { useMount } from './useMount';
import { useState } from 'react';

export function useLeaderboard(): [Array<Required<Entry>>, Array<Entry>] {
  const [db] = useDatabase();
  const [leaderboard, setLeaderboard] = useState<Array<Required<Entry>>>([]);
  const [ongoing, setOngoing] = useState<Array<Entry>>([]);

  function updateStandings(entries: Array<Entry>) {
    setOngoing(() =>
      entries.filter((entry) => !entry.hasOwnProperty('finish'))
    );

    const finished = entries.filter((entry) =>
      entry.hasOwnProperty('finish')
    ) as Array<Required<Entry>>;

    setLeaderboard(() =>
      finished.sort((a, b) => {
        const aElapsed = a.finish - a.start;
        const bElapsed = b.finish - b.start;
        return aElapsed - bElapsed;
      })
    );
  }

  function attachObserver() {
    onValue(db, (snapshot) => {
      const data = snapshot.val() as Leaderboard;
      if (data !== null && data.entries !== undefined) {
        const entries = Object.values(data.entries);
        updateStandings(entries);
      }
    });
  }

  useMount(() => {
    attachObserver();
  });

  return [leaderboard, ongoing];
}
