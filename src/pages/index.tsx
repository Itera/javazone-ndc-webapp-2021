import { Link } from 'react-router-dom';
import { Path } from '../routes';

export function Home() {
  return (
    <>
      <h1>Navigation links</h1>
      <ul>
        <li>
          <Link to={Path.VIDEOSHOW}>Game</Link>
        </li>
        <li>
          <Link to={Path.UNREGISTERED}>Registration</Link>
        </li>
        <li>
          <Link to={Path.ADMIN}>Admin</Link>
        </li>
        <li>
          <Link to={Path.LOGIN}>Sign In</Link>
        </li>
      </ul>
    </>
  );
}
