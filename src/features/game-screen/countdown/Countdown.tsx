import { AnimatePresence } from "framer-motion";
import { Count } from "./Count";

const DURATION = 0.5;
const DELAY = 1;

export function Countdown() {
  return (
    <AnimatePresence>
      <Count
        key="count-3"
        delay={0}
        duration={DURATION}
        number={3}
        color="#FF4B33"
        backgroundColor="#FFDD00"
      />
      <Count
        key="count-2"
        delay={DELAY}
        duration={DURATION}
        number={2}
        color="#0029FF"
        backgroundColor="#37E17B"
      />
      <Count
        key="count-1"
        delay={DELAY * 2}
        duration={DURATION}
        number={1}
        color="#FFDD00"
        backgroundColor="#AF1DFF"
      />
    </AnimatePresence>
  );
}
