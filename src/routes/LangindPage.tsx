import { Link, useNavigate } from 'react-router-dom';

import { Paths } from './Router';
import { auth } from '../service/firebase';
import { useUser } from '../components/Main';

function useViewModel() {
  const { user } = useUser();
  const navigate = useNavigate();

  function signOutUser() {
    auth.signOut().then(() => {
      navigate(Paths.SIGN_IN);
    });
  }

  return {
    handlers: {
      signOut: user !== null ? signOutUser : null,
    },
  };
}

function LandingPage(): JSX.Element {
  const {
    handlers: { signOut },
  } = useViewModel();

  return (
    <>
      <h1>Conference Stand Application</h1>
      <ul>
        {signOut === null && (
          <li>
            <Link to={Paths.SIGN_IN}>Sign In</Link>
          </li>
        )}
        {signOut && (
          <>
            <li>
              <Link to={Paths.VIDEO}>TV</Link>
            </li>
            <li>
              <Link to={Paths.ATTEMPS}>IPad</Link>
            </li>
            <li>
              <button type="button" onClick={signOut}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default LandingPage;
