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
  return [ref(db, '/leaderboard'), db];
}
