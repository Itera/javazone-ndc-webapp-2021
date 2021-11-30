import { Link } from "react-router-dom";
import { Arrow } from "../../../components/Arrow";
import { Path } from "../../../routes";

interface Props {
  readonly username: string;
}

export function Explanation(props: Props) {
  return (
    <div style={{ padding: "0 0 4rem 0", margin: "auto 0" }}>
      <h1 style={{ fontSize: 94 }}>Build Itera with us!</h1>
      <p style={{ fontSize: 55, lineHeight: 2 }}>
        Use the cubes on the ground to build the image that pops up on this
        screen.
      </p>
      <p style={{ fontSize: 55, lineHeight: 2 }}>
        Touch "DONE" when you are finished to stop the timer
      </p>

      <Link
        to={Path.COUNTDOWN}
        className="button row center-content"
        style={{ display: "inline-flex", fontSize: "5rem" }}
        state={props.username}
        replace
      >
        <Arrow />
        <span style={{ display: "inline-block", marginTop: "-3px" }}>
          Start Game
        </span>
      </Link>
    </div>
  );
}
