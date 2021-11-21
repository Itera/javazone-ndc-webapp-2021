import { Fragment, useEffect, useState } from 'react';

import { Path } from '../routes';
import { Timer } from '../features/timer/Timer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/useUser';

export function Profile() {
  const user = useUser();
  const navigate = useNavigate();
  const { updateUsername } = useAuth();
  const [name, setName] = useState(user?.displayName ?? '');

  useEffect(() => {
    if (user === null) {
      navigate(Path.REGISTRATION);
    }
  }, [user, navigate]);

  if (user === null) {
    return <Fragment />;
  }

  function blurHandler() {
    if (name !== user?.displayName && name.length > 0) {
      updateUsername(name);
    }
  }

  return (
    <>
      <h1>Hello there {user.displayName}</h1>
      <input
        placeholder="username"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        onBlur={blurHandler}
      />
      <Timer user={user} />
    </>
  );
}
