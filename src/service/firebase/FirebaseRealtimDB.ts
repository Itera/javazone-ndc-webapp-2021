import type { Attempt, AttemptEntry, Attempts, Run } from './domain';
import { child, get, push, remove } from 'firebase/database';
import { getAttemptRef, getLeaderboardRef } from './databaseRefs';

import { Logger } from '../logger';

const logger = new Logger('FirebaseRealtimeDB');
class FirebaseRealtimeDB {
  async registerAttempt(payload: Attempt) {
    logger.trace(`Registering attempt for [user=${payload.username}]`);

    logger.debug(
      `Attempting to store attempt in realtime database with [payload=${JSON.stringify(
        payload,
      )}]`,
    );

    const { key } = await push(getAttemptRef(), payload);
    logger.info(`Successfully stored attempt on [key=${key}]`);
  }

  async getAttempts(): Promise<Array<AttemptEntry>> {
    logger.trace('Retrieving attempts for today');

    const snapshot = await get(getAttemptRef());

    if (snapshot.exists()) {
      const data = snapshot.val() as Attempts;
      const entries = Object.entries(data);
      return entries.map(([key, value]) => ({
        key,
        ...value,
      }));
    }

    logger.warn(
      `Unable to read attempts database, most likely because there are no attempts at the moment`,
    );
    throw new Error('Unable to read attempts database');
  }

  async registerRun(run: Run): Promise<void> {
    const { key, ...data } = run;
    logger.trace(`Registering run for [key=${run.key}]`);

    try {
      logger.debug(`Writing to leaderboard for attempt [key=${key}]`);
      const leaderboardEntry = await push(getLeaderboardRef(), data);
      logger.info(
        `Successfully registered run with [key=${leaderboardEntry.key}]`,
      );

      logger.debug(`Deleting attempt entry for [key=${key}]`);
      const ref = child(getAttemptRef(), `/${key}`);
      await remove(ref);
      logger.info(`Successfully cleaned up attempt entry [key=${key}]`);
    } catch (err) {
      logger.error(`Failed to register run due to [err=${err}]`);
      throw new Error('Failed to register run');
    }
  }
}

export const database = new FirebaseRealtimeDB();
