import { Link, useNavigate } from 'react-router-dom';

import { FormEvent } from 'react';
import { Logger } from '../../service/logger';
import { Paths } from '../Router';

const logger = new Logger('SignUpPage');

function useViewModel() {
  const navigate = useNavigate();

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    if (username === null) {
      logger.error('Failed to extract username from sign up form');
      throw new Error('Failed to extract error from sign up form');
    }

    navigate(Paths.COUNTDOWN, {
      state: {
        username,
      },
    });
  }

  return {
    handlers: {
      submitHandler,
    },
  };
}

function SignUpPage(): JSX.Element {
  const {
    handlers: { submitHandler },
  } = useViewModel();

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" required />
        <button type="submit">Start Game</button>
      </form>
      <Link to={Paths.VIDEO}>Back</Link>
    </>
  );
}

export default SignUpPage;
