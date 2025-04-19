import React, { useEffect, useState } from 'react';

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

import { getTotalWinAsync } from '@redux/services/totalwin';
import { useDispatch, useSelector } from 'react-redux';

// import TotalWinTableToolbar from '../components/TotalWinTableToolbar';
import TotalWinTableRow, { TOTAL_WIN_TABLE_DATA } from '../components/TotalWinTableRow';
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
  { id: 'serialno.', label: 'S.No.', align: 'left', minWidth: 70 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 70 },
  { id: 'amount', label: 'Amount', align: 'left', minWidth: 70 },
  { id: 'payOut', label: 'Payout', align: 'left', minWidth: 70 },
  { id: 'type', label: 'Type', align: 'left', minWidth: 70 },
  { id: 'betStatus', label: 'Bet Status', align: 'left', minWidth: 120 },
  { id: 'odd', label: 'Odd', align: 'left', minWidth: 70 },
  { id: 'eventTypeName', label: 'Event Type Name', align: 'left', minWidth: 150 },
  { id: 'bettype', label: 'Bet Type', align: 'left', minWidth: 120 },
  { id: 'gameName', label: 'Game Name', align: 'left', minWidth: 120 },
  { id: 'currencyType', label: 'Currency Type', align: 'left', minWidth: 130 },
  { id: 'runnerName', label: 'Runner Name', align: 'left', minWidth: 130 },
  { id: 'runnerId', label: 'Runner Id', align: 'left', minWidth: 120 },
  { id: 'createdAt', label: 'Created At', align: 'left', minWidth: 120 },
  { id: 'settled', label: 'Setteled', align: 'left', minWidth: 120 },
];


const limit = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit),date : new Date().toISOString().split('T')[0] };

export default function TotalWinListPage() {
  const {
    dense,
    order,
    orderBy,
    // rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    // onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { totalWin, totalCount } = useSelector((store) => store?.totalWin);
 
  const dispatch = useDispatch();

  const [query, setQuery] = useState(DEFAULT_QUERY);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);

  const denseHeight = dense ? 52 : 72;
  const isNotFound = (!totalWin.length && !!query?.name) || (!totalWin.length && !!query?.role);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

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

  // const handleDeleteRow = async (row, closeModal) => {
  //   // API call to delete row.
  //   const response = await dispatch(deleteUserAsync(row?.id))
  //   // If API is success then only call below code.
  //   if (totalwin?.length === 1 && query?.page > 1) {
  //     setQuery((p) => {
  //       p.page -= 1;
  //       return { ...p };
  //     });
  //   } else {
  //     dispatch(gettotalwinAsync(query));
  //   }
  //   closeModal();
  //   enqueueSnackbar('Delete success!')
  // };

  // const handleDeleteRows = (selectedRows) => {
  //   // API call to delete row.

  //   // If API is success then call below code.
  //   setSelected([]);
  //   if (query?.page > 1) {
  //     if (selectedRows?.length === totalwin?.length) {
  //       setQuery((p) => {
  //         p.page -= 1;
  //         return { ...p };
  //       });
  //     } else if (totalwin?.length > selectedRows?.length) {
  //       dispatch(gettotalwinAsync(query));
  //     }
  //   } else {
  //     dispatch(gettotalwinAsync(query));
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
    navigate(PATH_DASHBOARD.TotalWin.edit(row?._id), { state: row });
  };

  const handleViewRow = (row) => {
    navigate(PATH_DASHBOARD.TotalWin.view(row?._id), { state: row });
  };

  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
  };

  useEffect(() => {
    setSelected([]);
    dispatch(getTotalWinAsync(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query]);

  return (
    <>
      <Helmet>
        <title> Match Result: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Match Result"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Match Result', href: PATH_DASHBOARD.TotalWin.list },
            { name: 'List' },
          ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     to={PATH_DASHBOARD.TotalWin.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="eva:plus-fill" />}
        //   >
        //     New Total Win
        //   </Button>
        // }
        />

        <Card>
          {/* <TotalWinTableToolbar
            isFiltered={isFiltered}
            filterName={query?.name ?? ''}
            filterRole={query?.role ?? ''}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={ }
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={totalWin?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  totalWin?.map((row) => row?._id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalWin?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {totalWin?.map((row, index) => (
                    <TotalWinTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      selected={selected.includes(row?._id)}
                      onSelectRow={() => onSelectRow(row?._id)}
                      // onDeleteRow={(closeModal) => handleDeleteRow(row, closeModal)}
                      onEditRow={() => handleEditRow(row)}
                      onViewRow={() => handleViewRow(row)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={totalWin?.length ? query.limit - totalWin.length : 0}
                  />

                  <TableNoData isNotFound={isNotFound} />
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

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows(selected);
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}


// const TotalWinList = () => (
//   <div>
//     hiii
//   </div>
// );

// export default TotalWinList