import { Link } from "react-router-dom";
import { Arrow } from "../../../components/Arrow";
import { Path } from "../../../routes";

interface Props {
  readonly username: string;
}

export function Explanation(props: Props) {
  return (
    <div style={{ padding: "0 0 4rem 0", width: "60vw" }}>
      <p style={{ fontSize: 45, lineHeight: 2 }}>
        Use the cubes on the ground to build the image that pops up on this
        screen.
      </p>
      <p style={{ fontSize: 45, lineHeight: 2 }}>
        Touch "DONE" when you are finished to stop the timer
      </p>

      <Link
        to={Path.COUNTDOWN}
        className="button row center-content"
        style={{
          display: "inline-flex",
          fontSize: "5rem",
          pointerEvents: props.username.length !== 3 ? "none" : undefined,
          backgroundColor: props.username.length !== 3 ? "#B8BAC6" : undefined,
        }}
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
