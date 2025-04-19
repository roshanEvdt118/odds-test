import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

// get all market status

export const getAllMarketStatusAsync = createAsyncThunk('marketStatus/getAllMarketStatusAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'api/market/getAll',
    method: 'get',
    params,
  })
);