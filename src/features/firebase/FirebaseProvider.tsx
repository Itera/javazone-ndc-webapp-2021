import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { get, ref } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, set } from 'firebase/database';

import { Config } from '../config/Config';
import { Loader } from '../../components/Loader';
import { Path } from '../../routes';
import { useNavigate } from 'react-router';

interface FirebaseContext {
  app: FirebaseApp;
  analytics: Analytics;
}

const firebaseContext = createContext<FirebaseContext | null>(null);

export function FirebaseProvider({ children }: PropsWithChildren<{}>) {
  const [app] = useState(initializeApp(Config.getFirebaseConfig()));
  const [analytics] = useState(getAnalytics(app));
  const [db] = useState(getDatabase(app));
  const [auth] = useState(getAuth(app));

  const navigate = useNavigate();

  async function init() {
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

    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate(Path.REGISTRATION);
      } else {
        navigate(Path.USER);
      }
    });
  }

  return (
    <firebaseContext.Provider
      value={{
        app,
        analytics,
      }}
    >
      <Loader init={init}>{children}</Loader>
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
