import { Fragment } from 'react';
import { Timer } from '../features/timer/Timer';
import { useUser } from '../hooks/useUser';

export function Profile() {
  const user = useUser();

  if (user === null) {
    return <Fragment />;
  }

  return (
    <>
      <h1>Hello there {user.username}</h1>
      <Timer user={user} />
    </>
  );
}
