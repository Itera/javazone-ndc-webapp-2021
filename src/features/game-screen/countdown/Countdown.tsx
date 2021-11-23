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
        className="bg-gold color-lobster fill-screen center-content absolute"
      />
      <Count
        key="count-2"
        delay={DELAY}
        duration={DURATION}
        number={2}
        className="bg-jade color-sea fill-screen center-content absolute"
      />
      <Count
        key="count-1"
        delay={DELAY * 2}
        duration={DURATION}
        number={1}
        className="bg-fuschia color-gold fill-screen center-content absolute"
      />
    </AnimatePresence>
  );
}
