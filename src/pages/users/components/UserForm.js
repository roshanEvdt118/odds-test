import FormProvider, { RHFTextField , RHFCheckbox } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { addUserAsync } from '@redux/services';
import { PATH_DASHBOARD } from '@routes/paths';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

UserForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserForm({ isEdit = false, isView = false, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      password: currentUser?.password || '',
      twoFactorEnabled: currentUser?.twoFactorEnabled ?? false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if ((isEdit && currentUser) || (isView && currentUser)) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, isView, currentUser]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
        twoFactorEnabled: !!data.twoFactorEnabled, // Convert to Boolean
      };
      
      await dispatch(addUserAsync(payload));
      reset();
      enqueueSnackbar('Create success!');
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
            {/* <RHFTextField disabled={isView} name="userid" label="UserId" /> */}
            <RHFTextField disabled={isView} name="userName" label="Username" />
            <RHFTextField disabled={isView} name="email" label="Email Address" />
            <RHFTextField disabled={isView} name="phone" label="Phone Number" />
            <RHFTextField disabled={isView} name="password" label="Password" />
            <RHFCheckbox disabled={isView} name="twoFactorEnabled" label="Two Factor Enabled" />
            {/* <RHFTextField disabled={isView} name="created" label="Created At" /> */}
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
                  {!isEdit ? 'Create User' : 'Save Changes'}
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
