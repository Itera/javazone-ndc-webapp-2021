import { Route, Routes } from 'react-router';

import { Home } from '../pages';
import { Leaderboard } from '../pages/leaderboard';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';
import { User } from '../pages/user';

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
      <Route path={Path.USER} element={<User />} />
      <Route path={Path.LEADERBOARD} element={<Leaderboard />} />

      <Route path={Path.REGISTRATION} element={<Register />} />
      <Route path={Path.LOGIN} element={<Login />} />
    </Routes>
  );
}
