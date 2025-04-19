import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getTotalLossAsync = createAsyncThunk('admin/get-total-loss', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/get-total-loss',
    method: 'get',
    params,
  })
);