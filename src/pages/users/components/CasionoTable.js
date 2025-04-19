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
    { id: "game", label: "Game", align: "left" },
    { id: 'betAmount', label: 'Bet Amount', align: 'left' },
    { id: 'winAmount', label: 'Win Amount', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'playedAt', label: 'Played At', align: 'left' },
    { id: 'betType', label: 'Bet Type', align: 'left' },
  ];
  
  export default function CasinoTable({ data }) {
    const {
      dense,
      order,
      orderBy,
    } = useTable();
  
    return (
      <Card sx={{mt:5}}>
       <Typography variant='h4' sx={{p:2}}>Casino</Typography>
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
                    {row?.game}
                  </TableCell>
                  <TableCell align="left">{row?.betAmount}</TableCell>
                  <TableCell align="left">{row?.winAmount}</TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {row?.status}
                  </TableCell>
                  <TableCell align="left">{formatDate(row?.playedAt)}</TableCell>
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