import FormProvider, { RHFTextField } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// import { addUserAsync, updateUserAsync } from '@redux/services';
import { PATH_DASHBOARD } from '@routes/paths';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

TotalLossForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentTotalLoss: PropTypes.object,
};

export default function TotalLossForm({ isEdit = false, isView = false, currentTotalLoss }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    website: Yup.string().required('Website is required'),
    TotalLossname: Yup.string().required('TotalLossname is required'),
    company: Yup.object()
      .shape({
        name: Yup.string().required('Company name is required'),
      })
      .required('Company details are required'),
  });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentUser?.name || '',
//       email: currentUser?.email || '',
//       phone: currentUser?.phone || '',
//       website: currentUser?.website || '',
//       username: currentUser?.username || '',
//       company: currentUser?.company || {},
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [currentUser]
//   );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    // defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

//   useEffect(() => {
//     if ((isEdit && currentUser) || (isView && currentUser)) {
//       reset(defaultValues);
//     }
//     if (!isEdit) {
//       reset(defaultValues);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isEdit, isView, currentUser]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        // isEdit ? updateUserAsync({ id: currentUser?.id, data }) : addUserAsync(data)
      );
      // If response is a success -
      reset();
      enqueueSnackbar(isEdit ? 'Update success!' : 'Create success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      enqueueSnackbar('Something went wrong!');
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

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
            <RHFTextField disabled={isView} name="amount" label="Amount" />
            <RHFTextField disabled={isView} name="payOut" label="Pay Out" />
            <RHFTextField disabled={isView} name="type" label="Type" />
            <RHFTextField disabled={isView} name="betStatus" label="Bet Status" />
            <RHFTextField disabled={isView} name="odd" label="Odd" />
            <RHFTextField disabled={isView} name="eventTypeName" label="Event Type Name" />
            <RHFTextField disabled={isView} name="betType" label="Bet Type" />
            <RHFTextField disabled={isView} name="gameName" label="Game Name" />
            <RHFTextField disabled={isView} name="currencyType" label="Currency Type" />
            <RHFTextField disabled={isView} name="runnerName" label="Runner Name" />
            <RHFTextField disabled={isView} name="runnerId" label="Runner Id" />
          </Box>

          {isView ? (
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton onClick={handleBack} type="button" variant="contained">
                Back
              </LoadingButton>
            </Stack>
          ) : (
            <>
              <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Create Total Loss' : 'Save Changes'}
                </LoadingButton>

                {isEdit && (
                  <LoadingButton
                    onClick={handleBack}
                    type="button"
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </LoadingButton>
                )}
              </Stack>
            </>
          )}
        </Card>
      </Grid>
    </FormProvider>
  );
}
