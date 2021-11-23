import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface Props {
  readonly duration: number;
  readonly delay: number;
  readonly number: number;
  readonly backgroundColor: string;
  readonly color: string;
}

export function Count(props: PropsWithChildren<Props>) {
  const { duration, delay, number, backgroundColor, color } = props;

  return (
    <motion.div
      transition={{ duration, delay }}
      initial={{ translateX: "100vw" }}
      animate={{ translateX: "0vw" }}
      exit={{ translateX: "-100vw" }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: -number,
        backgroundColor,
        color,
      }}
    >
      <p style={{ fontSize: "10rem" }}>{number}</p>
    </motion.div>
  );
}
