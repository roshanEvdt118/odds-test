import {
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Tooltip,
} from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ConfirmDialog from '@components/confirm-dialog';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Iconify from '@components/iconify';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import { useSnackbar } from '@components/snackbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable
} from '@components/table';

import { getUsersAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';

import { UserTableRow, UserTableToolbar } from '../components';
import { USER_TABLE_DATA } from '../components/UserTableRow';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [

  { id: "userName.", label: "Username", align: "left" },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'walletbalance', label: 'Wallet Balance', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
  { id: 'twoFactorEnabled', label: 'Two Factor Enabled', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];


const size = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, size: Number(size) };

export default function UserListPage() {
  const {
    dense,
    order,
    orderBy,
    selected,
    setSelected,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
 
  const { users, totalCount } = useSelector((store) => store?.users);
  const dispatch = useDispatch();

  const [query, setQuery] = useState(DEFAULT_QUERY);


  const denseHeight = dense ? 52 : 72;
  const isNotFound = (!users.length && !!query?.name) || (!users.length && !!query?.role);

  
  const [filters, setFilters] = useState({
   
    userName: '',
  });


 
  const handleRowsPerPageChange = (event) => {
    const {value} = event.target;
    DEFAULT_QUERY.size = parseInt(value, 10);
    onChangeRowsPerPage(event);
    setQuery((p) => {
      p.page = 1;
      p.size = parseInt(value, 10);
      return { ...p };
    });

     const payload={page: 1, size: value,  ...filters}
    
        dispatch(getUsersAsync(payload));
  };


  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });

     const payload={page: newPage + 1, size: query.size,  ...filters}
    
        dispatch(getUsersAsync(payload));
  };

    const handleSearch = () => {
      // onSearch(filters); // call parent search handler
      setQuery({ page: 1, size:query?.size})
      const payload={page: 1, size: query.size, ...filters}
  
      dispatch(getUsersAsync(payload));
    };
  
    const handleReset = () => {
      const resetFilters = {  userName: '' };
      setFilters(resetFilters);
      setQuery({ page: 1, size:query?.size})
    
      const payload={page: 1, size: query.size,  ...resetFilters}
      dispatch(getUsersAsync(payload));
    };
  
    

  useEffect(() => {
    setSelected([]);
    const payload={page: query.page, size: query.size}
    dispatch(getUsersAsync(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ]);
console.log(users,'users')
  return (
    <>
      <Helmet>
        <title> User: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User Management List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          }
        />

        <Card>
        <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2, py: 3 }}
    >

      <TextField
        fullWidth
        size="small"
        value={filters?.userName}
        onChange={(event)=> setFilters((p) => ({ ...p, userName: event.target.value }))}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* {isFiltered && ( */}
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ height: 40 }}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        sx={{ height: 40 }}
        onClick={handleReset}
      >
        Reset
      </Button>
      {/* )} */}
    </Stack>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {users?.map((row, index) => (
                    <UserTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      onReset={handleReset}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={users?.length ? query.size - users.length : 0}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalCount}
            page={query.page - 1}
            rowsPerPage={query?.size}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[25, 50, 100]}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
