import { Route, Routes, useNavigate } from 'react-router';

import { Admin } from '../pages/admin';
import { Countdown } from '../pages/game/Countdown';
import { Finish } from '../pages/game/Finish';
import { Game } from '../pages/game/Game';
import { Home } from '../pages';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { Stats } from '../pages/admin/Stats';
import { Unregistered } from '../features/firebase/Unregistered';
import { UserRegistration } from '../pages/game/UserRegistration';
import { VideoShow } from '../pages/game/VideoShow';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useMount } from '../hooks/useMount';

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

  ADMIN = '/admin',
}

export function Router() {
  const { auth } = useFirebase();
  const navigate = useNavigate();

  useMount(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        navigate(Path.LOGIN);
      }
    });
  });

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

        <Route path={Path.ADMIN} element={<Admin />} />
        <Route path={`${Path.ADMIN}/:date`} element={<Stats />} />
      </Routes>
    </>
  );
}
