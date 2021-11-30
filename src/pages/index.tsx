import { Link } from 'react-router-dom';
import { Path } from '../routes';

export function Home() {
  return (
    <>
      <h1>Navigation links</h1>
      <Link to={Path.VIDEOSHOW}>Game</Link>
      <Link to={Path.UNREGISTERED}>Registration</Link>
      <Link to={Path.LOGIN}>Sign In</Link>
    </>
  );
}
