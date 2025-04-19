import { Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';

import { useParams } from 'react-router';

import { getUsersDetailsByIdAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
import CasinoTable from '../components/CasionoTable';
import TransactionTable from '../components/TransactionTable';
import SportsTable from '../components/SportsTable';

export default function UserDetails() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const { userDetails } = useSelector((store) => store?.users);
  const dispatch = useDispatch();

  const intervalRef = useRef(null); // used to store the interval ID

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!id) return;

    const fetchDetails = () => {
      dispatch(getUsersDetailsByIdAsync(id));
    };

    fetchDetails();

    intervalRef.current = setInterval(() => {
      fetchDetails();
    }, 30000); // 30 seconds

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [id, dispatch]);

  return (
    <>
      <Helmet>
        <title> User Details: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User List', href: PATH_DASHBOARD.user.list },
            { name: userDetails?.username },
          ]}
        />

        <Card sx={{ maxWidth: 500, borderRadius: 2, boxShadow: 3, mb: 5 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDetails?.username}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDetails?.email}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Balance
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDetails?.balance}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <SportsTable data={userDetails?.bets?.sports} />
        <CasinoTable data={userDetails?.bets?.casino} />
        <TransactionTable data={userDetails?.transactions} />
      </Container>
    </>
  );
}
