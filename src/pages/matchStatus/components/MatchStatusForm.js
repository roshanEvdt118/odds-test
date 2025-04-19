import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, MenuItem, Typography, TextField } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateMatchStatusAsync } from '@redux/services/playersBet';
import { getAllMatchStatusAsync } from '@redux/services/matchStatus';
import VirtualizedDropdownForm from '@components/dropdown/VirtualizedDropdownForm';

export default function MatchStatusForm() {
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector((state) => state.playersBet);
  const { enqueueSnackbar } = useSnackbar();
  const { bet } = useSelector((state) => state.matchStatus);

  const matchStatusSchema = Yup.object().shape({
    matchId: Yup.object().required("Match Id is required")
      .shape({
        eventId: Yup.string().required('Match Id is required'),
        label: Yup.string().required('Match Id is required'),
      }),
    enabled: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      matchId: null,
      enabled: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    // resolver: yupResolver(matchStatusSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control } = methods;

  const onSubmit = async (data) => {
    const payload = {
      matchId: data.matchId.value,
      enabled: data?.enabled === 'true'
    };

    try {
      const response = await dispatch(updateMatchStatusAsync(payload));

      // eslint-disable-next-line radix
      if (parseInt(response.payload?.responseCode) === 200) {
        enqueueSnackbar(response.payload?.responseMessage || "Match status update successfully!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        });
        reset();
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to update match status!', { variant: 'error' });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllMatchStatusAsync({ enabled: false }));
  }, [dispatch]);



  // Convert event JSON to label/value format
  const options = bet?.map((event) => ({
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
            {/* <RHFAutocomplete name="matchId" label="Match Id" options={matchOptions} /> */}
            <Controller
              name="matchId"
              control={control}
              rules={{ required: "This is a required field." }}
              render={({ field: { value = [], onChange }, fieldState: { error } }) => (
                <Stack>
                  {/* <Typography variant='caption' color={error ? 'error' : '#2f2b3de6'} > Select Train Journey <span style={{ color: 'red' }}>*</span></Typography> */}
                  <VirtualizedDropdownForm placeholder='Match Id' error={error} onChange={onChange} value={value || []} options={options} />
                  {error && <Typography variant='caption' color='error' sx={{mt:'6px'}}> This is a required field.</Typography>}
                </Stack>
              )}
            />




            <Controller
              name="enabled"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  focused
                  label="Status"
                  variant="outlined"
                  color="error"
                  error={!!error}
                  helperText={error ? error.message : ""}

                  sx={{
                    mt: 3,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: error ? "red" : undefined, // red border
                      },
                      "&:hover fieldset": {
                        borderColor: error ? "red" : undefined,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: error ? "red" : undefined,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: error ? "red" : undefined,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: error ? "red" : undefined,
                    },
                  }}
                >
                  <MenuItem value="true">Enable</MenuItem>
                  <MenuItem value="false">Disable</MenuItem>
                </TextField>
              )}
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
