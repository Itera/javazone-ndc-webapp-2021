import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Path } from "../routes";

import PriceImage from "../statics/images/Sonos.png";

export function Profile() {
  return (
    <div style={{ padding: "2rem 3rem" }}>
      <Logo />
      <h1
        style={{
          fontSize: "5.25rem",
          lineHeight: "5rem",
          color: "rgb(0, 41, 255)",
        }}
      >
        Your score is registered!
      </h1>
      <p
        style={{
          fontSize: "1.75rem",
          lineHeight: "3rem",
        }}
      >
        We will contact the winner after the conference.
      </p>
      <img src={PriceImage} style={{ maxWidth: "100%" }} />
      <Link to={Path.UNREGISTERED} className="button">
        Back to the list
      </Link>
    </div>
  );
}
