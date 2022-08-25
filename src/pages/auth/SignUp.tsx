import { child, remove } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router';

import { FirebaseError } from '@firebase/util';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Path } from '../../routes';
import { UnregisteredEntry } from '../../hooks/useUnregistered';
import { push } from '@firebase/database';
import { toTimeString } from '../../utils/toTimeString';
import { useDatabase } from '../../hooks/useDatabase';
import { useState } from 'react';

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const location = useLocation();
  const { uid, username, start, finish, elapsed } =
    location.state as UnregisteredEntry;

  const { daily, unregistered } = useDatabase();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FirebaseError | null>(null);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(() => true);
    setError(() => null);

    try {
      const documentRef = child(unregistered, `/${uid}`);
      await remove(documentRef);

      await push(daily, {
        start,
        finish,
        elapsed,
        name,
        username,
        phone,
        email,
        consent,
      });
      navigate(Path.USER, { replace: true });
    } catch (err) {
      setError(() => err as FirebaseError);
      setIsLoading(() => false);
    }
  }

  const [minutes, seconds, milliseconds] = toTimeString(start, finish).split(
    ':',
  );

  return (
    <div style={{ padding: '2rem 3rem' }}>
      <Logo />
      <Link
        to={Path.UNREGISTERED}
        style={{
          textDecoration: 'none',
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          fontSize: '2rem',
          color: 'black',
        }}
      >
        X
      </Link>
      <h1
        className="inset-dot"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#000',
          fontSize: '2.875rem',
        }}
      >
        <span>{username}</span>
        <span>
          <span>{minutes}:</span>
          <span>{seconds}:</span>
          <span style={{ fontSize: '2rem' }}>{milliseconds}</span>
        </span>
      </h1>
      <form onSubmit={submitHandler}>
        <div className="column">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            id="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
        </div>
        <div className="column">
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            placeholder="Your phone number"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
            required
          />
        </div>
        <div className="column">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(event) => setConsent(event.currentTarget.checked)}
          />
          <label htmlFor="consent">
            <span></span>I wish to keep in contact with Itera through email
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          Register my score
        </button>
        {error !== null && <p>{error.code}</p>}
      </form>
    </div>
  );
}
