import { Route, Routes, useNavigate } from 'react-router';

import { Admin } from '../pages/admin';
import { Countdown } from '../pages/game/Countdown';
import { Finish } from '../pages/game/Finish';
import { Game } from '../pages/game/Game';
import { Home } from '../pages';
import { Information } from '../pages/remote/Information';
import { Ongoing } from '../pages/remote/Ongoing';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { Stats } from '../pages/admin/Stats';
import { Unregistered } from '../features/firebase/Unregistered';
import { UserRegistration } from '../pages/remote/UserRegistration';
import { VideoShow } from '../pages/game/VideoShow';
import { Winner } from '../pages/admin/Winner';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useMount } from '../hooks/useMount';

export enum Path {
  HOME = '/',
  USER = '/profile',
  UNREGISTERED = '/unregistered',

  VIDEOSHOW = '/game/videoshow',
  COUNTDOWN = '/game/countdown',
  GAME = '/game/timer',
  FINISH = '/game/finish',

  EXPLANATION = '/remote/explanation',
  USER_REGISTRATION = '/remote/user_registration',
  ONGOING = '/remote/ongoing',

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
        <Route path={Path.COUNTDOWN} element={<Countdown />} />
        <Route path={Path.GAME} element={<Game />} />
        <Route path={Path.FINISH} element={<Finish />} />

        <Route path={Path.EXPLANATION} element={<Information />} />
        <Route path={Path.USER_REGISTRATION} element={<UserRegistration />} />
        <Route path={Path.ONGOING} element={<Ongoing />} />

        <Route path={Path.REGISTRATION} element={<SignUp />} />
        <Route path={Path.LOGIN} element={<SignIn />} />

        <Route path={Path.ADMIN} element={<Admin />} />
        <Route path={`${Path.ADMIN}/:date`} element={<Stats />} />
        <Route path={`${Path.ADMIN}/:date/winner`} element={<Winner />} />
      </Routes>
    </>
  );
}
