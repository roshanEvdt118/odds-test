// src/redux/services.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getPlayersBetAsync = createAsyncThunk('playersBet/getPlayersBetAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/get-all-user-bets-by-admin',
    method: 'get',
    params
  })
);

export const processMatchWinnerAsync = createAsyncThunk('playersBet/processMatchWinnerAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/process-winners`,
    method: 'post',
    data
  })
);

export const postFancyWinnerAsync = createAsyncThunk('fancyWinner/postFancyWinnerAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/settle-bets',
    method: 'post',
    data
  })
);

export const updateMarketStatusAsync = createAsyncThunk('marketStatus/updateMarketStatusAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/is-enabled/market`,
    method: 'put',
    data
  })
);
export const updateMatchStatusAsync = createAsyncThunk('matchStatus/updateMatchStatusAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/is-enabled/match`,
    method: 'put',
    data
  })
);
