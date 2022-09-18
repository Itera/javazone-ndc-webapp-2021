import { Link } from 'react-router-dom';
import { Path } from '../../routes';

export function Information(): JSX.Element {
  return (
    <div style={{ padding: '24px 32px', height: '100vh', overflow: 'auto' }}>
      <h1>Build Itera with us!</h1>
      <p style={{ fontSize: 45, lineHeight: 1.5 }}>
        Use the cubes on the ground to build the image that pops up on this
        screen.
      </p>
      <p style={{ fontSize: 45, lineHeight: 1.5 }}>
        Touch "DONE" when you are finished to stop the timer.
      </p>
      <Link to={Path.USER_REGISTRATION} className="button">
        PLAY GAME
      </Link>
    </div>
  );
}
