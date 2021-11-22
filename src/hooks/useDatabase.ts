import { getDatabase, ref } from 'firebase/database';

import { DatabasePath } from '../domain';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useState } from 'react';

export function useDatabase() {
  const { db } = useFirebase();
  const [today] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  });

  return {
    root: db,
    leaderboard: ref(db, DatabasePath.LEADERBOARD),
    daily: ref(
      db,
      `${DatabasePath.LEADERBOARD}/${today}/${DatabasePath.ENTRY}`
    ),
    users: ref(db, DatabasePath.USERS),
  };
}
