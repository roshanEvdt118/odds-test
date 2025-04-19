import { Box, Card, CardContent, Container, Grid, Tab, Tabs, Paper } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CasinoIcon from '@mui/icons-material/Casino';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArticleIcon from '@mui/icons-material/Article';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useTheme } from '@mui/material/styles';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getDashboardAsync } from '@redux/services/dashboardService';
import SvgColor from '../../components/svg-color';

export default function DashboardCard() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardList } = useSelector((store) => store.dashboard);
  const [range, setRange] = useState('all');

  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );

  const ICONS = {
    chatbot: icon('chatbot'),
    course: icon('course'),
    staff: icon('staff'),
    student: icon('student'),
    book: icon('book'),
    arrow: icon('arrow'),
    testDrive: icon('test_drive'),
  };

  useEffect(() => {
    dispatch(getDashboardAsync({ range }));
  }, [dispatch, range]);

  const handleCardClick = (row) => {
    const { path } = row;
    if (path) navigate(path);
  };

  const handleTabChange = (event, newValue) => {
    setRange(newValue);
  };

  const Dashboard_values = [
    {
      id: 1,
      icon: <ArticleIcon fontSize="large" />,
      title: 'Summary',
      titleColor: '#003768',
      bgColor: '#CAFDF5',
      details: [
        {
          label: 'New Registrations',
          value: dashboardList?.newRegistrations,
          icon: <HowToRegIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Credits Count',
          value: dashboardList?.totalCreditsCount,
          icon: <CreditCardIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Debits Count',
          value: dashboardList?.totalDebitsCount,
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Credits Amount',
          value: dashboardList?.totalCreditsAmount,
          icon: <CurrencyRupeeIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Debits Amount',
          value: dashboardList?.totalDebitsAmount,
          icon: <CurrencyRupeeIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Net Total',
          value: dashboardList?.netAmountTotal,
          icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />,
        },
      ],
    },
    {
      id: 2,
      icon: <CasinoIcon fontSize="large" />,
      title: 'Casino Bets',
      titleColor: '#7A4100',
      bgColor: '#FFF5CC',
      details: [
        {
          label: 'Total Bets Count',
          value: dashboardList?.casinoBets?.totalBetsCount,
          icon: <MonetizationOnIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Total Bets Amount',
          value: dashboardList?.casinoBets?.totalBetsAmount,
          icon: <CurrencyRupeeIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Net Amount',
          value: dashboardList?.casinoBets?.netAmount,
          icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />,
        },
      ],
    },
    {
      id: 3,
      icon: <SportsCricketIcon fontSize="large" />,
      title: 'Sports Bets',
      titleColor: '#009688',
      bgColor: '#D0F2FF',
      details: [
        {
          label: 'Total Bets Count',
          value: dashboardList?.sportsBets?.totalBetsCount,
          icon: <MonetizationOnIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Total Bets Amount',
          value: dashboardList?.sportsBets?.totalBetsAmount,
          icon: <CurrencyRupeeIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Wins Count',
          value: dashboardList?.sportsBets?.totalWinsCount,
          icon: <EmojiEventsIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Losses Count',
          value: dashboardList?.sportsBets?.totalLossesCount,
          icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50 }} />,
        },
        {
          label: 'Net Amount',
          value: dashboardList?.sportsBets?.netAmount,
          icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />,
        },
      ],
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Tabs instead of Dropdown */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs
          value={range}
          onChange={handleTabChange}
          aria-label="range tabs"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            margin:1,
            

            '& .MuiTab-root': {
              // Default background color for tabs
              backgroundColor: 'transparent',
              transition: 'background-color 0.3s ease', // Smooth transition
            },
            // '& .Mui-selected': {
            //   border:1

            // },
          }}
        >
          <Tab label="All" value="all" />
          <Tab label="Daily" value="daily" />
          <Tab label="Weekly" value="weekly" />
          <Tab label="Monthly" value="monthly" />
        </Tabs>
      </Box>

      <Grid container direction="column" spacing={2} mt={2}>
        {Dashboard_values?.map((values, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                backgroundColor: values.bgColor,
                cursor: 'pointer',
                minHeight: 400, // Increased height of the card
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => handleCardClick({ path: values.navigateLink })}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: values.titleColor,
                    fontSize: '30px',
                    fontWeight: 'bold',
                    mb: 4,
                  }}
                >
                  {values.icon}
                  <Box mt={1}>{values.title}</Box>
                </Box>

                <Grid container spacing={2}>
                  {values.details?.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper
                        elevation={2}
                        sx={{
                          backgroundColor: '#fff',
                          color: values.titleColor,
                          p: 3, // Increased padding
                          fontSize: '14px',
                          display: 'flex',
                          gap: 2, // Increased gap between icon and text
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 2,
                          minHeight: 120, // Increased height of inner card
                        }}
                      >
                        {item.icon && (
                          <Box sx={{ fontSize: 50, display: 'flex', alignItems: 'center' }}>
                            {React.cloneElement(item.icon, { sx: { fontSize: 50 } })}
                          </Box>
                        )}
                        <Box
                          sx={{
                            backgroundColor: '#fff',
                            color: values.titleColor,
                            fontSize: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            height: '100%',
                          }}
                        >
                          <strong>{item.label}</strong>
                          <span>{item.value ?? '—'}</span>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
