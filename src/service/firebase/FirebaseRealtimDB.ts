import type { Attempt, Attempts, Run } from './domain';
import {
  Database,
  DatabaseReference,
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
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

  async registerRun(run: Run): Promise<void> {
    const { key, ...data } = run;
    logger.trace(`Registering run for [key=${run.key}]`);

    try {
      logger.debug(`Writing to leaderboard for attempt [key=${key}]`);
      const leaderboardEntry = await push(this.getLeaderboardRef(), data);
      logger.info(
        `Successfully registered run with [key=${leaderboardEntry.key}]`,
      );

      logger.debug(`Deleting attempt entry for [key=${key}]`);
      const ref = child(this.getAttemptRef(), `/${key}`);
      await remove(ref);
      logger.info(`Successfully cleaned up attempt entry [key=${key}]`);
    } catch (err) {
      logger.error(`Failed to register run due to [err=${err}]`);
      throw new Error('Failed to register run');
    }
  }
}

export const database = new FirebaseRealtimeDB(Firebase);
