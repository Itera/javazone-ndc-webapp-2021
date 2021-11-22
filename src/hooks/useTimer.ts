import { child, get, push, update } from '@firebase/database';

import { DatabasePath } from '../domain';
import { User } from '@firebase/auth';
import { useDatabase } from './useDatabase';
import { useState } from 'react';

export function useTimer() {
  const [db] = useDatabase();
  const [key, setKey] = useState<string | null>(null);

  async function start(user: User) {
    const dbRef = child(db, DatabasePath.ENTRY);
    const generatedKey = push(dbRef).key;

    if (generatedKey === null) {
      throw new Error('Failed to generate new key');
    }

    setKey(() => generatedKey);
    const now = Date.now();

    await update(dbRef, {
      [generatedKey]: {
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
    const dbRef = child(db, `${DatabasePath.ENTRY}/${key}`);
    const entry = await get(dbRef);
    const data = entry.val();

    await update(dbRef, {
      ...data,
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
