import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
import { toTimeString } from '../../../utils/toTimeString';
import { Highscore } from '../../firebase/Highscore';

export function Completed() {
  const location = useLocation();
  const run = location.state;
  const elapsed = toTimeString(run.start, run.finish);
  const [minutes, seconds, milliseconds] = elapsed.split(':');

  return (
    <div className="bg-ivory fill-screen">
      <motion.section
        className="color-sea center-content"
        style={{ height: '100vh' }}
        animate={{ height: '40vh' }}
        transition={{ duration: 2, delay: 3 }}
      >
        <p className="font-family-neue-machina" style={{ fontWeight: 'bold' }}>
          <span style={{ fontSize: 160 }}>{minutes}</span>
          <span style={{ fontSize: 160 }}>:{seconds}</span>
          <span style={{ fontSize: 96 }}>:{milliseconds}</span>
        </p>
      </motion.section>
      <motion.section
        style={{ height: '0vh' }}
        animate={{ height: '60vh' }}
        transition={{ duration: 2, delay: 3 }}
      >
        <Highscore />
      </motion.section>
    </div>
  );
}
