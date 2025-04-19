/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import PropTypes from 'prop-types';

// @mui
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '@routes/paths';
import { dispatch } from '@redux/store';
import { postDebitAmountAsync, postCreditAsync } from '@redux/services';
import FormProvider, { RHFAutocomplete, RHFTextField } from '@components/hook-form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onReset: PropTypes.func,
};
export const USER_TABLE_DATA = [
  {
    userName: 'u123',
    email: 'player1@example.com',
    phoneNumber: '1234567890',
    twoFactorEnabled: 'false',
    createdAt: '01-03-2025',
  },
  {
    userName: 'u456',
    email: 'player2@example.com',
    phoneNumber: '9876543210',
    twoFactorEnabled: 'true',
    createdAt: '03-03-2025',
  },
  {
    userName: 'u789',
    email: 'player3@example.com',
    phoneNumber: '4567891230',
    twoFactorEnabled: 'false',
    createdAt: '03-03-2025',
  },
];
export default function UserTableRow({ row, selected, index, onReset }) {
  const { username, email, phoneNumber, twoFactorEnabled, balance } = row;

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [withdrawalOpen, setWithDrawalOpen] = useState(false);
  const [withdrawalType, setWithDrawalType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const amountOptions = process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION.split(',') : [];
  const sourceOptions = process.env.REACT_APP_SOURCE_OPTIONS
    ? process.env.REACT_APP_SOURCE_OPTIONS.split(',')
    : [];

  // ✅ Open Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // ✅ Close Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
    methods.reset();
    handleClose();
  };

  const handleWithdrawalDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
    methods.reset();
    handleClose();
  };

  const handleOpenWithdrawlDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
    methods.reset();
    handleClose();
  };

  const handleCloseDialog = () => {
    methods.reset();
    setDialogOpen(false);
  };

  const UserSchema = Yup.object().shape({
    amount: Yup.number().typeError('Amount must be a number').required('Amount is required'),
    currency: Yup.string().required('Currency is required'),
    source: Yup.string().required('Source is required'),
  });

  const defaultValues = useMemo(
    () => ({
      amount: '',
      currency: '',
      source: null,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('data :>> ', data);
      const payload = {
        ...data,
        emailId: row.email,
      };

      const action = (dialogType === 'Load Balance') ? postCreditAsync : postDebitAmountAsync;

      dispatch(action(payload)).then((res) => {
        setIsLoading(true);
        console.log('res :>> ', res);
        if (res?.payload) {
          setIsLoading(false);
          enqueueSnackbar('Data Updated Successfully', { variant: 'success' });
          handleCloseDialog();
          methods.reset();
          onReset?.();
        }else {
          setIsLoading(false);
        }
      }).catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDetailsClick = () => {
    navigate(PATH_DASHBOARD.user.userdetails(row?.userId));
    // navigate(PATH_DASHBOARD.user.userdetails);
  };

  // useEffect(() => {
  //   dispatch(getUserAmountAsync({}))
  // },[]);

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left">{index + 1}</TableCell> */}
      <TableCell align="left">{username}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {balance}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
        {phoneNumber || '-'}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {twoFactorEnabled ? 'Yes' : 'No'}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
      {
       decoded?.authorities === 'SUPERADMIN_READ' ? 
          <IconButton onClick={() => handleDetailsClick()}>
            <Icon icon="mi:user" width="24" height="24" />
          </IconButton>
        :
        decoded?.authorities === 'SUPERADMIN_OPERATOR' ? 
        <>
          <IconButton onClick={() => handleOpenDialog('Load Balance')}>
            <Icon icon="mdi:bank-plus" width="24" height="24" />
          </IconButton>
          <IconButton onClick={() => handleDetailsClick()}>
            <Icon icon="mi:user" width="24" height="24" />
          </IconButton>
        </>
        :
        <>
          <IconButton onClick={() => handleOpenDialog('Load Balance')}>
            <Icon icon="mdi:bank-plus" width="24" height="24" />
          </IconButton>
          <IconButton onClick={() => handleOpenWithdrawlDialog('Withdrawl')}>
            <Icon icon="mdi:credit-card-minus-outline" width="24" height="24" />
          </IconButton>
          <IconButton onClick={() => handleDetailsClick()}>
            <Icon icon="mi:user" width="24" height="24" />
          </IconButton>
        </>
      }
        {/* <IconButton onClick={() => handleOpenDialog('Load Balance')}>
          <Icon icon="mdi:bank-plus" width="24" height="24" />
        </IconButton>
        <IconButton onClick={() => handleOpenWithdrawlDialog('Withdrawl')}>
          <Icon icon="mdi:credit-card-minus-outline" width="24" height="24" />
        </IconButton>
        <IconButton onClick={() => handleDetailsClick()}>
          <Icon icon="mi:user" width="24" height="24" />
        </IconButton> */}
        {/* ✅ MUI Dialog for Load Balance / Withdrawal */}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>{dialogType}</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, flex: 1 }}>
                  <RHFTextField name="amount" placeholder="Amount" />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                    }}
                  >
                    <RHFAutocomplete
                      name="currency"
                      label="currency"
                      options={amountOptions || []}
                      // getOptionLabel={(option) => option?.runnerName || ''}
                      sx={{ flex: 1 }}
                    />

                    <RHFAutocomplete
                      name="source"
                      label="Source"
                      options={sourceOptions || []}
                      // getOptionLabel={(option) => option?.runnerName || ''}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              </DialogContent>

              <DialogActions>
                <Button disabled={isLoading} onClick={handleCloseDialog} variant="outlined">
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  variant="contained"
                >
                  Submit
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>

          {/* withdrawal dialog */}

          <Dialog open={withdrawalOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>{dialogType}</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                  <Controller
                    name="amount"
                    control={methods.control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="outlined"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                      flex: 1,
                    }}
                  >
                    <Controller
                      name="currency"
                      control={methods.control}
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          fullWidth
                          {...field}
                          options={amountOptions}
                          getOptionLabel={(option) => option}
                          onChange={(_, value) => field.onChange(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Currency"
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      )}
                    />

                    <Controller
                      name="source"
                      control={methods.control}
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          fullWidth
                          {...field}
                          options={sourceOptions}
                          getOptionLabel={(option) => option}
                          onChange={(_, value) => field.onChange(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Source"
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </DialogContent>

              <DialogActions>
                <Button disabled={isLoading} onClick={handleCloseDialog} variant="outlined">
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  variant="contained"
                >
                  Submit
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </FormProvider>
      </TableCell>
    </TableRow>
  );
}
