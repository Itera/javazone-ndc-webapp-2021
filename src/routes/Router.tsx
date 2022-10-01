import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LandingPage = lazy(() => import('./LangindPage'));
const SignIn = lazy(() => import('./auth/SignIn'));

export enum Paths {
  FOUR_O_FOUR = '*',
  LANDING_PAGE = '/',

  SIGN_IN = '/auth/sign_in',
}

function LoadingIndicator(): JSX.Element {
  return <p role="alert">Loading...</p>;
}

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route
        path={Paths.FOUR_O_FOUR}
        element={<Navigate to={Paths.LANDING_PAGE} replace />}
      />
      <Route
        path={Paths.LANDING_PAGE}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <LandingPage />
          </Suspense>
        }
      />

      <Route
        path={Paths.SIGN_IN}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <SignIn />
          </Suspense>
        }
      />
    </Routes>
  );
}
