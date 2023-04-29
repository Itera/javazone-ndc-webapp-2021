import { Auth, User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Firebase } from './Firebase';
import { FirebaseApp } from 'firebase/app';
import { Logger } from '../logger';

const logger = new Logger('FirebaseAuth');

class FirebaseAuth {
  private auth: Auth;
  private user: User | null = null;

  private subscribers: Array<(user: User | null) => void> = [];

  constructor(firebase: FirebaseApp) {
    this.auth = getAuth(firebase);
    this.auth.onAuthStateChanged((user: User | null) =>
      this.onAuthStateChange(user),
    );
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  async signIn(username: string, password: string): Promise<User> {
    logger.trace(`Attempting to sign in [username=${username}]`);

    try {
      const credentials = await signInWithEmailAndPassword(
        this.auth,
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

  async signOut(): Promise<void> {
    logger.trace(`Attempting to sign out [user=${this.user?.uid}]`);
    return this.auth.signOut();
  }

  private onAuthStateChange(user: User | null): void {
    logger.debug(
      `Auth state change handler was invoked with [user=${user?.uid}]`,
    );
    this.notify(user);
    this.user = user;
  }

  private notify(user: User | null) {
    this.subscribers.forEach((callback) => callback(user));
  }

  getUser(): User | null {
    return this.user;
  }

  subscribe(callback: (user: User | null) => void): void {
    this.subscribers.push(callback);
    callback(this.user);
  }

  unsubscribe(callback: (user: User | null) => void): void {
    this.subscribers = this.subscribers.filter(
      (subscription) => subscription !== callback,
    );
  }
}

export const auth = new FirebaseAuth(Firebase);
