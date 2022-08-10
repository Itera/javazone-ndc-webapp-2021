import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Countdown } from '../pages/game/Countdown';
import { Finish } from '../pages/game/Finish';
import { Game } from '../pages/game/Game';
import { Home } from '../pages';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { Unregistered } from '../features/firebase/Unregistered';
import { UserRegistration } from '../pages/game/UserRegistration';
import { VideoShow } from '../pages/game/VideoShow';
import { useEffect } from 'react';
import { useFirebase } from '../features/firebase/FirebaseProvider';

export enum Path {
  HOME = '/',
  USER = '/profile',
  UNREGISTERED = '/unregistered',

  VIDEOSHOW = '/game/videoshow',
  EXPLANATION = '/game/explanation',
  COUNTDOWN = '/game/countdown',
  GAME = '/game/timer',
  FINISH = '/game/finish',

  REGISTRATION = '/auth/sign-up',
  LOGIN = '/auth/sign-in',
}

function AuthenticationBlocker() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useFirebase();

  useEffect(() => {
    const isAuthenticated = auth.currentUser !== null;
    if (location.pathname !== Path.LOGIN && !isAuthenticated) {
      navigate(Path.LOGIN);
    }
  }, [location.pathname, auth, navigate]);

  return null;
}

export function Router() {
  return (
    <>
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.USER} element={<Profile />} />
        <Route path={Path.UNREGISTERED} element={<Unregistered />} />

        <Route path={Path.VIDEOSHOW} element={<VideoShow />} />
        <Route path={Path.EXPLANATION} element={<UserRegistration />} />
        <Route path={Path.COUNTDOWN} element={<Countdown />} />
        <Route path={Path.GAME} element={<Game />} />
        <Route path={Path.FINISH} element={<Finish />} />

        <Route path={Path.REGISTRATION} element={<SignUp />} />
        <Route path={Path.LOGIN} element={<SignIn />} />
      </Routes>
      <AuthenticationBlocker />
    </>
  );
}
