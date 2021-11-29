import { DatabaseReference, child, update, remove } from '@firebase/database';
import {
  User,
  //UserCredential,
  //signInAnonymously, 
  signInWithEmailAndPassword,
} from 'firebase/auth';

//import { Auth } from 'firebase/auth';
import { useDatabase } from './useDatabase';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { Logger } from '../features/logging/logger';
import { useState } from 'react';

/* async function createUser(auth: Auth, logger: Logger): Promise<UserCredential> {
  logger.trace('Creating a new user');
  const credentials = await signInAnonymously(auth);
  return credentials;
} */ 

async function addUserToCollection(
  db: DatabaseReference,
  email: string,
  name: string,
  phone: string,
  consent: boolean,
  username: string,
  logger: Logger
): Promise<void> {
  logger.trace('Creating a document entry for user', `[uid=${phone}]`);
  const documentRef = child(db, `/${phone}`);
  await update(documentRef, {
    email,
    name,
    phone,
    consent,
    username,
    createdAt: Date.now()
  });
}

async function removeFromUnregistered(
  db: DatabaseReference,
  entry: string,
  logger: Logger,
): Promise<void> {
  logger.trace('Removing from Unregistered', `[entry=${entry}]`);
  const documentRef = child(db, `/${entry}`);
  await remove(documentRef);
}

export function useAuth() {
  const [logger] = useState(new Logger('useAuth'));
  const { users, unregistered } = useDatabase();
  const { auth } = useFirebase();

  async function addUser(name: string, phone: string, email: string, consent: boolean, entry: string, username: string): Promise<null|User> {
    logger.trace('Adding new user');
    //const credentials = await createUser(auth, logger);
    await addUserToCollection(users, email, name, phone, consent, username, logger);

    logger.info(
      'Successfully created new user',
      `[uid=${phone}]`
    );

    await removeFromUnregistered(unregistered, entry, logger);
    logger.info(
      'Successfully removed user from unregistered',
      `[uid=${entry}]`
    );

    //return credentials.user;
    return null;
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
