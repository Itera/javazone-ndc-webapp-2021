import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { Path } from "../../../routes";
import { toTimeString } from "../../../utils/toTimeString";
import { TimeDisplay } from "../../../components/TimeDisplay";
import { useTimer } from "../../../hooks/useTimer";

export function Ongoing() {
  const navigate = useNavigate();
  const leaderboard = useLeaderboard();
  const { start: startTimer, stop } = useTimer();
  const [start] = useState(Date.now());

  const fastest = leaderboard[0];

  useEffect(() => {
    startTimer("RAG", start);
  }, []);

  function finished() {
    const now = Date.now();
    stop(now).then((elapsed: number) => {
      navigate(Path.FINISH, {
        replace: true,
        state: {
          username: "RAG",
          start: start,
          finish: now,
          elapsed: elapsed,
        },
      });
    });
  }

  return (
    <div className="row">
      <div className="fill-vh" style={{ flexGrow: 6 }}></div>
      <div
        className="column center-content space-around bg-ivory fill-vh"
        style={{ flexGrow: 1 }}
      >
        <section className="center font-family-neue-machina">
          <h2>Highscore</h2>
          {fastest && <p>{toTimeString(fastest.start, fastest.finish)}</p>}
          {!fastest && <p>Pending...</p>}
        </section>
        <TimeDisplay start={start} column />
        <button onClick={finished}>Done</button>
      </div>
    </div>
  );
}
