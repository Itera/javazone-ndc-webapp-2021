import { DatabaseReference, ref } from 'firebase/database';
import { PropsWithChildren, createContext, useState } from 'react';

import { Database } from './Firebase';
import { Logger } from '../logger';
import { User } from 'firebase/auth';
import { auth } from './FirebaseAuth';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('FirebaseContext');

export type FirebaseContext = {
  user: User | null;
  db: DatabaseReference | null;
};

export const Context = createContext<FirebaseContext | null>(null);

export function FirebaseProvider(
  props: PropsWithChildren<unknown>,
): JSX.Element {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    logger.trace('Attaching auth observer');
    auth.subscribe((user) => {
      logger.info(`Updating [user=${user?.uid}]`);
      setUser(user);
    });
  });

  const value: FirebaseContext = {
    user,
    db: user !== null ? ref(Database, `/${user.uid}`) : null,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
