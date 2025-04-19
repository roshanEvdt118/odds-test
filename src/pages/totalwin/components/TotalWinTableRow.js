import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Button,
  TableCell,
  TableRow,
} from '@mui/material';
import ConfirmDialog from '@components/confirm-dialog';

TotalWinTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  index: PropTypes.number,
  onDeleteRow: PropTypes.func,
};
export const TOTAL_WIN_TABLE_DATA = [
  {
    id: 101,
    amount: 500.0,
    payOut: 800.0,
    type: 'credit',
    betStatus: 'WIN',
    odd: 1.8,
    eventTypeName: 'Soccer',
    bettype: 'Single',
    gameName: 'Premier League',
    currencyType: 'USD',
    runnerName: 'Team A',
    runnerId: 'TA001',
    createdAt: '2025-03-03T10:00:00',
    settled: 'Yes',
  },
  {
    id: 102,
    amount: 300.0,
    payOut: 450.0,
    type: 'credit',
    betStatus: 'WIN',
    odd: 1.5,
    eventTypeName: 'Soccer',
    bettype: 'Double',
    gameName: 'Premier League',
    currencyType: 'USD',
    runnerName: 'Team B',
    runnerId: 'TB001',
    createdAt: '2025-03-03T10:05:00',
    settled: 'No',
  },
];

export default function TotalWinTableRow({
  row,
  index,
  selected,
  onDeleteRow,
}) {
  const {
    id,
    amount,
    payOut,
    type,
    betStatus,
    odd,
    eventTypeName,
    bettype,
    gameName,
    currencyType,
    runnerName,
    runnerId,
    createdAt,
    settled,
  } = row;

  // const { name: companyName } = company;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{amount}</TableCell>
        <TableCell align="left">{payOut}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="left">{betStatus}</TableCell>
        <TableCell align="left">{odd}</TableCell>
        <TableCell align="left">{eventTypeName}</TableCell>
        <TableCell align="left">{bettype}</TableCell>
        <TableCell align="left">{gameName}</TableCell>
        <TableCell align="left">{currencyType}</TableCell>
        <TableCell align="left">{runnerName}</TableCell>
        <TableCell align="left">{runnerId}</TableCell>
        <TableCell align="left">{new Date(createdAt).toLocaleString()}</TableCell>
        <TableCell align="left">{settled}</TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => onDeleteRow(handleCloseConfirm)}>
            Delete
          </Button>
        }
      />
    </>
  );
}
