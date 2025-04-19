/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {
  TableHeadCustom,
  TableNoData,
  useTable,
} from '@components/table';
import { formatDate } from '@utils/formatTime';

const TABLE_HEAD = [
  { id: "serialno", label: "S.No.", align: "left" },
  { id: "event", label: "Event", align: "left" },
  { id: 'selected', label: 'Selected', align: 'left' },
  { id: 'odds', label: 'Odds', align: 'left' },
  { id: 'stake', label: 'Stake', align: 'left' },
  { id: 'potentialWin', label: 'potentialWin', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'placedAt', label: 'Placed At', align: 'left' },
  { id: 'betType', label: 'Bet Type', align: 'left' },
];

export default function SportsTable({ data }) {
  const {
    dense,
    order,
    orderBy,
  } = useTable();

  return (
    <Card>
      <Typography variant='h4' sx={{ p: 2 }}>Sports</Typography>
      <TableContainer sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Table stickyHeader size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
          />
          <TableBody>
            {data?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {row?.event}
                </TableCell>
                <TableCell align="left">{row?.selected}</TableCell>
                <TableCell align="left">{row?.odds}</TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {row?.stake}
                </TableCell>
                <TableCell align="left">{row?.potentialWin}</TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {row?.status}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {formatDate(row?.placedAt)}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {row?.betType}
                </TableCell>
              </TableRow>
            ))}
            {(!data || data.length === 0) && <TableNoData isNotFound />}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}