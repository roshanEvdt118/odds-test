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
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody
} from '@mui/material';
import { getAllMatchStatusAsync, getTotalFancyPayout } from '@redux/services/matchStatus';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

const data = [
  {
      "runnerId": "13",
      "runnerName": "10 over runs LSG(KKR vs LSG)adv",
      "odds": [
          {
              "odd": 95.0,
              "no": {
                  "win": {
                      "amount": 10000.0,
                      "totalPayout": 20000.0
                  },
                  "loss": {
                      "amount": 10000.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  },
                  "loss": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  }
              }
          }
      ]
  },
  {
      "runnerId": "31",
      "runnerName": "20 over runs LSG(KKR vs LSG)adv",
      "odds": [
          {
              "odd": 211.0,
              "no": {
                  "win": {
                      "amount": 10000.0,
                      "totalPayout": 20000.0
                  },
                  "loss": {
                      "amount": 10000.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 2000.0,
                      "totalPayout": 4000.0
                  },
                  "loss": {
                      "amount": 2000.0,
                      "totalPayout": 0.0
                  }
              }
          },
          {
              "odd": 209.0,
              "no": {
                  "win": {
                      "amount": 2111.0,
                      "totalPayout": 4222.0
                  },
                  "loss": {
                      "amount": 2111.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  },
                  "loss": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  }
              }
          }
      ]
  },
  {
      "runnerId": "21",
      "runnerName": "15 over runs LSG(KKR vs LSG)adv",
      "odds": [
          {
              "odd": 150.0,
              "no": {
                  "win": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  },
                  "loss": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 1000.0,
                      "totalPayout": 2000.0
                  },
                  "loss": {
                      "amount": 1000.0,
                      "totalPayout": 0.0
                  }
              }
          },
          {
              "odd": 147.0,
              "no": {
                  "win": {
                      "amount": 2000.0,
                      "totalPayout": 4000.0
                  },
                  "loss": {
                      "amount": 2000.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  },
                  "loss": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  }
              }
          },
          {
              "odd": 149.0,
              "no": {
                  "win": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  },
                  "loss": {
                      "amount": 0.0,
                      "totalPayout": 0.0
                  }
              },
              "yes": {
                  "win": {
                      "amount": 2000.0,
                      "totalPayout": 4000.0
                  },
                  "loss": {
                      "amount": 2000.0,
                      "totalPayout": 0.0
                  }
              }
          }
      ]
  }
]

const FancyPayout = () => {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();

  const { bet: matchData, totalFancyPayout: totalFancyPayoutData } = useSelector(
    (state) => state.matchStatus
  );

  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleChange = (newSelected) => {
    setSelectedMatch(newSelected);
      dispatch(getTotalFancyPayout({ matchId: newSelected.value }));
  };
  
  
    // Convert event JSON to label/value format
    const options = matchData?.map((event) => ({
      label: event.eventName,
      value: event.eventId,
    }));

  useEffect(() => {
    dispatch(getAllMatchStatusAsync({enabled:false}));
  }, [dispatch]);

  const handleTotalPayout = (eventId) => {
    // dispatch(getTotalFancyPayout({ matchId: "34109310" }));
    if(eventId){
        dispatch(getTotalFancyPayout({ matchId: eventId }));
    }
  };

  return (
    <>
      <Helmet>
        <title> Fancy Result: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Fancy Result"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Fancy Result' },
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
              handleTotalPayout(newValue?.eventId);
            }}
            options={matchData}
            size="small"
            getOptionLabel={(option) => option?.eventName || ''}
            isOptionEqualToValue={(option, value) => option.eventId === value.eventId}
            renderInput={(params) => <TextField {...params} label="Match Id" />}
          /> */}
          
          {/* <Autocomplete
      value={selectedMatch}
      onChange={(event, newValue) => setSelectedMatch(newValue)}
      options={filteredOptions}
      size="small"
      getOptionLabel={(option) => option?.eventName || ""}
      isOptionEqualToValue={(option, value) => option.eventId === value.eventId}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Match Id"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    /> */}

    <VirtualizedDropdown
        options={options}
        value={selectedMatch}
        onChange={handleChange}
        placeholder='Select Match'
      />
        </Box>

        <Grid container spacing={2} sx={{ p: 2 }}>
      {totalFancyPayoutData.length > 0 ? (
        totalFancyPayoutData.map((runner) => (
          <Grid item xs={12} sm={6} key={runner.runnerId}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {runner.runnerName}
                </Typography>

                {/* Table for Odd, Yes/No, and Total Payout */}
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Odd</strong></TableCell>
                        <TableCell><strong>Type</strong></TableCell>
                        <TableCell><strong>Amount</strong></TableCell>
                        <TableCell><strong>Win Payout</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {runner?.odds?.map((oddData, index) => (
                        <>
                          {/* YES Row */}
                          {
                            oddData?.yes?.totalAmount &&
                          <TableRow key={`${runner.runnerId}-${index}-yes`}>
                            <TableCell>{oddData.odd}</TableCell>
                            <TableCell style={{ color: "green", fontWeight: "bold" }}>YES</TableCell>
                            <TableCell>{oddData?.yes?.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>{oddData?.yes?.totalPayout.toFixed(2)}</TableCell>
                          </TableRow>
                          }

                          {/* NO Row */}
                          {
                            oddData?.no?.totalAmount &&
                          <TableRow key={`${runner.runnerId}-${index}-no`}>
                            <TableCell>{oddData.odd}</TableCell>
                            <TableCell style={{ color: "red", fontWeight: "bold" }}>NO</TableCell>
                            <TableCell>{oddData?.no?.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>{oddData?.no?.totalPayout.toFixed(2)}</TableCell>
                          </TableRow>
                          }
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} mt={2}>
          <Box sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
                No Data Found
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      )}
    </Grid>

        {/* <Grid container spacing={2} justifyContent='center' mt={2}>
          {
            totalFancyPayoutData.length >0 ?
            totalFancyPayoutData.map((runner, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {runner?.runnerName}
              </Typography>
              <Box mt={1}>
                <Typography variant="subtitle1" color="primary">
                  Lay:
                </Typography>
                <Typography variant="body2">
                  <strong>Win Amount:</strong> ₹{runner?.lay?.win?.amount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Payout (Win):</strong> ₹{runner?.lay?.win?.totalPayout.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Loss Amount:</strong> ₹{runner?.lay?.loss?.amount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Payout (Loss):</strong> ₹{runner?.lay?.loss?.totalPayout.toFixed(2)}
                </Typography>

                <Typography variant="subtitle1" color="secondary" mt={2}>
                  Back:
                </Typography>
                <Typography variant="body2">
                  <strong>Win Amount:</strong> ₹{runner?.back?.win?.amount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Payout (Win):</strong> ₹{runner?.back?.win?.totalPayout.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Loss Amount:</strong> ₹{runner?.back?.loss?.amount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Payout (Loss):</strong> ₹{runner?.back?.loss?.totalPayout.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
          ))
          : 
            <Grid item xs={12} mt={2}>
                <Box sx={{ p: 2,}} >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{textAlign: "center"}} >
                    No Data Found
                    </Typography>
                </CardContent>
                </Box>
            </Grid>
          }
        </Grid> */}
      </Container>
    </>
  );
};

export default FancyPayout;
