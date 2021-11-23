import { useState } from "react";
import { TimeDisplay } from "../../timer/TimeDisplay";

export function Ongoing() {
  const [start] = useState(Date.now());

  return (
    <div>
      <div>
        <section>
          <h2>Highscore</h2>
        </section>
        <section>
          <h2>Elapsed Time</h2>
          <TimeDisplay start={start} />
          <button>Done</button>
        </section>
      </div>
    </div>
  );
}
