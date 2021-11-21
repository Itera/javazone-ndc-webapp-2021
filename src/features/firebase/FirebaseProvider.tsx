import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { get, ref } from 'firebase/database';
import { getDatabase, set } from '@firebase/database';

import { useMount } from '../../hooks/useMount';

interface FirebaseContext {
  app: FirebaseApp;
  analytics: Analytics;
}

const firebaseContext = createContext<FirebaseContext | null>(null);

const config = {
  apiKey: 'AIzaSyDGMJscARK_Wkq2CGhy7wgu0BOd-51VXwo',
  appId: '1:1015382247649:web:21b4626b518b85223d8fa0',
  authDomain: 'javazone-and-ndc-2021.firebaseapp.com',
  databaseURL:
    'https://javazone-and-ndc-2021-default-rtdb.europe-west1.firebasedatabase.app',
  measurementId: 'G-Q4GS8NXN28',
  messagingSenderId: '1015382247649',
  projectId: 'javazone-and-ndc-2021',
  storageBucket: 'javazone-and-ndc-2021.appspot.com',
};

export function FirebaseProvider({ children }: PropsWithChildren<{}>) {
  const [app] = useState(initializeApp(config));
  const [analytics] = useState(getAnalytics(app));

  async function init() {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, '/leaderboard'));
    const data = await snapshot.val();

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (data[today] === undefined) {
      await set(ref(db, `leaderboard/${today}`), {
        createdAt: Date.now(),
      });
    }
  }

  useMount(() => {
    init();
  });

  return (
    <firebaseContext.Provider
      value={{
        app,
        analytics,
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
