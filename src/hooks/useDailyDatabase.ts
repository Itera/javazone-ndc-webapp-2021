import { DatabaseReference, child } from 'firebase/database';

import { useFirebase } from '../service/firebase';

const today = new Date().toISOString().split('T')[0];

export function useDailyDatabase(): {
  leaderboard: DatabaseReference;
  attempts: DatabaseReference;
} {
  const { db } = useFirebase();

  return {
    leaderboard: child(db, `/${today}/leaderboard`),
    attempts: child(db, `/${today}/attempts`),
  };
}
