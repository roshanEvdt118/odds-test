import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useNavigate } from 'react-router';
import { signInAsync } from '@redux/services/auth';
import { PATH_DASHBOARD } from '@routes/paths';
// components
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from '@components/snackbar';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {

  const dispatch = useDispatch();
  const{ isSubmitting } = useSelector((state)=>state.auth)

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    // email: 'ashish.kampani@kysz.tech',
    // password: 'sagar1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
     const response =  await dispatch(signInAsync(data));
     
     // eslint-disable-next-line radix
     if(parseInt(response.payload?.responseCode) === 200) {
       localStorage.setItem('token', response.payload.body.token)
       navigate(PATH_DASHBOARD.user.root)
       enqueueSnackbar(response.payload?.responseMessage);
     }
    } catch (error) {
      console.error(error);    
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link variant="body2" color="inherit" underline="always">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
          mt:3
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
