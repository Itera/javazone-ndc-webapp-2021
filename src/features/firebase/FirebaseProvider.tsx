import { Analytics, getAnalytics } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
import { Database, get, ref } from 'firebase/database';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { getDatabase, set } from 'firebase/database';

import { Config } from '../config/Config';
import { useMount } from '../../hooks/useMount';

interface FirebaseContext {
  app: FirebaseApp;
  analytics: Analytics;
  auth: Auth;
  db: Database;
}

const firebaseContext = createContext<FirebaseContext | null>(null);

export function FirebaseProvider({ children }: PropsWithChildren<{}>) {
  const [app] = useState(initializeApp(Config.getFirebaseConfig()));
  const [analytics] = useState(getAnalytics(app));
  const [db] = useState(getDatabase(app));
  const [auth] = useState(getAuth(app));

  async function init() {
    if (auth.currentUser === null) {
      return;
    }

    const snapshot = await get(ref(db, '/leaderboard'));
    const data = await snapshot.val();

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (data === null || data[today] === undefined) {
      try {
        await set(ref(db, `leaderboard/${today}`), {
          createdAt: Date.now(),
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useMount(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        init();
      }
    });
  });

  return (
    <firebaseContext.Provider
      value={{
        app,
        analytics,
        db,
        auth,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(firebaseContext);

  if (context === null) {
    throw new Error('Element must be wrapped by a FirebaseProvider');
  }

  return context;
}
