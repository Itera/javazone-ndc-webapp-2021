import { Entry, User } from '../domain';
import { child, get, push, update } from 'firebase/database';

import { useDatabase } from './useDatabase';
import { useState } from 'react';

export function useTimer() {
  const { daily } = useDatabase();
  const [key, setKey] = useState<string | null>(null);

  async function start(user: User) {
    const generatedKey = push(daily).key;

    if (generatedKey === null) {
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

    return now;
  }

  async function stop() {
    if (key === null) {
      throw new Error('No ongoing session found');
    }

    const now = Date.now();
    const dbRef = child(daily, `${key}`);
    const entry = await get(dbRef);
    const data = entry.val() as Entry;

    await update(dbRef, {
      ...data,
      elapsed: now - data.start,
      finish: now,
    });

    setKey(() => null);

    return now - data.start;
  }

  return {
    start,
    stop,
  };
}
