import { DatabaseReference, child, getDatabase, ref } from 'firebase/database';

import { Firebase } from './Firebase';
import { Logger } from '../logger';
import { auth } from './FirebaseAuth';
import { isDefined } from 'dirty-kitchen/lib/type_checks';

const today = new Date().toISOString().split('T')[0];
const db = getDatabase(Firebase);

const logger = new Logger('DatabaseRefs');

export function getDatabaseRoot(): DatabaseReference {
  const user = auth.getUser();
  if (isDefined(user)) {
    return ref(db, `/${user.uid}`);
  }

  logger.error('Unauthorized user attempted to access database');
  throw new Error('Attempted to access database before authentication');
}

export function getLeaderboardRef(): DatabaseReference {
  const root = getDatabaseRoot();
  return child(root, `/${today}/leaderboard`);
}

export function getAttemptRef(): DatabaseReference {
  const root = getDatabaseRoot();
  return child(root, `/${today}/attempts`);
}
