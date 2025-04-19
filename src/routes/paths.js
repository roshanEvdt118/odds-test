// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  main: {
    root: path(ROOTS_DASHBOARD, '/main'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/user/${id}/view`),
    userdetails:(id)=>  path(ROOTS_DASHBOARD, `/user/${id}/details`),
  },
  totalLoss: {
    root: path(ROOTS_DASHBOARD, '/totalloss'),
    list: path(ROOTS_DASHBOARD, '/totalloss/list'),
    new: path(ROOTS_DASHBOARD, '/totalloss/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/totalloss/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/totalloss/${id}/view`),
  },
  playersbet: {
    root: path(ROOTS_DASHBOARD, '/playersbet'),
    list: path(ROOTS_DASHBOARD, '/playersbet/list'),
    new: path(ROOTS_DASHBOARD, '/playersbet/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/playersbet/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/playersbet/${id}/view`),
  },
  TotalWin: {
    root: path(ROOTS_DASHBOARD, '/totalwin'),
    list: path(ROOTS_DASHBOARD, '/totalwin/list'),
    new: path(ROOTS_DASHBOARD, '/totalwin/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/totalwin/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/totalwin/${id}/view`),
  },
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    list: path(ROOTS_DASHBOARD, '/admin/list'),
    new: path(ROOTS_DASHBOARD, '/admin/new'),
    // edit: (id) => path(ROOTS_DASHBOARD, `/totalwin/${id}/edit`),
    // view: (id) => path(ROOTS_DASHBOARD, `/totalwin/${id}/view`),
  },
  matchWiner: {
    root: path(ROOTS_DASHBOARD, '/match-winner'),
  },
  fancyWiner: {
    root: path(ROOTS_DASHBOARD, '/fancy-winner'),
  },
  marketStatus: {
    root: path(ROOTS_DASHBOARD, '/market-status'),
  },
  matchStatus: {
    root: path(ROOTS_DASHBOARD, '/match-status'),
  },

  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction'),
    list: path(ROOTS_DASHBOARD, '/transaction/list'),
  }
};
