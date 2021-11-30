import { Entry } from "../../../domain";
import { Highscore } from "./Highscore";
import { Link } from "react-router-dom";
import { Path } from "../../../routes";
import { motion } from "framer-motion";
import { toTimeString } from "../../../utils/toTimeString";
import { useLocation } from "react-router";
import { Arrow } from "../../../components/Arrow";

export function Completed() {
  const location = useLocation();
  const run = location.state as Entry;
  const elapsed = toTimeString(run.start, run.finish);
  const [minutes, seconds, milliseconds] = elapsed.split(":");

  return (
    <div className="bg-ivory fill-screen">
      <motion.section
        className="color-sea center-content"
        style={{ height: "100vh" }}
        animate={{ height: "40vh" }}
        transition={{ duration: 2, delay: 3 }}
      >
        <p className="font-family-neue-machina" style={{ fontWeight: "bold" }}>
          <span style={{ fontSize: 160 }}>{minutes}</span>
          <span style={{ fontSize: 160 }}>:{seconds}</span>
          <span style={{ fontSize: 96 }}>:{milliseconds}</span>
        </p>
      </motion.section>
      <motion.section
        style={{ height: "0vh" }}
        animate={{ height: "60vh" }}
        transition={{ duration: 2, delay: 3 }}
      >
        <div className="row equal-width" style={{ padding: "2rem 3rem" }}>
          <Highscore entry={run} />
          <div style={{ paddingLeft: "4rem" }}>
            <p style={{ fontSize: "4rem", lineHeight: "5rem", marginTop: 0 }}>
              Register on the iPad to enter the draft to win a Sonos One!
            </p>
            <Link
              className="button row center-content"
              style={{ display: "inline-flex", fontSize: "5rem" }}
              to={Path.EXPLANATION}
              replace
            >
              <Arrow />
              <span style={{ display: "inline-block", marginTop: "-3px" }}>
                Next Player
              </span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
