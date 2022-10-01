import { User, signInWithEmailAndPassword } from 'firebase/auth';

import { Auth } from '../service/firebase';
import { Logger } from '../service/logger';

const logger = new Logger('useAuth');

async function signIn(username: string, password: string): Promise<User> {
  logger.trace(`Attempting to sign in [username=${username}]`);

  try {
    const credentials = await signInWithEmailAndPassword(
      Auth,
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

export function useAuth(): {
  signIn: (username: string, password: string) => Promise<User>;
} {
  return { signIn };
}
