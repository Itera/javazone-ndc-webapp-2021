import { Entry, User } from '../domain';
import { child, get, push, update } from 'firebase/database';

import { useDatabase } from './useDatabase';
import { useState } from 'react';
import { Logger } from '../features/logging/logger';

export function useTimer() {
  const [logger] = useState(new Logger('useTimer'));
  const { daily } = useDatabase();
  const [key, setKey] = useState<string | null>(null);

  async function start(user: User) {
    logger.trace('Starting new timer for user', user.uid);
    const generatedKey = push(daily).key;

    if (generatedKey === null) {
      logger.error('Failed to generate new key');
      throw new Error('Failed to generate new key');
    }

    const now = Date.now();

    await update(daily, {
      [generatedKey]: {
        uid: user.uid,
        start: now,
      },
    });

    setKey(() => generatedKey);
    logger.info(
      'Successfully created new entry',
      `[key=${generatedKey}]`,
      `[time=${now}]`
    );
    return now;
  }

  async function stop() {
    logger.trace('Stopping timer for', key);
    if (key === null) {
      logger.error('Stop was invoked without any ongoing runs', `[key=${key}]`);
      throw new Error('Stop was invoked without any ongoing runs');
    }

    const now = Date.now();
    const dbRef = child(daily, `${key}`);
    const entry = await get(dbRef);

    if (!entry.exists()) {
      logger.error(
        'Unable to find time entry',
        `[key=${key}]`,
        `[src=${dbRef.toString()}]`
      );
      setKey(() => null);
      throw new Error('Unable to find time entry');
    }

    const data = entry.val() as Entry;

    await update(dbRef, {
      ...data,
      elapsed: now - data.start,
      finish: now,
    });

    setKey(() => null);
    logger.info(
      'Successfully stopped time for entry',
      `[key=${key}]`,
      `[finish=${now}]`,
      `[elapsed=${now - data.start}]`
    );
    return now - data.start;
  }

  return {
    start,
    stop,
  };
}
