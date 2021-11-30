import { useLocation, useNavigate } from "react-router";

import { Path } from "../../../routes";
import { TimeDisplay } from "../../../components/TimeDisplay";
import { toTimeString } from "../../../utils/toTimeString";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { useMount } from "../../../hooks/useMount";
import { useState } from "react";
import { useTimer } from "../../../hooks/useTimer";

export function Ongoing() {
  const location = useLocation();
  const navigate = useNavigate();
  const leaderboard = useLeaderboard();
  const { start: startTimer, stop } = useTimer();
  const [start] = useState(Date.now());

  const fastest = leaderboard[0];
  const username = location.state.username;

  useMount(() => {
    startTimer(username, start);
  });

  function finished() {
    const now = Date.now();
    stop(now).then((elapsed: number) => {
      navigate(Path.FINISH, {
        replace: true,
        state: {
          username: username,
          start: start,
          finish: now,
          elapsed: elapsed,
        },
      });
    });
  }

  return (
    <div
      className="column center-content bg-ivory fill-vh"
      style={{
        width: "25vw",
        minWidth: 480,
        justifyContent: "space-between",
      }}
    >
      <section
        className="center font-family-neue-machina"
        style={{ color: "#606060", marginTop: "4rem" }}
      >
        <h2 style={{ fontSize: "3rem", marginTop: 0, marginBottom: "1rem" }}>
          Highscore
        </h2>
        {fastest && (
          <p style={{ fontSize: "4.5rem", marginTop: "0rem" }}>
            {toTimeString(fastest.start, fastest.finish)}
          </p>
        )}
        {!fastest && <p>Pending...</p>}
      </section>
      <TimeDisplay start={start} column />
      <button
        onClick={finished}
        style={{ fontSize: "5rem", marginBottom: "4rem" }}
      >
        Done
      </button>
    </div>
  );
}
