import { Highscore } from '../features/firebase/Highscore';
import { Ongoing } from '../features/firebase/Ongoing';
import { Unregistered } from '../features/firebase/Unregistered';

export function Overview() {
  return (
    <>
      <h1>Leaderboard</h1>
      <Highscore />
      <Ongoing />
      <Unregistered />
    </>
  );
}
