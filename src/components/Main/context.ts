import { createContext, useContext } from 'react';

import { User } from 'firebase/auth';

const context = createContext<{ user: User | null } | null>(null);

export const UserProvider = context.Provider;

export function useUser() {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error(`"useUser" must be wrapped by a "${UserProvider.name}"'`);
  }

  return ctx;
}
