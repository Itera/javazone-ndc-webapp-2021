import { FormEvent } from 'react';
import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const logger = new Logger('SignIn');

function useViewModel() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (email === null || password === null) {
      logger.error('Failed to extract form values');
      throw new Error('failed to extract form values');
    }

    signIn(email.toString(), password.toString()).then(() => {
      navigate(Paths.LANDING_PAGE);
    });
  }

  return {
    submitHandler,
  };
}

function SignIn() {
  const { submitHandler } = useViewModel();

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="email-field">Email</label>
        <input id="email-field" name="email" type="email" required />
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" required />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
