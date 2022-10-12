import {
  Database,
  DatabaseReference,
  child,
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

type Attempt = {
  username: string;
  start: number;
  finish: number;
};

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
}

export const database = new FirebaseRealtimeDB(Firebase);
