import { Auth, Database } from './Firebase';
import { DatabaseReference, ref } from 'firebase/database';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { Logger } from '../logger';
import { User } from 'firebase/auth';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('FirebaseContext');

type FirebaseContext = {
  user: User | null;
  db: DatabaseReference | null;
};

const Context = createContext<FirebaseContext | null>(null);

export function FirebaseProvider(
  props: PropsWithChildren<unknown>,
): JSX.Element {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    logger.trace('Attaching auth observer');
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      logger.info(`Updating [user=${user?.uid}]`);
      setUser(user);
    });

    return () => {
      logger.trace('Detaching auth observer');
      unsubscribe();
    };
  });

  const value: FirebaseContext = {
    user,
    db: user !== null ? ref(Database, `/${user.uid}`) : null,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFirebase(): {
  user: User;
  db: DatabaseReference;
} {
  const context = useContext(Context);

  if (context === null) {
    logger.error('Attempted to access firebase context without Provider');
    throw new Error(`Hook must be wrapped by ${FirebaseProvider.name}`);
  }

  const { user, db } = context;

  if (user === null || db === null) {
    logger.error('Attempted to access firebase context before authentication');
    throw new Error('Unauthorized access');
  }

  return { user, db };
}
