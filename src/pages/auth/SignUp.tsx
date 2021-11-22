import { useEffect, useState } from 'react';

import { FirebaseError } from '@firebase/util';
import { Path } from '../../routes';
import { logEvent } from 'firebase/analytics';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../hooks/useAuth';
import { useFirebase } from '../../features/firebase/FirebaseProvider';
import { useNavigate } from 'react-router';

export function SignUp() {
  const { analytics } = useFirebase();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { addUser } = useAuth();
  const { callback, loading, error, result } = useAsync(addUser);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    logEvent(analytics, 'sign_up');
    callback(username, email);
  }

  useEffect(() => {
    if (result !== null) {
      navigate(Path.USER, { replace: true });
    }
  }, [navigate, result]);

  return (
    <>
      <h1>Registration</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Register
        </button>
        {error !== null && <p>{(error as FirebaseError).code}</p>}
      </form>
    </>
  );
}
