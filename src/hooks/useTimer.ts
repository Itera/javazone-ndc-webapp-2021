import { child, get, push, update } from '@firebase/database';

import { User } from '@firebase/auth';
import { useDatabase } from './useDatabase';
import { useState } from 'react';

export function useTimer() {
  const [db] = useDatabase();
  const [key, setKey] = useState<string | null>(null);

  async function start(user: User) {
    const generatedKey = push(db).key;

    if (generatedKey === null) {
      throw new Error('Failed to generate new key');
    }

    setKey(() => generatedKey);
    const now = Date.now();

    await update(db, {
      [generatedKey]: {
        name: user.displayName,
        uid: user.uid,
        start: now,
      },
    });

    return now;
  }

  async function stop() {
    if (key === null) {
      throw new Error('No ongoing session found');
    }

    const now = Date.now();
    const entry = await get(child(db, key));
    const data = entry.val();

    await update(db, {
      [key]: {
        ...data,
        finish: now,
      },
    });

    setKey(() => null);

    return now - data.start;
  }

  return {
    start,
    stop,
  };
}
