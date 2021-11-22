import { DatabaseReference, child, update } from '@firebase/database';
import {
  User,
  UserCredential,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { Auth } from 'firebase/auth';
import { useDatabase } from './useDatabase';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { Logger } from '../features/logging/logger';
import { useState } from 'react';

async function createUser(auth: Auth, logger: Logger): Promise<UserCredential> {
  logger.trace('Creating a new user');
  const credentials = await signInAnonymously(auth);
  return credentials;
}

async function addUserToCollection(
  db: DatabaseReference,
  user: UserCredential,
  email: string,
  username: string,
  logger: Logger
): Promise<void> {
  logger.trace('Creating a document entry for user', `[uid=${user.user.uid}]`);
  const documentRef = child(db, `/${user.user.uid}`);
  await update(documentRef, {
    email,
    username,
    uid: user.user.uid,
    createdAt: Date.now(),
  });
}

export function useAuth() {
  const [logger] = useState(new Logger('useAuth'));
  const { users } = useDatabase();
  const { auth } = useFirebase();

  async function addUser(username: string, email: string): Promise<User> {
    logger.trace('Adding new user');
    const credentials = await createUser(auth, logger);
    await addUserToCollection(users, credentials, email, username, logger);

    logger.info(
      'Successfully created new user',
      `[uid=${credentials.user.uid}]`
    );
    return credentials.user;
  }

  async function signIn(email: string, password: string): Promise<User> {
    logger.trace('Signing in user');
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    logger.info('Signed in user', `[uid=${credentials.user.uid}]`);
    return credentials.user;
  }

  return {
    addUser,
    signIn,
  };
}
