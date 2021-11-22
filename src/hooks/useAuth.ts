import { Database, child, ref, update } from '@firebase/database';
import {
  User,
  UserCredential,
  getAuth,
  signOut as logout,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { Auth } from 'firebase/auth';
import { DatabasePath } from '../domain';
import { useDatabase } from './useDatabase';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useState } from 'react';

async function createUser(auth: Auth): Promise<UserCredential> {
  console.trace('Creating a new user');
  const credentials = await signInAnonymously(auth);
  return credentials;
}

async function addUserToCollection(
  db: Database,
  user: UserCredential,
  email: string,
  username: string
): Promise<void> {
  console.trace('creating a document entry for user');
  const usersRef = ref(db, DatabasePath.USERS);
  const documentRef = child(usersRef, `/${user.user.uid}`);
  await update(documentRef, {
    email,
    username,
    createdAt: Date.now(),
  });
}

export function useAuth() {
  const { app } = useFirebase();
  const [, db] = useDatabase();
  const [auth] = useState(getAuth(app));

  async function addUser(username: string, email: string): Promise<User> {
    const credentials = await createUser(auth);
    await addUserToCollection(db, credentials, email, username);
    return credentials.user;
  }

  async function signIn(email: string, password: string): Promise<User> {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  }
  async function signOut() {
    await logout(auth);
  }

  return {
    addUser,
    signIn,
    signOut,
  };
}
