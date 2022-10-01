import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LandingPage = lazy(() => import('./LangindPage'));

enum Paths {
  FOUR_O_FOUR = '*',
  LANDING_PAGE = '/',
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
    </Routes>
  );
}
