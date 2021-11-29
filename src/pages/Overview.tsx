import { CompactHighscore } from "../features/firebase/CompactHighscore";
import { Ongoing } from "../features/firebase/Ongoing";
import { Unregistered } from "../features/firebase/Unregistered";

export function Overview() {
  return (
    <>
      <h1>Leaderboard</h1>
      <CompactHighscore />
      <Ongoing />
      <Unregistered />
    </>
  );
}
