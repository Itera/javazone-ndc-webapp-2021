import { FormEvent, useEffect, useState } from 'react';

import { FirebaseError } from '@firebase/util';
import { Path } from '../../routes';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useAuth();
  const { callback, loading, error, result } = useAsync(signIn);

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    callback(email, password);
  }

  async function signOutHandler() {
    await signOut();
    navigate(Path.HOME);
  }

  useEffect(() => {
    if (result !== null) {
      navigate(Path.USER);
    }
  }, [navigate, result]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Sign In
        </button>
        <button type="button" onClick={signOutHandler}>
          Sign Out
        </button>

        {error !== null && <p>{(error as FirebaseError).code}</p>}
      </form>
    </>
  );
}
