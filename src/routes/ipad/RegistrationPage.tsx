import { AttemptEntry, database } from '../../service/firebase';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DigitalClock } from '../../components/DigitalClock';
import { Logger } from '../../service/logger';
import { Paths } from '../Router';
import { isDefined } from 'dirty-kitchen/lib/type_checks';
import { useMount } from '../../hooks/useMount';

const logger = new Logger('RegistrationPage');

function useViewModel() {
  const { state } = useLocation();

  const navigate = useNavigate();
  useMount(() => {
    if (!isDefined(state)) {
      logger.warn(
        'Attempted to enter registration page without any attempt in state. Pushing user to AttemptsPage',
      );
      navigate(Paths.ATTEMPS);
    }
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phonenumber: '',
    consent: false,
  });

  function inputHandler(event: ChangeEvent<HTMLInputElement>): void {
    const { id, value, checked, type } = event.target;
    setFormState({
      ...formState,
      [id]: type === 'checkbox' ? checked : value,
    });
  }

  function submitHandler(event: FormEvent): void {
    event.preventDefault();
    database
      .registerRun({
        ...state,
        ...formState,
      })
      .then(() => navigate(Paths.ATTEMPS));
  }

  return {
    data: {
      attempt: state as AttemptEntry,
    },
    handlers: {
      inputHandler,
      submitHandler,
    },
  };
}

function RegistrationPage(): JSX.Element {
  const {
    data: { attempt },
    handlers: { inputHandler, submitHandler },
  } = useViewModel();

  return (
    <>
      <h1>
        {attempt.username} -{' '}
        <DigitalClock time={attempt.finish - attempt.start} />
      </h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            onChange={inputHandler}
            required
          />
        </div>

        <div>
          <label htmlFor="phonenumber">Phone number</label>
          <input
            id="phonenumber"
            type="tel"
            placeholder="Your phone number"
            onChange={inputHandler}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Your e-mail"
            onChange={inputHandler}
            required
          />
        </div>

        <div>
          <input id="consent" type="checkbox" onChange={inputHandler} />
          <label htmlFor="consent">
            I wish to keep in contact with Itera through email
          </label>
        </div>

        <button type="submit">Register my score</button>
      </form>
    </>
  );
}

export default RegistrationPage;
