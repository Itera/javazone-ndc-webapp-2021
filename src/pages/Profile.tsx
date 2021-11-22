import { Link } from 'react-router-dom';
import { Path } from '../routes';
import { Timer } from '../features/timer/Timer';
import { useUser } from '../hooks/useUser';

export function Profile() {
  const user = useUser();

  if (user === null) {
    return <Link to={Path.REGISTRATION} replace />;
  }

  return (
    <>
      <h1>Hello there {user.username}</h1>
      <Timer user={user} />
    </>
  );
}
