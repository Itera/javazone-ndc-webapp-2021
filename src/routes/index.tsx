import { Route, Routes } from 'react-router';

import { Home } from '../pages';
import { Leaderboard } from '../pages/leaderboard';
import { Register } from '../pages/auth/register';
import { User } from '../pages/user';

export enum Path {
  HOME = '/',
  USER = '/user',
  LEADERBOARD = '/leaderboard',

  REGISTRATION = '/auth/register',
}

export function Router() {
  return (
    <main>
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.USER} element={<User />} />
        <Route path={Path.LEADERBOARD} element={<Leaderboard />} />

        <Route path={Path.REGISTRATION} element={<Register />} />
      </Routes>
    </main>
  );
}
