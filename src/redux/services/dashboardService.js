import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getDashboardAsync = createAsyncThunk(
  'get/dashboard',
  async (params, toolkit) =>
    AxiosClient({
      toolkit,
      url: '/admin/dashboard',
      method: 'get',
      params,
    })
);
