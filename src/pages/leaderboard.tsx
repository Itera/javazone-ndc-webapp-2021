import { Highscore } from '../features/firebase/Highscore';
import { Ongoing } from '../features/firebase/Ongoing';

export function Leaderboard() {
  return (
    <>
      <h1>Leaderboard</h1>
      <Highscore />
      <Ongoing />
    </>
  );
}
