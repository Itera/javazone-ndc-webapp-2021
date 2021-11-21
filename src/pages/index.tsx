import { Link } from 'react-router-dom';
import { Path } from '../routes';

export function Home() {
  return (
    <>
      <h1>Navigation links</h1>
      <Link to={Path.LEADERBOARD}>Leaderboard</Link>
      <Link to={Path.REGISTRATION}>Registration</Link>
    </>
  );
}
