import FormProvider, { RHFTextField } from '@components/hook-form';
import { useSnackbar } from '@components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { addAdminAsync } from '@redux/services/admin';
import { PATH_DASHBOARD } from '@routes/paths';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

AdminForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentAdmin: PropTypes.object,
};

export default function AdminForm({ isEdit = false, isView = false, currentAdmin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const AdminSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    creditLimit: Yup.string().required('Credit Limit is required'),
  });

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
      creditLimit: 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentAdmin]
  );

  const methods = useForm({
    resolver: yupResolver(AdminSchema),
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
  //     if ((isEdit && currentAdmin) || (isView && currentAdmin)) {
  //       reset(defaultValues);
  //     }
  //     if (!isEdit) {
  //       reset(defaultValues);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isEdit, isView, currentAdmin]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        creditLimit: data.creditLimit,
      };

      // Redux Action Dispatch
      await dispatch(addAdminAsync(payload));

      reset();
      enqueueSnackbar('Admin created successfully!');
      navigate(PATH_DASHBOARD.admin.list);
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
            <RHFTextField disabled={isView} name="email" label="Email" />
            <RHFTextField disabled={isView} name="password" label="Password" />
            <RHFTextField type='number' disabled={isView}  name="creditLimit" label="Credit Limit" />
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
                  {!isEdit ? 'Create Admin' : 'Save Changes'}
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
