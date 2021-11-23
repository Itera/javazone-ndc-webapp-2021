import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { toTimeString } from "../../../utils/toTimeString";
import { Highscore } from "../../firebase/Highscore";

export function Completed() {
  const location = useLocation();
  const run = location.state;
  const elapsed = toTimeString(run.start, run.finish);
  const [minutes, seconds, milliseconds] = elapsed.split(":");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <motion.section
        style={{
          backgroundColor: "#EEEDE4",
          textAlign: "center",
          color: "#0029FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 10,
        }}
        animate={{ flexGrow: 1 }}
        transition={{ duration: 2, delay: 3 }}
      >
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          <span style={{ fontSize: 160 }}>{minutes}</span>
          <span style={{ fontSize: 160 }}>:{seconds}</span>
          <span style={{ fontSize: 96 }}>:{milliseconds}</span>
        </p>
      </motion.section>
      <motion.section
        style={{ flexGrow: 0, height: 0 }}
        animate={{ flexGrow: 100, height: "auto" }}
        transition={{ duration: 2, delay: 3 }}
      >
        <Highscore />
      </motion.section>
    </div>
  );
}
