import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signOut as logout,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { Auth } from 'firebase/auth';
import { randomString } from '../utils/randomString';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useState } from 'react';

async function createUser(auth: Auth, email: string): Promise<UserCredential> {
  console.trace('Creating a new user with email:', email);

  const password = randomString();

  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credentials;
}

async function setUsername(auth: Auth, username: string) {
  console.trace('Setting username for user');

  if (auth.currentUser === null) {
    throw new Error('Unable to retrieve authenticated user');
  }

  await updateProfile(auth.currentUser, {
    displayName: username,
  });
}

export function useAuth() {
  const { app } = useFirebase();
  const [auth] = useState(getAuth(app));

  async function addUser(username: string, email: string): Promise<User> {
    const credentials = await createUser(auth, email);
    await setUsername(auth, username);
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
