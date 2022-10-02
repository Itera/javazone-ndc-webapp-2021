import { Auth, Database } from './Firebase';
import { DatabaseReference, ref } from 'firebase/database';
import { PropsWithChildren, createContext, useState } from 'react';

import { Logger } from '../logger';
import { User } from 'firebase/auth';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('FirebaseContext');

export type FirebaseContext = {
  user: User | null;
  db: DatabaseReference | null;
  auth: typeof Auth;
};

export const Context = createContext<FirebaseContext | null>(null);

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
    auth: Auth,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
