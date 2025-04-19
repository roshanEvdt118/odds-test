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

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
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
export default function UserTableRow({ row, selected, index }) {
  const { username, email, phoneNumber, twoFactorEnabled, balance, transactionId, transactionType, amount, transactionStatus, currencyType,
  } = row;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [withdrawalOpen, setWithDrawalOpen] = useState(false);
  const [withdrawalType, setWithDrawalType] = useState('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const amountOptions = ['INR', 'PKR', 'AED'];
  const sourceOptions = ['Cash - K 1111', 'Cash - D', 'Cash - T', 'Cash - P', 'Online - P', 'Online - I'];

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
      source: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('data :>> ', data);
      const payload = {
        ...data,
        emailId: row.email,
      };

      const action = dialogType === 'Load Balance'
      ? postCreditAsync
      : postDebitAmountAsync;
    
      dispatch(action(payload)).then((res) => {
        console.log('res :>> ', res);
        if (res?.payload) {
          enqueueSnackbar("Data Updated Successfully", { variant: 'success' });
          handleCloseDialog();
          methods.reset();
        }
      });

    } catch (error) {
      console.error(error);
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
      <TableCell align="left">{transactionId}</TableCell>
      <TableCell align="left">
        {username}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {amount}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {currencyType}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {transactionStatus || '-'}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {transactionType}
      </TableCell>
     
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>{dialogType}</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, 
                      flex: 1 }}>
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
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
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
                      flex: 1
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
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </FormProvider>
      
    </TableRow>
  );
}
