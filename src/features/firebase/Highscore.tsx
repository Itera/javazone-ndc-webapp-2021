import { toTimeString } from '../../utils/toTimeString';
import { useLeaderboard } from '../../hooks/useLeaderboard';

export function Highscore() {
  const [leaderboard] = useLeaderboard();

  return (
    <table>
      <tbody>
        {leaderboard.map((entry, index) => (
          <tr key={entry.start}>
            <td>{index}.</td>
            <td>{entry.name}</td>
            <td>{toTimeString(entry.start, entry.finish)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
