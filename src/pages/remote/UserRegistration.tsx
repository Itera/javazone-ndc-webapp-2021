import { Link, useNavigate } from 'react-router-dom';
import { createRef, useRef, useState } from 'react';
import { push, update } from 'firebase/database';

import { Cube } from '../../features/game-screen/explanation/Cube';
import { Logger } from '../../features/logging/logger';
import { Path } from '../../routes';
import cubeOne from '../../statics/svgs/Kube1.svg';
import cubeThree from '../../statics/svgs/Kube3.svg';
import cubeTwo from '../../statics/svgs/Kube2.svg';
import { useDatabase } from '../../hooks/useDatabase';
import { useMount } from '../../hooks/useMount';

export function UserRegistration(): JSX.Element {
  const [logger] = useState(new Logger('UserRegistration'));
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const { unregistered } = useDatabase();
  async function clickHandler() {
    if (username.length !== 3) {
      return;
    }

    logger.trace('Starting new timer for user', username);
    const generatedKey = push(unregistered).key;

    if (generatedKey === null) {
      logger.error('Failed to generate new key');
      throw new Error('Failed to generate new key');
    }

    const now = Date.now();
    await update(unregistered, {
      [generatedKey]: {
        username,
        registrationTime: now,
      },
    });

    navigate(Path.ONGOING);
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  useMount(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  });

  return (
    <div
      className="column center-content"
      style={{
        padding: '24px 32px',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Your nickname:</h1>
      <div className="row" style={{ marginBottom: '8rem' }}>
        <Cube src={cubeOne} letter={username.slice(0, 1)} />
        <Cube src={cubeTwo} letter={username.slice(1, 2)} />
        <Cube src={cubeThree} letter={username.slice(2, 3)} />
      </div>
      <button onClick={clickHandler}>READY</button>
      <Link to={Path.EXPLANATION}>Back</Link>
      <input
        ref={inputRef}
        value={username}
        onChange={(event) => setUsername(event.target.value.slice(0, 3))}
        spellCheck={false}
        style={{
          fontSize: 75,
          width: '100vw',
          letterSpacing: 138,
          background: 'transparent',
          border: 'transparent',
          color: 'transparent',
          outline: 'none',
          position: 'absolute',
          top: '40vh',
          left: 0,
        }}
      />
    </div>
  );
}
