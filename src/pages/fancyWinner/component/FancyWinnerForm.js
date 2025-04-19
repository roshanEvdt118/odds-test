import FormProvider, { RHFAutocomplete, RHFTextField } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { getAllMarketStatusAsync } from '@redux/services/marketStatus';
import { getAllMatchStatusAsync, getFancyRunnersAsync } from '@redux/services/matchStatus';
import { postFancyWinnerAsync } from '@redux/services/playersBet';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';


export default function FancyWinnerForm() {
    const dispatch = useDispatch();

    const { isSubmitting } = useSelector((state) => state.playersBet)
    const { bet } = useSelector((state) => state.marketStatus);
    const { runnerData, bet: matchData, } = useSelector((state) => state.matchStatus);
    

    const { enqueueSnackbar } = useSnackbar();

    const fancyWinnerSchema = Yup.object().shape({
        matchId: Yup.mixed().required('Match Id is required'),      
        runnerId: Yup.mixed().required('Runner Id is required'),
        runs: Yup.string().required('Runs is required'),
      });

    const defaultValues = useMemo(
        () => ({
            matchId: null,
            runnerId: null,
            runs: '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const methods = useForm({
        resolver: yupResolver(fancyWinnerSchema),
        defaultValues,
    });

    const { reset, handleSubmit, watch } = methods;


    const match = watch("matchId")

console.log('match', match)
 


    const onSubmit = async (data) => {

        const payload ={
            eventId: data?.matchId?.eventId,
            runnerId: data.runnerId?.selectionId,
            runs: data.runs,
        }
        try {
            const response = await dispatch(postFancyWinnerAsync(payload));

            // eslint-disable-next-line radix
            if (parseInt(response.payload?.responseCode) === 200) {
                enqueueSnackbar(response.payload?.responseMessage, { autoHideDuration: 5000 });
                reset();
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong!');
            console.error(error);
        }
    };


      useEffect(() => {
        dispatch(getAllMatchStatusAsync());
      }, [dispatch]);


      useEffect(()=>{
        if (match?.eventId) {
            console.log('console',)
            dispatch(getFancyRunnersAsync({matchId:match?.eventId}));
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[match])


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
                        />
                        <RHFAutocomplete
                            name="runnerId"
                            label="Runner Id"
                            options={runnerData || []}
                            getOptionLabel={(option) => option?.runnerName || ''}
                        />
                        <RHFTextField name="runs" label="Runs" />
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
