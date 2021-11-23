import { Route, Routes } from "react-router";

import { Home } from "../pages";
import { Overview } from "../pages/Overview";
import { Profile } from "../pages/Profile";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { Game } from "../pages/game/Game";
import { Countdown } from "../pages/game/Countdown";

export enum Path {
  HOME = "/",
  USER = "/profile",
  LEADERBOARD = "/leaderboard",

  GAME = "/game/timer",
  COUNTDOWN = "/game/countdown",

  REGISTRATION = "/auth/sign-up",
  LOGIN = "/auth/sign-in",
}

export function Router() {
  return (
    <Routes>
      <Route path={Path.HOME} element={<Home />} />
      <Route path={Path.USER} element={<Profile />} />
      <Route path={Path.LEADERBOARD} element={<Overview />} />

      <Route path={Path.GAME} element={<Game />} />
      <Route path={Path.COUNTDOWN} element={<Countdown />} />

      <Route path={Path.REGISTRATION} element={<SignUp />} />
      <Route path={Path.LOGIN} element={<SignIn />} />
    </Routes>
  );
}
