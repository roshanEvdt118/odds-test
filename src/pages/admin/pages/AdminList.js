import {
  Button,
  Card,
  Container,
  IconButton,
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
  useTable,
} from '@components/table';

import { deleteUserAsync, getUsersAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
// import { UserTableRow, UserTableToolbar } from '@pages/users/components';
import AdminTableRow from '@pages/admin/components/AdminTableRow';
import AdminForm from '@pages/admin/components/AdminForm';
import { getAllAdminAsync } from '@redux/services/admin';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S.No.', label: 'S.No.', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  // { id: 'createdat', label: 'Created At', align: 'left' },
];

const limit = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

export default function UserListPage() {
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

  const { isLoading, admin } = useSelector((store) => store?.admin);
  const dispatch = useDispatch();
  const count = admin.length;
  const [query, setQuery] = useState(DEFAULT_QUERY);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);

  const denseHeight = dense ? 52 : 72;
  // const isNotFound = (!users.length && !!query?.name) || (!users.length && !!query?.role);

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
  //   if (users?.length === 1 && query?.page > 1) {
  //     setQuery((p) => {
  //       p.page -= 1;
  //       return { ...p };
  //     });
  //   } else {
  //     dispatch(getUsersAsync(query));
  //   }
  //   closeModal();
  //   enqueueSnackbar('Delete success!')
  // };

  // const handleDeleteRows = (selectedRows) => {
  //   // API call to delete row.

  //   // If API is success then call below code.
  //   setSelected([]);
  //   if (query?.page > 1) {
  //     if (selectedRows?.length === users?.length) {
  //       setQuery((p) => {
  //         p.page -= 1;
  //         return { ...p };
  //       });
  //     } else if (users?.length > selectedRows?.length) {
  //       dispatch(getUsersAsync(query));
  //     }
  //   } else {
  //     dispatch(getUsersAsync(query));
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
    navigate(PATH_DASHBOARD.user.edit(row?.id), { state: row });
  };

  const handleViewRow = (row) => {
    navigate(PATH_DASHBOARD.user.view(row?.id), { state: row });
  };

  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
  };

  useEffect(() => {
    setSelected([]);
    dispatch(getAllAdminAsync(query));
  }, [dispatch, query, setSelected]);

  return (
    <>
      <Helmet>
        <title> Admin: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Admin List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Admin', href: PATH_DASHBOARD.admin.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.admin.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Admin
            </Button>
          }
      />

        <Card>
          {/* <UserTableToolbar
            isFiltered={isFiltered}
            filterName={query?.name ?? ''}
            filterRole={query?.role ?? ''}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer sx={{ position: 'relative', overflow: 'unset',}}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={admin?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {admin?.map((row, index) => (
                    <AdminTableRow key={row.id} row={row} index={index} query={query} />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    // emptyRows={users?.length ? query.limit - users.length : 0}
                  />

                  {/* <TableNoData isNotFound={isNotFound} /> */}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={count}
            page={query.page - 1}
            rowsPerPage={query?.limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
