import type { Attempt, Attempts } from './domain';
import {
  Database,
  DatabaseReference,
  child,
  get,
  getDatabase,
  push,
  ref,
} from 'firebase/database';

import { Firebase } from './Firebase';
import { FirebaseApp } from 'firebase/app';
import { Logger } from '../logger';
import { auth } from './FirebaseAuth';
import { isDefined } from 'dirty-kitchen/lib/type_checks';

const logger = new Logger('FirebaseRealtimeDB');
const today = new Date().toISOString().split('T')[0];
class FirebaseRealtimeDB {
  private db: Database;

  constructor(firebase: FirebaseApp) {
    this.db = getDatabase(firebase);
  }

  private getDatabaseRoot(): DatabaseReference {
    const user = auth.getUser();
    if (isDefined(user)) {
      return ref(this.db, `/${user.uid}`);
    }

    logger.error('Unauthorized user attempted to access database');
    throw new Error('Attempted to access database before authentication');
  }

  private getLeaderboardRef(): DatabaseReference {
    const root = this.getDatabaseRoot();
    return child(root, `/${today}/leaderboard`);
  }

  private getAttemptRef(): DatabaseReference {
    const root = this.getDatabaseRoot();
    return child(root, `/${today}/attempts`);
  }

  async registerAttempt(payload: Attempt) {
    logger.trace(`Registering attempt for [user=${payload.username}]`);

    logger.debug(
      `Attempting to store attempt in realtime database with [payload=${JSON.stringify(
        payload,
      )}]`,
    );

    const { key } = await push(this.getAttemptRef(), payload);
    logger.info(`Successfully stored attempt on [key=${key}]`);
  }

  async getAttempts(): Promise<Attempts> {
    const snapshot = await get(this.getAttemptRef());

    if (snapshot.exists()) {
      return snapshot.val();
    }

    logger.error(`Unable to read attempts database`);
    throw new Error('Unable to read attempts database');
  }
}

export const database = new FirebaseRealtimeDB(Firebase);
