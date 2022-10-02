import { User, signInWithEmailAndPassword } from 'firebase/auth';

import { Logger } from '../../logger';
import { useFirebase } from './useFirebase';

const logger = new Logger('useAuth');

export function useAuth(): {
  signIn: (username: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  authenticated: boolean;
} {
  const { auth, user } = useFirebase();

  async function signIn(username: string, password: string): Promise<User> {
    logger.trace(`Attempting to sign in [username=${username}]`);

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      logger.debug(`Successfully authenticated [uid=${credentials.user.uid}]`);
      return credentials.user;
    } catch (err) {
      logger.error(`Failed to authenticate user due to [err=${err}]`);
      throw new Error('Failed to authenticate user');
    }
  }

  async function signOut() {
    const uid = user?.uid;
    logger.trace(`Signing out [user=${uid}]`);
    await auth.signOut();
    logger.info(`Successfully signed out [user=${uid}]`);
  }

  return { signIn, signOut, authenticated: user !== null };
}
