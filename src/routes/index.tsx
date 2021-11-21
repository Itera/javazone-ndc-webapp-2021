import { Route, Routes } from 'react-router';

import { Home } from '../pages';
import { Register } from '../pages/auth/register';
import { User } from '../pages/user';

export enum Path {
  HOME = '/',
  USER = '/user',
  REGISTRATION = '/auth/register',
}

export function Router() {
  return (
    <main>
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.REGISTRATION} element={<Register />} />
        <Route path={Path.USER} element={<User />} />
      </Routes>
    </main>
  );
}
