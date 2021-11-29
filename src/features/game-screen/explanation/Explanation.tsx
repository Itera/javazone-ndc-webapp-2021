import { useState } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes";
import { Keyboard } from "./Keyboard";

export function Explanation() {
  const [username, setUsername] = useState("");

  return (
    <div className="row">
      <div style={{ flex: "1 1 0", padding: "1rem" }}>
        <h1>Build Itera with us!</h1>
        <p>
          Use the cubes on the ground to build the image that pops up on this
          screen.
        </p>
        <p>Touch "DONE" when you are finished to stop the timer</p>

        <Link to={Path.COUNTDOWN} state={username} replace>
          Start Game
        </Link>
      </div>
      <div
        className="center-content column"
        style={{ flex: "1 1 0", padding: "1rem" }}
      >
        <h2>{username}</h2>
        <Keyboard onChange={(value) => setUsername(() => value)} />
      </div>
    </div>
  );
}
