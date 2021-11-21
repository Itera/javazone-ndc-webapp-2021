import {
  Database,
  DatabaseReference,
  getDatabase,
  ref,
} from 'firebase/database';

import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useState } from 'react';

export function useDatabase(): [DatabaseReference, Database] {
  const { app } = useFirebase();
  const [db] = useState(getDatabase(app));
  const [today] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  });

  return [ref(db, `/leaderboard/${today}`), db];
}
