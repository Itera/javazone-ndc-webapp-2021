import { Entry } from "../../../domain";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { toTimeString } from "../../../utils/toTimeString";

interface Props {
  readonly entry: Entry;
}

interface HighlightedEntry extends Entry {
  highlight?: boolean;
}

export function Highscore(props: Props): JSX.Element {
  const { entry } = props;
  const leaderboard = useLeaderboard();

  const withRecentRun: Array<HighlightedEntry> = [
    ...leaderboard.filter((value) => value.start !== entry.start),
    { ...entry, highlight: true },
  ].sort((a, b) => a.elapsed - b.elapsed);
  const fastest = withRecentRun[0];

  return (
    <table>
      <thead></thead>
      <tbody>
        <tr data-highlight={fastest.highlight}>
          <td>1.</td>
          <td>{fastest.username}</td>
          <td>{toTimeString(fastest.start, fastest.finish)}</td>
        </tr>
        {withRecentRun.slice(1).map((entry, index) => (
          <tr key={entry.start} data-highlight={entry.highlight}>
            <td>{index + 2}.</td>
            <td>{entry.username}</td>
            <td>{toTimeString(entry.start, entry.finish)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
