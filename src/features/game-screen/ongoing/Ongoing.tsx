import { useState } from "react";
import { useNavigate } from "react-router";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { Path } from "../../../routes";
import { toTimeString } from "../../../utils/toTimeString";
import { TimeDisplay } from "../../timer/TimeDisplay";

export function Ongoing() {
  const navigate = useNavigate();
  const [leaderboard] = useLeaderboard();
  const [start] = useState(Date.now());

  const fastest = leaderboard[0];

  function finished() {
    const now = Date.now();

    navigate(Path.FINISH, {
      replace: true,
      state: {
        start: start,
        finish: now,
        elapsed: now - start,
      },
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flexGrow: 6, height: "100vh" }}></div>
      <div
        style={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#EEEDE4",
        }}
      >
        <section style={{ textAlign: "center" }}>
          <h2>Highscore</h2>
          {fastest && <p>{toTimeString(fastest.start, fastest.finish)}</p>}
          {!fastest && <p>Pending...</p>}
        </section>
        <TimeDisplay start={start} />
        <button onClick={finished}>Done</button>
      </div>
    </div>
  );
}
