import { AnimatePresence, motion } from "framer-motion";
import { Ongoing, Quotes } from "../../features/game-screen/ongoing";

export function Game() {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="bg-lobster color-gold fill-screen center-content"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
          }}
          initial={{
            top: 0,
            left: 0,
          }}
          animate={{
            left: "200vw",
          }}
          transition={{ delay: 1, duration: 0.25 }}
        >
          <h1 style={{ fontSize: "25rem", fontWeight: 700 }}>Build!</h1>
        </motion.div>
      </AnimatePresence>
      <div className="row fill-screen">
        <Quotes />
        <Ongoing />
      </div>
    </div>
  );
}
