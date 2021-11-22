import { child, get } from 'firebase/database';

import { User } from '../domain';
import { useDatabase } from './useDatabase';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useMount } from './useMount';
import { useState } from 'react';
import { Logger } from '../features/logging/logger';

export function useUser(): User | null {
  const [logger] = useState(new Logger('useUser'));
  const { auth } = useFirebase();
  const { users } = useDatabase();
  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    logger.trace('Retrieving user', auth.currentUser?.uid);
    if (auth.currentUser === null) {
      logger.debug('User is not authorized');
      return;
    }

    const dbRef = child(users, auth.currentUser.uid);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          logger.info(
            'Found user information',
            `[uid=${auth.currentUser?.uid}]`
          );
          setUser(() => snapshot.val());
        } else {
          logger.debug(
            'Unable to find user information',
            `[uid=${auth.currentUser?.uid}]`
          );
        }
      })
      .catch((err) =>
        logger.error(
          'Encountered an exception while retrieving user information',
          `[uid=${auth.currentUser?.uid}]`,
          err
        )
      );
  });

  return user;
}
