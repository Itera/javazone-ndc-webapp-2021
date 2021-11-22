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

async function createUser(auth: Auth): Promise<UserCredential> {
  console.trace('Creating a new user');
  const credentials = await signInAnonymously(auth);
  return credentials;
}

async function addUserToCollection(
  db: DatabaseReference,
  user: UserCredential,
  email: string,
  username: string
): Promise<void> {
  console.trace('creating a document entry for user');
  const documentRef = child(db, `/${user.user.uid}`);
  await update(documentRef, {
    email,
    username,
    uid: user.user.uid,
    createdAt: Date.now(),
  });
}

export function useAuth() {
  const { users } = useDatabase();
  const { auth } = useFirebase();

  async function addUser(username: string, email: string): Promise<User> {
    const credentials = await createUser(auth);
    await addUserToCollection(users, credentials, email, username);
    return credentials.user;
  }

  async function signIn(email: string, password: string): Promise<User> {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  }

  return {
    addUser,
    signIn,
  };
}
