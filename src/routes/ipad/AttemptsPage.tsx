import type { AttemptEntry } from '../../service/firebase';
import { Link } from 'react-router-dom';
import { Paths } from '../Router';
import { database } from '../../service/firebase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

function useViewModel() {
  const [attempts, setAttempts] = useState<Array<AttemptEntry>>([]);

  useMount(() => {
    database.getAttempts().then((data) => setAttempts(data));
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
