import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getUsersAsync = createAsyncThunk('users/getUsersAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/get-player-by-adminId',
    method: 'get',
    params,
  })
);

export const addUserAsync = createAsyncThunk('users/addUsersAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/create-player',
    method: 'post',
    data,
  })
);

// get user Amount //

export const postCreditAsync = createAsyncThunk('usersAmount/admin/payment/credit', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/payment/credit',
    method: 'post',
    data,
  })
);

// get user Withdrawal //
export const postDebitAmountAsync = createAsyncThunk('usersDebit/admin/payment/debit', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/payment/debit',
    method: 'post',
    data,
  })
);



export const getUsersDetailsByIdAsync = createAsyncThunk('users/getUsersDetailsByIdAsync', async (id, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/profile/${id}`,
    method: 'get',
  })
);