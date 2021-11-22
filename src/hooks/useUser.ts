import { child, get } from 'firebase/database';

import { User } from '../domain';
import { useDatabase } from './useDatabase';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useMount } from './useMount';
import { useState } from 'react';

export function useUser(): User | null {
  const { auth } = useFirebase();
  const { users } = useDatabase();
  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    console.trace('[useUser] Retrieving user', auth.currentUser?.uid);
    if (auth.currentUser === null) {
      return;
    }

    const dbRef = child(users, auth.currentUser.uid);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }
    });
  });

  return user;
}
