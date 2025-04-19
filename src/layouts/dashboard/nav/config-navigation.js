// routes
import { PATH_DASHBOARD }from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  chatbot: icon('chatbot'),
  home: icon('home'),
  loss: icon('loss'),
  players: icon('players'),
  win: icon('win'),
  management: icon('management'),
  admin: icon('admin'),
  matchwinner: icon('matchwinner'),
  matchstatus: icon('matchstatus'),
  totalloss: icon('totalloss'),
  marketstatus: icon('marketstatus'),
  fancywinner: icon('fancywinner'),
};

const superAdminConfig = [
  {
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.main.root,
        icon: ICONS.management,
      },
      {
        title: 'User Management',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.management,
      },
      {
        title: 'Admin',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.admin,
      },
      {
        title: 'Players bet',
        path: PATH_DASHBOARD.playersbet.root,
        icon: ICONS.players
      },
      {
        title: 'Match Result',
        path: PATH_DASHBOARD.TotalWin.root,
        icon: ICONS.win
      },
      {
        title: 'Fancy Result',
        path: PATH_DASHBOARD.totalLoss.root,
        icon: ICONS.totalloss
      },
      {
        title: 'Match Winner',
        path: PATH_DASHBOARD.matchWiner.root,
        icon: ICONS.matchwinner
      },
      {
        title: 'Fancy Winner',
        path: PATH_DASHBOARD.fancyWiner.root,
        icon: ICONS.fancywinner
      },
      {
        title: 'Market Status',
        path: PATH_DASHBOARD.marketStatus.root,
        icon: ICONS.marketstatus
      },
      {
        title: 'Match Status',
        path: PATH_DASHBOARD.matchStatus.root,
        icon: ICONS.matchstatus
      },
      
      {
        title: 'Transaction',
        path: PATH_DASHBOARD.transaction.root,
        icon: ICONS.matchstatus
      },
    ],
  },
];


const NavConfig = [
  {
    items: [
      {
        title: 'User Management',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.management,
      },
    
      {
        title: 'Players bet',
        path: PATH_DASHBOARD.playersbet.root,
        icon: ICONS.players
      },
      {
        title: 'Match Result',
        path: PATH_DASHBOARD.TotalWin.root,
        icon: ICONS.win
      },
      {
        title: 'Fancy Result',
        path: PATH_DASHBOARD.totalLoss.root,
        icon: ICONS.totalloss
      },      
      {
        title: 'Transaction',
        path: PATH_DASHBOARD.transaction.root,
        icon: ICONS.matchstatus
      },
    ],
  },
];

export  {superAdminConfig, NavConfig};
