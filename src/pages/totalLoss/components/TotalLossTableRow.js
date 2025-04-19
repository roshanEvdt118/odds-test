import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
    Button,
    MenuItem,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
// components
import ConfirmDialog from '@components/confirm-dialog';
import Iconify from '@components/iconify';
import MenuPopover from '@components/menu-popover';

// ----------------------------------------------------------------------

TotalLossRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onViewRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    query: PropTypes.object,
    index: PropTypes.number,
};

export default function TotalLossRow({ row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow, index, query, }) {
    const { id, amount, payOut, type, betStatus, odd, eventTypeName, betType, gameName, currencyType, runnerName, runnerId, createdAt, settled } = row;
    const { page, limit } = query || {};

    //   const { name: companyName } = company;

    const [openConfirm, setOpenConfirm] = useState(false);

    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    console.log(page, limit);

    return (
        <>
            <TableRow hover selected={selected}>
                {/* <TableCell>
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell> */}
                <TableCell>
                    <Typography variant="subtitle2" noWrap ml={1}>
                        {(page - 1) * limit + (index + 1)}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {id}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {amount}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {payOut}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {type}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {betStatus}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {odd}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {eventTypeName}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {betType}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {gameName}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'uppercase' }}>
                    {currencyType}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {runnerName}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {runnerId}
                </TableCell>
                <TableCell align="left">
                    {new Date(createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {settled ? 'Yes' : 'No'}
                </TableCell>
                {/* <TableCell align="right">
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell> */}
            </TableRow>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        onViewRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="carbon:view-filled" />
                    View
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onEditRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill" />
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="eva:trash-2-outline" />
                    Delete
                </MenuItem>
            </MenuPopover>

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
