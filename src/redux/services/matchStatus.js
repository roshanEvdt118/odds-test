import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

// get all match status

export const getAllMatchStatusAsync = createAsyncThunk('matchStatus/getAllMatchStatusAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: `api/matches/getAll?enabled=${params?.enabled !== undefined ? params.enabled : true}`,
    method: 'get',
  })
);

// get total match result

export const getTotalMatchPayout = createAsyncThunk('matchPayout/getTotalMatchPayout', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'admin/get-total-payout-match',
    method: 'get',
    params,
  })
);


// get total fancy result

export const getTotalFancyPayout = createAsyncThunk('matchPayout/getTotalMatchPayout', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'admin/get-total-payout-fancy',
    method: 'get',
    params,
  })
);

export const getFancyRunnersAsync = createAsyncThunk('fancyrunners/ertyuyiul', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/get-fancy-runners?isEnabled=${params?.enabled !== undefined ? params.enabled : true}`,
    method: 'get',
    params
  })
);

export const patchMarketAsync = createAsyncThunk('fancyrunners/patchMarketAsync', async ({params, data}, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/enable-runners?matchId=${params}`,
    method: 'patch',
    data
  })
);

export const getRunnersAsync = createAsyncThunk('fancyrunners/getRunnersAsync', async ( params, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/get-runners-match?matchId=${params}`,
    method: 'get',
  })
);