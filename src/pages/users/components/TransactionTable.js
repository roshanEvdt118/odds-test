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
  
  const TABLE_HEAD = [
    { id: "serialno", label: "S.No.", align: "left" },
    { id: "transactionId", label: "Transaction Id", align: "left" },
    { id: 'amount', label: 'Amount', align: 'left' },
    { id: 'currency', label: 'Currency', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'type', label: 'type', align: 'left' },
  ];
  
  export default function TransactionTable({ data }) {
    const {
      dense,
      order,
      orderBy,
    } = useTable();
  
    return (
      <Card sx={{mt:5}}>
      <Typography variant='h4' sx={{p:2}}>Transactions</Typography>
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
                    {row?.transactionId}
                  </TableCell>
                  <TableCell align="left">{row?.amount}</TableCell>
                  <TableCell align="left">{row?.currency}</TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {row?.status}
                  </TableCell>
                 
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {row?.type}
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