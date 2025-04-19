import FormProvider, { RHFAutocomplete } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { processMatchWinnerAsync } from '@redux/services/playersBet';
import { getAllMatchStatusAsync, getRunnersAsync } from '@redux/services/matchStatus';
import { clearRunnerList } from '@redux/slices/matchStatus';

export default function MatchWinnerForm() {
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector((state) => state.playersBet);
  const { bet: matchData, runnerList } = useSelector((state) => state.matchStatus);

  const { enqueueSnackbar } = useSnackbar();

  const matchWinnerSchema = Yup.object({
    matchId: Yup.mixed().required('Match Id is required'),
    runnerId: Yup.mixed().required('Runner Id is required'),
  });

  const defaultValues = useMemo(
    () => ({
      matchId: null,
      runnerId: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(matchWinnerSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch, setValue } = methods;

  const match = watch('matchId');

  const onSubmit = async (data) => {
    console.log('data', data);
    // console.log('marketId', data?.marketId?.value);
    // const selectedMarketId = data?.marketId?.marketId

    const payload = {
      eventId: data?.matchId?.eventId,
      runnerId: String(data.runnerId?.selectionId),
    };
    try {
      const response = await dispatch(processMatchWinnerAsync(payload));

      // eslint-disable-next-line radix
      if (parseInt(response.payload?.responseCode) === 200) {
        enqueueSnackbar(response.payload?.body, { autoHideDuration: 5000 });
        reset();
        dispatch(getAllMatchStatusAsync());
        clearRunnerList()
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to update match winner!', { variant: 'error' });
      console.error(error);
    }
  };

  useEffect(() => {
    // dispatch(getAllMarketStatusAsync({}));
    dispatch(getAllMatchStatusAsync());
  }, [dispatch]);

//   const marketOptions = bet.map((item) => ({
//     label: `${item.marketId}`,
//     marketId: item.marketId,
//   }));

  useEffect(() => {
    if (match?.eventId) {
      dispatch(getRunnersAsync(match?.eventId ));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Card sx={{ p: 3, width: '100%' }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFAutocomplete
              name="matchId"
              label="Match Id"
              options={matchData}
              getOptionLabel={(option) => option?.eventName || ''}
              isOptionEqualToValue={(option, value) => option.eventId === value.eventId}
              onChange = {(_, newValue) => {
                setValue('matchId', newValue);
                setValue('runnerId', null);
              }}
            />

            <RHFAutocomplete
              name="runnerId"
              label="Runner Id"
              options={runnerList || []}
              getOptionLabel={(option) => option?.runnerName || ''}
            />

          </Box>
          <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
