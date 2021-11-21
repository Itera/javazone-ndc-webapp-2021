import { Route, Routes } from 'react-router';

import { Home } from '../pages';
import { Overview } from '../pages/Overview';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';

export enum Path {
  HOME = '/',
  USER = '/user',
  LEADERBOARD = '/leaderboard',

  REGISTRATION = '/auth/register',
  LOGIN = '/auth/login',
}

export function Router() {
  return (
    <Routes>
      <Route path={Path.HOME} element={<Home />} />
      <Route path={Path.USER} element={<Profile />} />
      <Route path={Path.LEADERBOARD} element={<Overview />} />

      <Route path={Path.REGISTRATION} element={<SignUp />} />
      <Route path={Path.LOGIN} element={<SignIn />} />
    </Routes>
  );
}
