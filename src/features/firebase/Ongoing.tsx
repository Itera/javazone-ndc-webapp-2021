import { Timer } from '../timer/Timer';
import { useLeaderboard } from '../../hooks/useLeaderboard';

export function Ongoing() {
  const [, ongoing] = useLeaderboard();

  return (
    <table>
      <tbody>
        {ongoing.map((entry) => (
          <tr key={entry.start}>
            <td>{entry.name}</td>
            <td>
              <Timer start={entry.start} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
