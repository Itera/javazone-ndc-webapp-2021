import { User, signInWithEmailAndPassword } from 'firebase/auth';

import { Logger } from '../features/logging/logger';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useState } from 'react';

export function useAuth() {
  const [logger] = useState(new Logger('useAuth'));
  const { auth } = useFirebase();

  async function signIn(email: string, password: string): Promise<User> {
    logger.trace('Signing in user');
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    logger.info('Signed in user', `[uid=${credentials.user.uid}]`);
    return credentials.user;
  }

  return {
    signIn,
  };
}
