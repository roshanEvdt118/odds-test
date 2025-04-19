import LoadingScreen from '@components/loading-screen';
import { Suspense, lazy } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );


export const LoginPage = Loadable(lazy(() => import('@pages/auth/pages/LoginPage')));
export const Home = Loadable(lazy(() => import('@pages/home/Home')));

export const User = Loadable(lazy(() => import('@pages/users/pages/User')));
export const UserList = Loadable(lazy(() => import('@pages/users/pages/UserList')));
export const UserDetails = Loadable(lazy(() => import('@pages/users/pages/UserDetails')));

export const TotalWin = Loadable(lazy(() => import('@pages/totalwin/pages/TotalWin')));
export const TotalWinList = Loadable(lazy(() => import('@pages/totalwin/pages/MatchPayout')));

export const Admin = Loadable(lazy(() => import('@pages/admin/pages/Admin')));
export const AdminList = Loadable(lazy(() => import('@pages/admin/pages/AdminList')));

export const TotalLoss = Loadable(lazy(() => import('@pages/totalLoss/pages/TotalLoss')));
export const TotalLossList = Loadable(lazy(() => import('@pages/totalLoss/pages/FancyPayout')));

export const PlayersBet = Loadable(lazy(() => import('@pages/playersBet/pages/PlayersBet')));
export const PlayersBetList = Loadable(lazy(() => import('@pages/playersBet/pages/PlayersBetList')));

export const FancyWinner = Loadable(lazy(() => import('@pages/fancyWinner/pages/FancyWinner')));
export const MatchWinner = Loadable(lazy(() => import('@pages/matchWinner/pages/MatchWinner')));
export const MarketStatus = Loadable(lazy(() => import('@pages/marketStatus/pages/MarketStatus')));
export const MatchStatus = Loadable(lazy(() => import('@pages/matchStatus/pages/MatchStatus')));

export const TransactionList = Loadable(lazy(() => import('@pages/transaction/pages/TransactionList')));



export const Page404 = Loadable(lazy(() => import('@pages/Page404')));
