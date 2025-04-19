import { Navigate, useRoutes } from 'react-router-dom';

import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';

import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

import { PATH_AFTER_LOGIN } from '../config-global';

import { LoginPage, Page404, Home, UserList, User, TotalLossList, TotalLoss, PlayersBetList, PlayersBet, TotalWin, Admin, AdminList, FancyWinner, MatchWinner, MarketStatus, MatchStatus, UserDetails, TotalWinList, TransactionList } from './elements';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'main',
          element: <Home />,
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <User /> },
            { path: ':id/edit', element: <User /> },
            { path: ':id/view', element: <User /> },
            { path: ':id/details', element: <UserDetails /> },
          ],
        },
        {
          path: 'transaction',
          children: [
            { element: <Navigate to="/dashboard/transaction/list" replace />, index: true },
            { path: 'list', element: <TransactionList /> },
          ],
        },
        {
          path: 'totalloss',
          children: [
            { element: <Navigate to="/dashboard/totalloss/list" replace />, index: true },
            { path: 'list', element: <TotalLossList /> },
            { path: 'new', element: <TotalLoss /> },
            { path: ':id/edit', element: <TotalLoss /> },
            { path: ':id/view', element: <TotalLoss /> },
          ],
        },
        {
          path: 'playersbet',
          children: [
            { element: <Navigate to="/dashboard/playersbet/list" replace />, index: true },
            { path: 'list', element: <PlayersBetList /> },
            { path: 'new', element: <PlayersBet /> },
            { path: ':id/edit', element: <PlayersBet /> },
            { path: ':id/view', element: <PlayersBet /> },
          ],
        },
        {
          path: 'admin',
          children: [
            { element: <Navigate to="/dashboard/admin/list" replace />, index: true },
            { path: 'list', element: <AdminList /> },
            { path: 'new', element: <Admin /> },
            // { path: ':id/edit', element: <Admin /> },
            // { path: ':id/view', element: <Admin /> },
          ],
        },
        {
          path: 'totalwin',
          children: [
            { element: <Navigate to="/dashboard/totalwin/list" replace />, index: true },
            { path: 'list', element: <TotalWinList /> },
            { path: 'new', element: <TotalWin /> },
            { path: ':id/edit', element: <TotalWin /> },
            { path: ':id/view', element: <TotalWin /> },
          ],
        },
        { path: 'main', element: <Home />, index: true },
        { path: 'fancy-winner', element: <FancyWinner />, index: true },
        { path: 'match-winner', element: <MatchWinner />, index: true },
        { path: 'market-status', element: <MarketStatus />, index: true },
        { path: 'match-status', element: <MatchStatus />, index: true },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
