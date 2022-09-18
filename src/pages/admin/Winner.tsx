import { DatabasePath, Entry } from '../../domain';
import { Link, useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';

import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import { useDatabase } from '../../hooks/useDatabase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

const logger = new Logger('Winner');

let frequency = 1;
let flips = 0;
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function Winner() {
  const params = useParams();
  const { root } = useDatabase();
  const [data, setData] = useState<Array<Entry> | null>(null);
  const [winner, setWinner] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useMount(() => {
    const dailyRegistered = ref(
      root,
      `${DatabasePath.LEADERBOARD}/${params.date}/${DatabasePath.ENTRY}`,
    );

    const unsubscribe = onValue(dailyRegistered, (snapshot) => {
      if (!snapshot.exists()) {
        logger.error(
          `Attempted to read data for non existing [date=${params.date}]`,
        );
        return;
      }
      setData(Object.values(snapshot.val()));
    });

    return () => {
      unsubscribe();
    };
  });

  function getWinner() {
    if (data === null) {
      logger.error('Data not loaded yet for some reason');
      return;
    }

    if (frequency < 3000) {
      if (flips > 100 && flips < 1000) {
        frequency += frequency + 1;
      } else if (flips > 1000 && flips < 2000) {
        frequency += frequency + 2;
      }
      flips += 1;
      setWinner(getRandomInt(data.length));
      setTimeout(() => {
        getWinner();
      }, frequency);
    } else {
      flips = 0;
      frequency = 1;
    }
  }

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  if (winner === null) {
    return (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <button onClick={getWinner}>Pick Winner!</button>
      </div>
    );
  }

  if (frequency > 3000) {
    return (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <h1 className="bg-jade color-midnight" style={{ padding: '2rem' }}>
          {data[winner].name}
        </h1>

        {open && (
          <table style={{ maxWidth: 400 }}>
            <tbody>
              <tr>
                <td>Email</td>
                <td>{data[winner].email}</td>
              </tr>
              <tr>
                <td>Phonenumber</td>
                <td>{data[winner].phone}</td>
              </tr>
            </tbody>
          </table>
        )}

        <button
          onClick={() => setOpen(() => true)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: 0,
            backgroundColor: 'transparent',
            color: 'black',
            fontSize: 16,
          }}
        >
          Display contact information
        </button>
        <Link
          to={`${Path.ADMIN}/${params.date}`}
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
          }}
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1 className="bg-sea color-white" style={{ padding: '2rem' }}>
        {data[winner].name}
      </h1>
      <Link
        to={`${Path.ADMIN}/${params.date}`}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
        }}
      >
        Back
      </Link>
    </div>
  );
}
