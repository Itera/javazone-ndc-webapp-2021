import { useLocation, useNavigate } from 'react-router';

import { Entry } from '../../../domain';
import { Highscore } from './Highscore';
import { Path } from '../../../routes';
import { motion } from 'framer-motion';
import { toTimeString } from '../../../utils/toTimeString';
import { useMount } from '../../../hooks/useMount';

export function Completed() {
  const navigate = useNavigate();
  const location = useLocation();
  const run = location.state as Entry;
  const elapsed = toTimeString(run.start, run.finish);
  const [minutes, seconds, milliseconds] = elapsed.split(':');

  useMount(() => {
    const timer = setTimeout(() => {
      navigate(Path.VIDEOSHOW, { replace: true });
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
  });

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
        <div className="row equal-width" style={{ padding: '2rem 3rem' }}>
          <Highscore entry={run} />
          <div style={{ paddingLeft: '4rem' }}>
            <p style={{ fontSize: '4rem', lineHeight: '5rem', marginTop: 0 }}>
              Register on the iPad to enter the draft to win a giftcard from
              Ticketmaster!
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
