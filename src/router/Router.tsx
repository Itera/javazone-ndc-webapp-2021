import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LandingPage = lazy(() => import('./LangindPage'));

enum Paths {
  FOUR_O_FOUR = '*',
  LANDING_PAGE = '/',
}

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path={Paths.FOUR_O_FOUR} element={<h1>Nothing here...</h1>} />
      <Route
        path={Paths.LANDING_PAGE}
        element={
          <Suspense fallback={<p role="alert">Loading...</p>}>
            <LandingPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
