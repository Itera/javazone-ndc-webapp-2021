import { FirebaseError } from '@firebase/util';
import { Path } from '../../routes';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { addUser } = useAuth();
  const { callback, loading, error } = useAsync(addUser);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    callback(username, email).then(() => navigate(Path.USER));
  }

  return (
    <>
      <h1>Registration</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
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
