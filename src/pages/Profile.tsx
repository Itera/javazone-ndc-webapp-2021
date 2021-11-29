import { Link } from "react-router-dom";
import { Path } from "../routes";

export function Profile() {
  return (
    <>
      <h1>Your score is registered!</h1>
      <p>We will contact the winner after the conference.</p>
      <Link to={Path.UNREGISTERED}>Back to the list</Link>
    </>
  );
}
