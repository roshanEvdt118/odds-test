import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getTransactionAsync = createAsyncThunk('transaction/getTransactionAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/transactions',
    method: 'get',
    params,
  })
);