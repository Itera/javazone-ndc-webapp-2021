import { DatabaseReference, child } from 'firebase/database';

import { Logger } from '../../logger';
import { useFirebase } from './useFirebase';

const logger = new Logger('useDailyDatabase');
const today = new Date().toISOString().split('T')[0];

export function useDailyDatabase(): {
  leaderboard: DatabaseReference;
  attempts: DatabaseReference;
} {
  const { db, user } = useFirebase();

  if (user === null || db === null) {
    logger.error('Attempted to access firebase context before authentication');
    throw new Error('Unauthorized access');
  }

  return {
    leaderboard: child(db, `/${today}/leaderboard`),
    attempts: child(db, `/${today}/attempts`),
  };
}
