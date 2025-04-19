import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable
} from '@components/table';


import { useDispatch, useSelector } from 'react-redux';

import { getTransactionAsync } from '@redux/services/transaction';
import { TransactionTableRow } from '../components';


const TABLE_HEAD = [
  { id: "transactionId", label: "Transaction Id", align: "left" },
  { id: "usernname.", label: "User Name", align: "left" },
  { id: 'amount', label: 'Amount', align: 'left' },
  { id: 'currency', label: 'Currency', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
];


const size = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, size: Number(size) };

export default function TransactionList() {
  const {
    dense,
    order,
    orderBy,

    onChangeDense,

    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();


  const { transactions, totalCount } = useSelector((store) => store?.transactions);
  const dispatch = useDispatch();

  const [query, setQuery] = useState(DEFAULT_QUERY);


  const denseHeight = dense ? 52 : 72;
  const isNotFound = (!transactions.length && !!query?.name) || (!transactions.length && !!query?.role);

  const [filters, setFilters] = useState({
    status: '',
    type: '',
    username: '',
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    // onSearch(filters); // call parent search handler
    setQuery({ page: 1, size:query?.size})
    const payload={page: 1, size: query.size, ...filters}

    console.log('payload',payload)
    dispatch(getTransactionAsync(payload));
  };

  const handleReset = () => {
    const resetFilters = { status: '', type: '', username: '' };
    setFilters(resetFilters);
    setQuery({ page: 1, size:query?.size})
  
    const payload={page: 1, size: query.size,  ...resetFilters}
    dispatch(getTransactionAsync(payload));
  };

  
  const handleRowsPerPageChange = (event) => {
    const {value} = event.target;
    DEFAULT_QUERY.size = parseInt(value, 10);
    onChangeRowsPerPage(event);
    setQuery((p) => {
      p.page = 1;
      p.size = parseInt(value, 10);
      return { ...p, ...filters };
    });

    const payload={page: 1, size: value,  ...filters}

    dispatch(getTransactionAsync(payload));
  };


  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p, ...filters };
    });

    const payload={page: newPage + 1, size: query.size,  ...filters}

    dispatch(getTransactionAsync(payload));
  };


  useEffect(() => {
    const payload={page: query.page, size: query.size}
    dispatch(getTransactionAsync(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> User: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Transaction List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Transaction List' },
          ]}
        />

        <Card>
        <Grid container spacing={2} alignItems="center" p={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search"
            name="username"
            size='small'
            value={filters.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Transaction Status"
            name="status"
            size='small'
            select
            value={filters.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Cancel">Cancel</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Transaction Type"
            name="type"
            select
            size='small'
            value={filters.type}
            onChange={handleChange}
          >
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Debit">Debit</MenuItem>
          </TextField>
        </Grid>

      

        <Grid item xs={12} sm={3}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              // startIcon={<Search />}
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="error"
              // startIcon={<RestartAlt />}
              onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                />

                <TableBody>
                  {transactions?.map((row, index) => (
                    <TransactionTableRow
                      key={row._id}
                      row={row}
                      index={index}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={transactions?.length ? query.size - transactions.length : 0}
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
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
