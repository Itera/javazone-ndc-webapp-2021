import { useLeaderboard } from '../../hooks/useLeaderboard';

function getElapsedTimeString(start: number, finish: number): string {
  const elapsed = finish - start;
  const time = new Date(elapsed);
  return `${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`;
}

export function Highscore() {
  const [leaderboard] = useLeaderboard();

  return (
    <table>
      <tbody>
        {leaderboard.map((entry, index) => (
          <tr key={entry.start}>
            <td>{index}.</td>
            <td>{entry.name}</td>
            <td>{getElapsedTimeString(entry.start, entry.finish)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
