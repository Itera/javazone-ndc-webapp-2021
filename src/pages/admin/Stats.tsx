import { DatabasePath, Entry } from '../../domain';
import { Link, useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';

import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import { toTimeString } from '../../utils/toTimeString';
import { useDatabase } from '../../hooks/useDatabase';
import { useMount } from '../../hooks/useMount';
import { useState } from 'react';

const logger = new Logger('Stats');

export function Stats() {
  const params = useParams();
  const { root } = useDatabase();
  const [data, setData] = useState<any>(null);
  const [abandoned, setAbandoned] = useState<any>(null);

  useMount(() => {
    const dailyRegistered = ref(
      root,
      `${DatabasePath.LEADERBOARD}/${params.date}/${DatabasePath.ENTRY}`,
    );

    const unsubscribeRegistered = onValue(dailyRegistered, (snapshot) => {
      if (!snapshot.exists()) {
        logger.error(
          `Attempted to read data for non existing [date=${params.date}]`,
        );
        return;
      }

      setData(snapshot.val());
    });

    const dailyUnregistered = ref(
      root,
      `${DatabasePath.UNREGISTERED}/${params.date}/${DatabasePath.ENTRY}`,
    );
    const unsubscribeUnregistered = onValue(dailyUnregistered, (snapshot) => {
      if (!snapshot.exists()) {
        logger.warn(`Found no unregistered entries for ${params.date}`);
        return;
      }

      setAbandoned(snapshot.val());
    });

    return () => {
      unsubscribeRegistered();
      unsubscribeUnregistered();
    };
  });

  if (data === null) {
    return (
      <>
        <h1>No data found for {params.date}</h1>
        <Link to={Path.ADMIN}>Back</Link>
      </>
    );
  }

  const extracted = Object.values(data) as Array<Entry>;
  const sorted = extracted.sort((a, b) => a.elapsed - b.elapsed);

  const quickestEntry = sorted[0];
  const slowestEntry = sorted[sorted.length - 1];

  const abandonedExist = abandoned !== null;
  const extractedAbandoned =
    abandonedExist &&
    (Object.values(abandoned) as Array<
      Pick<Entry, 'username' | 'elapsed' | 'start' | 'finish'>
    >);
  const sortedAbandoned =
    extractedAbandoned &&
    extractedAbandoned.sort((a, b) => a.elapsed - b.elapsed);
  const fastestAbandoned = sortedAbandoned && sortedAbandoned[0];
  const slowestAbandoned =
    sortedAbandoned && sortedAbandoned[sortedAbandoned.length - 1];

  function generateCSV() {
    const metadata = 'data:text/csv;charset=utf-8,';
    const header = 'name,email,phone,consent,time';
    const data = extracted.reduce(
      (acc, cur) =>
        acc +
        `\n${cur.name},${cur.email},${cur.phone},${cur.consent},${toTimeString(
          cur.start,
          cur.finish,
        )}`,
      '',
    );
    const encoded = encodeURI(metadata + header + data);
    window.open(encoded);
  }

  return (
    <div style={{ padding: '24px 32px', height: '100vh', overflow: 'auto' }}>
      <Link to={Path.ADMIN}>Back</Link>
      <h1>Statistics for {params.date}</h1>
      <Link to={`${Path.ADMIN}/${params.date}/winner`} className="button">
        Get lucky winner!
      </Link>
      <button
        onClick={generateCSV}
        style={{ marginLeft: '24px', cursor: 'pointer' }}
      >
        Export to CSV
      </button>
      <table>
        <tbody>
          <tr>
            <td>Entries</td>
            <td>{sorted.length}</td>
          </tr>
          <tr>
            <td>Fastest time</td>
            <td>{toTimeString(quickestEntry.start, quickestEntry.finish)}</td>
          </tr>
          <tr>
            <td>Slowest time</td>
            <td>{toTimeString(slowestEntry.start, slowestEntry.finish)}</td>
          </tr>
          {abandonedExist &&
            sortedAbandoned &&
            fastestAbandoned &&
            slowestAbandoned && (
              <>
                <tr>
                  <td>Abandoned entries</td>
                  <td>{sortedAbandoned.length}</td>
                </tr>
                <tr>
                  <td>Fastest abandoned time</td>
                  <td>
                    {toTimeString(
                      fastestAbandoned.start,
                      fastestAbandoned.finish,
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Slowest abandoned time</td>
                  <td>
                    {toTimeString(
                      slowestAbandoned.start,
                      slowestAbandoned.finish,
                    )}
                  </td>
                </tr>
              </>
            )}
        </tbody>
      </table>
      <h2>Top 3 players</h2>
      <ol>
        {sorted.slice(0, 3).map((entry) => (
          <li key={entry.start}>
            <b>{entry.username}</b>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{entry.name}</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{toTimeString(entry.start, entry.finish)}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{entry.email}</td>
                </tr>
                <tr>
                  <td>Phonenumber</td>
                  <td>{entry.phone}</td>
                </tr>
                <tr>
                  <td>Consent</td>
                  <td>{String(entry.consent)}</td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ol>
    </div>
  );
}
