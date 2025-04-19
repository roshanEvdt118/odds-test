import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import VirtualizedDropdown from '@components/dropdown/VirtualizedDropdown';
import { useSettingsContext } from '@components/settings';
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { getAllMatchStatusAsync, getTotalMatchPayout } from '@redux/services/matchStatus';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

const MatchPayout = () => {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();

  const { bet: matchData, totalPayout: totalPayoutData } = useSelector(
    (state) => state.matchStatus
  );

  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleChange = (newSelected) => {
    setSelectedMatch(newSelected);
    dispatch(getTotalMatchPayout({ matchId: newSelected.value }));
  };

  // Convert event JSON to label/value format
  const options = matchData?.map((event) => ({
    label: event.eventName,
    value: event.eventId,
  }));

  useEffect(() => {
    dispatch(getAllMatchStatusAsync({ enabled: false }));
  }, [dispatch]);

  // const handletotalPayout = (eventId) => {
  //   dispatch(getTotalMatchPayout({ matchId: eventId }));
  // };

  return (
    <>
      <Helmet>
        <title> Match Result: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Match Result"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Match Result', href: PATH_DASHBOARD.TotalWin.list },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.TotalWin.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     New Total Win
          //   </Button>
          // }
        />
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
          }}
        >
          {/* <Autocomplete
            value={selectedMatch}
            onChange={(event, newValue) => {
              setSelectedMatch(newValue);
              handletotalPayout(newValue?.eventId);
            }}
            options={matchData}
            size="small"
            getOptionLabel={(option) => option?.eventName || ''}
            isOptionEqualToValue={(option, value) => option.eventId === value.eventId}
            renderInput={(params) => <TextField {...params} label="Match Id" />}
          /> */}
          <VirtualizedDropdown
            options={options}
            value={selectedMatch}
            onChange={handleChange}
            placeholder="Select Match"
          />
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
          alignItems={{ xs: 'center', sm: 'center' }}
          mt={2}
        >
          {totalPayoutData?.length > 0 ? (
            totalPayoutData.map((team, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    color: '#675dd8',
                    backgroundColor: '#E3ECFF',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                      {team?.runnerName}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" align="center">
                          Amount
                        </Typography>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          {team?.amount?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" align="center">
                          Net
                        </Typography>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                        {(((totalPayoutData[0]?.amount ?? 0) + (totalPayoutData[1]?.amount ?? 0)) - (team?.win?.totalPayout ?? 0))?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          {/* {team?.win?.totalPayout?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} mt={2}>
              <Box sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" textAlign="center">
                    No Data Found
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default MatchPayout;
