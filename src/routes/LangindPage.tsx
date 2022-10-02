import { Link, useNavigate } from 'react-router-dom';

import { Paths } from './Router';
import { useAuth } from '../service/firebase';

function useViewModel() {
  const navigate = useNavigate();
  const { signOut, authenticated } = useAuth();

  function signOutUser() {
    signOut().then(() => {
      navigate(Paths.SIGN_IN);
    });
  }

  return {
    handlers: {
      signOut: authenticated ? signOutUser : null,
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
