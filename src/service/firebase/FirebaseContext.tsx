import { PropsWithChildren, createContext, useState } from 'react';

import { Logger } from '../logger';
import { User } from 'firebase/auth';
import { auth } from './FirebaseAuth';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('FirebaseContext');

export type FirebaseContext = {
  user: User | null;
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
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
