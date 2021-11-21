import { Fragment, useEffect } from 'react';

import { Path } from '../routes';
import { Timer } from '../features/timer/Timer';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/useUser';

export function User() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user === null) {
      navigate(Path.REGISTRATION);
    }
  }, [user, navigate]);

  if (user === null) {
    return <Fragment />;
  }

  return (
    <>
      <h1>Hello there {user?.displayName}</h1>
      <Timer user={user} />
    </>
  );
}
