import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import { useSnackbar } from '@components/snackbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,

  useTable
} from '@components/table';

// import { deleteUserAsync, getUsersAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';

import { getTotalLossAsync } from '@redux/services/totalLoss';
import TotalLossTableRow from '../components/TotalLossTableRow';

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
  // { id: 'action', label: 'Action', align: 'left', width: 80 },
  { id: 'S No.', label: 'S.No.', align: 'left', minWidth: 80 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 80 },
  { id: 'amount', label: 'Amount', align: 'left', minWidth: 80 },
  { id: 'payOut', label: 'PayOut', align: 'left', minWidth: 80 },
  { id: 'type', label: 'Type', align: 'left', minWidth: 80 },
  { id: 'betStatus', label: 'Bet Status', align: 'left', minWidth: 120 },
  { id: 'odd', label: 'Odd', align: 'left', minWidth: 80 },
  { id: 'eventTypeName', label: 'Event Type Name', align: 'left', minWidth: 150 },
  { id: 'betType', label: 'Bet Type', align: 'left', minWidth: 100 },
  { id: 'gameName', label: 'Game Name', align: 'left', minWidth: 120 },
  { id: 'currencyType', label: 'Currency Type', align: 'left', minWidth: 130 },
  { id: 'runnerName', label: 'Runner Name', align: 'left', minWidth: 130 },
  { id: 'runnerId', label: 'RunnerId', align: 'left', minWidth: 130 },
  { id: 'createdAt', label: 'CreatedAt', align: 'left', minWidth: 130 },
  { id: 'settled', label: 'Settled', align: 'left', minWidth: 100 },
];

// const totalLoss = [
//   {
//     id: 110,
//     amount: 600.00,
//     payOut: 0.00,
//     type: "debit",
//     betStatus: "LOSS",
//     odd: 2.0,
//     eventTypeName: "Tennis",
//     betType: "Single",
//     gameName: "ATP Finals",
//     currencyType: "USD",
//     runnerName: "Player X",
//     runnerId: "PX001",
//     createdAt: "2025-03-03T12:00:00",
//     settled: true
//   },
//   {
//     id: 111,
//     amount: 400.00,
//     payOut: 0.00,
//     type: "debit",
//     betStatus: "LOSS",
//     odd: 1.9,
//     eventTypeName: "Soccer",
//     betType: "Double",
//     gameName: "Champions League",
//     currencyType: "USD",
//     runnerName: "Team Y",
//     runnerId: "TY002",
//     createdAt: "2025-03-03T12:30:00",
//     settled: true
//   }
// ];

const limit = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit),date : new Date().toISOString().split('T')[0]  };

export default function TotalLossListPage() {
  const {
    dense,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { totalLoss } = useSelector((store) => store?.totalLoss);
  const dispatch = useDispatch();
  const totalCount = totalLoss?.length;

  const [query, setQuery] = useState(DEFAULT_QUERY);

  const [ setIsFiltered] = useState(false);

  const denseHeight = dense ? 52 : 72;
  // const isNotFound = (!totalLoss.length && !!query?.name) || (!totalLoss.length && !!query?.role);


  const handleFilterName = (event) => {
    setIsFiltered(true);
    setQuery((p) => {
      p.page = 1;
      p.name = event?.target?.value;
      return { ...p };
    });
  };

  const handleFilterRole = (event) => {
    setIsFiltered(true);
    setQuery((p) => {
      p.page = 1;
      p.role = event?.target?.value;
      return { ...p };
    });
  };

  const handleDeleteRow = async (row, closeModal) => {
    // API call to delete row.
    // const response = await dispatch(deleteUserAsync(row?._id))
    // If API is success then only call below code.
    // if (totalLoss?.length === 1 && query?.page > 1) {
    //   setQuery((p) => {
    //     p.page -= 1;
    //     return { ...p };
    //   });
    // } else {
    //   // dispatch(getUsersAsync(query));
    // }
    closeModal();
    enqueueSnackbar('Delete success!')
  };

  // const handleDeleteRows = (selectedRows) => {
  //   // API call to delete row.

  //   // If API is success then call below code.
  //   setSelected([]);
  //   if (query?.page > 1) {
  //     // if (selectedRows?.length === totalLoss?.length) {
  //     //   setQuery((p) => {
  //     //     p.page -= 1;
  //     //     return { ...p };
  //     //   });
  //     // } else if (totalLoss?.length > selectedRows?.length) {
  //     //   // dispatch(getUsersAsync(query));
  //     // }
  //   } else {
  //     // dispatch(getUsersAsync(query));
  //   }
  //   handleCloseConfirm();
  // };

  const handleRowsPerPageChange = (event) => {
    const value = event.target.value;
    DEFAULT_QUERY.limit = parseInt(value, 10);
    onChangeRowsPerPage(event);
    setQuery((p) => {
      p.page = 1;
      p.limit = parseInt(value, 10);
      return { ...p };
    });
  };

  const handleResetFilter = () => {
    setQuery({ ...DEFAULT_QUERY });
    setIsFiltered(false);
  };

  const handleEditRow = (row) => {
    navigate(PATH_DASHBOARD.totalLoss.edit(row?._id), { state: row });
  };

  const handleViewRow = (row) => {
    navigate(PATH_DASHBOARD.totalLoss.view(row?._id), { state: row });
  };

  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
  };

  useEffect(() => {
    // setQuery((p) => {
    //   p.order = order;
    //   p.orderBy = orderBy;
    //   return { ...p };
    // });
    // set query to sort based on order
  }, [order, orderBy]);

  useEffect(() => {
    setSelected([]);
    dispatch(getTotalLossAsync(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query]);

  return (
    <>
      <Helmet>
        <title> Fancy Result: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Fancy Result"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Fancy Result', href: PATH_DASHBOARD.totalLoss.list },
            { name: 'List' },
          ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     to={PATH_DASHBOARD.totalLoss.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="eva:plus-fill" />}
        //   >
        //     New Total Loss
        //   </Button>
        // }
        />

        <Card>
          {/* <TotalLossTableToolbar
            isFiltered={isFiltered}
            filterName={query?.name ?? ''}
            filterRole={query?.role ?? ''}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalLoss?.length}
                // numSelected={selected.length}
                // onSort={onSort}
                // onSelectAllRows={(checked) =>
                //   onSelectAllRows(
                //     checked,
                //     // totalLoss?.map((row) => row?._id)
                //   )
                // }
                />

                <TableBody>
                  {totalLoss?.map((row, index) => (
                    <TotalLossTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      query={query}
                      selected={selected.includes(row?._id)}
                      onSelectRow={() => onSelectRow(row?._id)}
                      onDeleteRow={(closeModal) => handleDeleteRow(row, closeModal)}
                      onEditRow={() => handleEditRow(row)}
                      onViewRow={() => handleViewRow(row)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                  // emptyRows={totalLoss?.length ? query.limit - totalLoss.length : 0}
                  />

                  {/* <TableNoData isNotFound={isNotFound} /> */}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalCount}
            page={query.page - 1}
            rowsPerPage={query?.limit}
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
