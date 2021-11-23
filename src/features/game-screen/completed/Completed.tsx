import { useLocation } from "react-router";
import { toTimeString } from "../../../utils/toTimeString";

export function Completed() {
  const location = useLocation();
  const run = location.state;
  const elapsed = toTimeString(run.start, run.finish);

  return <p>GG {elapsed}</p>;
}
