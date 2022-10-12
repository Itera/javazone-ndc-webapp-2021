import type { Attempt, Attempts } from '../../service/firebase';

import { Link } from 'react-router-dom';
import { Paths } from '../Router';
import { database } from '../../service/firebase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

type DataEntry = {
  key: string;
} & Attempt;

function translateData(data: Attempts): Array<DataEntry> {
  return Object.entries(data).map(([key, value]) => ({
    key,
    ...value,
  }));
}

function useViewModel() {
  const [attempts, setAttempts] = useState<Array<DataEntry>>([]);

  useMount(() => {
    database.getAttempts().then((data) => setAttempts(translateData(data)));
  });

  return {
    data: {
      attempts,
    },
  };
}

function AttemptsPage(): JSX.Element {
  const {
    data: { attempts },
  } = useViewModel();

  return (
    <>
      <h1>Attempts</h1>
      <ul>
        {attempts.map((attempt) => (
          <li key={attempt.key}>
            <Link to={Paths.REGISTRATION} state={attempt}>
              {attempt.username}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AttemptsPage;
