import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '@components/table';

import { getPlayersBetAsync } from '@redux/services/playersBet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatchStatusAsync } from '@redux/services/matchStatus';
import PlayersBetTableRow from '../components/PlayersBetTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'action', label: 'Action', align: 'left', width: 80 },
  // { id: 'S No.', label: 'S.No.', align: 'left', minWidth: 70 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 70 },
  { id: 'username', label: 'Username', align: 'left', minWidth: 70 },
  { id: 'amount', label: 'Amount', align: 'left', minWidth: 80 },
  { id: 'payOut', label: 'PayOut', align: 'left', minWidth: 80 },
  { id: 'type', label: 'Type', align: 'left', minWidth: 80 },
  { id: 'betStatus', label: 'Bet Status', align: 'left', minWidth: 120 },
  { id: 'odd', label: 'Odd', align: 'left', minWidth: 80 },
  { id: 'eventTypeName', label: 'Event Type Name', align: 'left', minWidth: 150 },
  { id: 'betType', label: 'Bet Type', align: 'left', minWidth: 100 },
  { id: 'gameName', label: 'Game Name', align: 'left', minWidth: 120 },
  { id: 'currencyType', label: 'Currency Type', align: 'left', minWidth: 150 },
  { id: 'runnerName', label: 'Runner Name', align: 'left', minWidth: 130 },
  { id: 'runnerId', label: 'Runner Id', align: 'left', minWidth: 100 },
  { id: 'createdAt', label: 'CreatedAt', align: 'left', minWidth: 80 },
  { id: 'settled', label: 'Settled', align: 'left', minWidth: 80 },
];

const size = localStorage.getItem('table-rows-per-page') ?? 10;
const DEFAULT_QUERY = { page: 1, size: Number(size) };

export default function PlayersBetListPage() {
  const {
    dense,
    order,
    orderBy,
    selected,
    setSelected,
    onSelectRow,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const { isLoading, playersBet, count } = useSelector((store) => store?.playersBet);
  const { bet } = useSelector((store) => store?.matchStatus);

  const dispatch = useDispatch();

  const [query, setQuery] = useState(DEFAULT_QUERY);

  const [isFiltered, setIsFiltered] = useState(false);

  const [filter, setFilter] = useState({ ...DEFAULT_QUERY });

  const options = ['Loss', 'WIN', 'PENDING'];

  const denseHeight = dense ? 52 : 72;

  const handleFilterMatch = (event) => {
    setFilter((p) => ({
      ...p,
      page: 1,
      eventId: event?.eventId || '', // assuming eventId is in object
    }));
  };

  const handleFilterBetStatus = (event) => {
    setFilter((p) => ({
      ...p,
      page: 1,
      status: event || '', // assuming eventId is in object
    }));
  };

  const handleRowsPerPageChange = (event) => {
    const value = event.target.value;
    DEFAULT_QUERY.size = parseInt(value, 10);
    onChangeRowsPerPage(event);
    setQuery((p) => {
      p.page = 1;
      p.size = parseInt(value, 10);
      return { ...p };
    });
  };

  const handleSearch = () => {
    setQuery((p) => ({
      ...DEFAULT_QUERY,
      ...p,
      ...filter,
    }));
    setIsFiltered(true);
  };

  const handleResetFilter = () => {
    setQuery((p) => ({
      ...DEFAULT_QUERY,
      ...p,
      eventId: null,
      status: null,
    }));
    setFilter((p) => ({
      ...DEFAULT_QUERY,
      ...p,
      eventId: null,
      status: null,
    }));
    setIsFiltered(false);
  };

  const handleEditRow = (row) => {
    navigate(PATH_DASHBOARD.playersBet.edit(row?._id), { state: row });
  };

  const handleViewRow = (row) => {
    navigate(PATH_DASHBOARD.playersBet.view(row?._id), { state: row });
  };

  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
  };

  console.log('query :>> ', query);
  useEffect(() => {
    const payload={page: query.page, size: query.size, ...query}
    setSelected([]);
    dispatch(getPlayersBetAsync(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(getAllMatchStatusAsync({ enabled: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  return (
    <>
      <Helmet>
        <title> Players Bet: List | ODDS </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Players Bet"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Players Bet', href: PATH_DASHBOARD.playersbet.list },
            { name: 'List' },
          ]}
        />

        <Card sx={{  }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,px: 2, py: 2 }}>
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              options={bet}
              getOptionLabel={(option) => option?.eventName || ''}
              onChange={(event, newValue) => handleFilterMatch(newValue)}
              value={bet.find((item) => item.eventId === filter.eventId) || null}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Match Status" />}
            />
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              options={options}
              value={options.find((item) => item === filter.status) || null}
              onChange={(event, newValue) => handleFilterBetStatus(newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Bet Status" />}
            />
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
              onClick={handleResetFilter}
            >
              Reset
            </Button>
          </Box>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={playersBet?.length}
                />

                <TableBody>
                  {playersBet?.map((row, index) => (
                    <PlayersBetTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      query={query}
                      selected={selected.includes(row?._id)}
                      onSelectRow={() => onSelectRow(row?._id)}
                      onEditRow={() => handleEditRow(row)}
                      onViewRow={() => handleViewRow(row)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                  />

                  <TableNoData isNotFound={!isLoading && playersBet?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={count}
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
