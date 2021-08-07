import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from 'components/Loader/Loader';
import PublicKeys from 'pages/PublicKeys';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Avatar = lazy(() => import('./pages/Avatar'));

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  AVATAR: '/avatar',
  PUBLIC_KEYS: '/public_keys',
};

const routes = (): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.LOGIN} component={Login} />
      <Route path={PATHS.AVATAR} component={Avatar} />
      <Route exact path={PATHS.PUBLIC_KEYS} component={PublicKeys} />
    </Switch>
  </Suspense>
);

export default routes;
