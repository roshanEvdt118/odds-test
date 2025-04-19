import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, MenuItem, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getAllMarketStatusAsync } from '@redux/services/marketStatus';
import { getAllMatchStatusAsync, getFancyRunnersAsync, patchMarketAsync } from '@redux/services/matchStatus';
import { updateMarketStatusAsync } from '@redux/services/playersBet';
import VirtualizedDropdownForm from '@components/dropdown/VirtualizedDropdownForm';

export default function MarketStatusForm() {
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector((state) => state.playersBet);
  // const { bet:marketOptions } = useSelector((state) => state.marketStatus);

  const { bet: matchOptions, runnerData, isUpdating } = useSelector((state) => state.matchStatus);

  const { enqueueSnackbar } = useSnackbar();

  const marketStatusSchema = Yup.object().shape({
    matchId: Yup.object().nullable().required('Match is required'),

    runnerId: Yup.array().min(1, 'Market ID is required').required('Market ID is required'),

    // enabled: Yup.string()
    //   .oneOf(['true', 'false'], 'Status is required')
    //   .required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      runnerId: [],
      marketId: [],
      matchId: null,
      // enabled: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(marketStatusSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch, setValue, control } = methods;

  const selectedMatch = watch('matchId');

  const onSubmit = async (data) => {
    console.log('data :>> ', data);
    const query = {
      matchId: data?.matchId?.value,
    }
    const payload = {
      runnerId: data.runnerId.map((item) => item?.selectionId)
      // enabled: data?.enabled === 'true',
    };
    console.log('payload :>> ', payload);
    try {
      const response = await dispatch(patchMarketAsync({ params: query?.matchId, data: payload?.runnerId }));

      // eslint-disable-next-line radix
      if (parseInt(response.payload?.responseCode) === 200) {
        enqueueSnackbar(response.payload?.responseMessage || 'Market status update successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        reset();
        setValue('matchId', null);
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to update market status!', { variant: 'error' });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllMarketStatusAsync({}));
    dispatch(getAllMatchStatusAsync({ enabled: false }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedMatch) {
      dispatch(getFancyRunnersAsync({ matchId: selectedMatch?.value, enabled: false }));
    }
  }, [dispatch, selectedMatch]);

  // Convert event JSON to label/value format
  const options = matchOptions?.map((event) => ({
    label: event.eventName,
    value: event.eventId,
  }));

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
            {/* <RHFAutocomplete
              name="matchId"
              label="Match Id"
              options={matchOptions || []}
              getOptionLabel={(option) => option?.eventName}
            /> */}

            <Controller
              name="matchId"
              control={control}
              rules={{ required: "This is a required field." }}
              render={({ field: { value = [], onChange }, fieldState: { error } }) => (
                <Stack>
                  {/* <Typography variant='caption' color={error ? 'error' : '#2f2b3de6'} > Select Train Journey <span style={{ color: 'red' }}>*</span></Typography> */}
                  <VirtualizedDropdownForm placeholder='Match Id' error={error} onChange={onChange} value={value || []} options={options} />
                  {error && <Typography variant='caption' color='error' sx={{ mt: '6px' }}> This is a required field.</Typography>}
                </Stack>
              )}
            />


            <RHFAutocomplete
              name="runnerId"
              label="Runner"
              multiple
              options={runnerData}
              sx={{ mt: 3 }}

              getOptionLabel={(option) => option?.runnerName}
            />
            {/* <RHFSelect name="enabled" label="Status">
              <MenuItem value="true">Enable</MenuItem>
              <MenuItem value="false">Disable</MenuItem>
            </RHFSelect> */}
          </Box>
          <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isUpdating}>
              Submit
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
