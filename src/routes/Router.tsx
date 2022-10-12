import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// General pages
const LandingPage = lazy(() => import('./LangindPage'));
const SignInPage = lazy(() => import('./auth/SignInPage'));

// TV related pages
const VideoIdlePage = lazy(() => import('./tv/VideoIdlePage'));
const SignUpPage = lazy(() => import('./tv/SignUpPage'));
const CountdownPage = lazy(() => import('./tv/CountdownPage'));
const BuildQuotePage = lazy(() => import('./tv/BuildQuotePage'));
const RankingsPage = lazy(() => import('./tv/RankingsPage'));

// IPad related pages
const AttemptsPage = lazy(() => import('./ipad/AttemptsPage'));
const RegistrationPage = lazy(() => import('./ipad/RegistrationPage'));

export enum Paths {
  FOUR_O_FOUR = '*',
  LANDING_PAGE = '/',

  SIGN_IN = '/auth/sign_in',

  VIDEO = '/tv/idle',
  SIGN_UP = '/tv/sign_up',
  COUNTDOWN = '/tv/countdown',
  BUILD_QUOTE = '/tv/build_quote',
  RANKINGS = '/tv/rankings',

  ATTEMPS = '/ipad/attempts',
  REGISTRATION = '/ipad/registration',
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
            <SignInPage />
          </Suspense>
        }
      />

      <Route
        path={Paths.VIDEO}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <VideoIdlePage />
          </Suspense>
        }
      />
      <Route
        path={Paths.SIGN_UP}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <SignUpPage />
          </Suspense>
        }
      />
      <Route
        path={Paths.COUNTDOWN}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <CountdownPage />
          </Suspense>
        }
      />
      <Route
        path={Paths.BUILD_QUOTE}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <BuildQuotePage />
          </Suspense>
        }
      />
      <Route
        path={Paths.RANKINGS}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <RankingsPage />
          </Suspense>
        }
      />

      <Route
        path={Paths.ATTEMPS}
        element={
          <Suspense>
            <AttemptsPage />
          </Suspense>
        }
      />
      <Route
        path={Paths.REGISTRATION}
        element={
          <Suspense>
            <RegistrationPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
