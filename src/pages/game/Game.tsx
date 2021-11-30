import { Ongoing, Quotes } from "../../features/game-screen/ongoing";

export function Game() {
  return (
    <div className="row fill-screen">
      <Quotes />
      <Ongoing />
    </div>
  );
}
