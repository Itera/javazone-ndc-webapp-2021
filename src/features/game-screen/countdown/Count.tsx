import { motion, MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

interface Props extends MotionProps {
  readonly duration: number;
  readonly delay: number;
  readonly number: number;
  readonly className: string;
}

export function Count(props: PropsWithChildren<Props>) {
  const { duration, delay, number, ...rest } = props;

  return (
    <motion.div
      {...rest}
      transition={{ duration, delay }}
      initial={{ translateX: "100vw" }}
      animate={{ translateX: "0vw" }}
      exit={{ translateX: "-100vw" }}
      style={{
        zIndex: -number,
      }}
    >
      <p style={{ fontSize: "10rem" }}>{number}</p>
    </motion.div>
  );
}
