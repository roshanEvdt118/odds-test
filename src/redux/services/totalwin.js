import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getTotalWinAsync = createAsyncThunk('admin/get-total-win', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/get-total-win',
    method: 'get',
    params,
  })
);

// export const addUserAsync = createAsyncThunk('users/addUsersAsync', async (data, toolkit) =>
//   AxiosClient({
//     toolkit,
//     url: '/users',
//     method: 'post',
//     data,
//   })
// );

// export const updateUserAsync = createAsyncThunk(
//   'users/updateUsersAsync',
//   async ({ id, data }, toolkit) =>
//     AxiosClient({
//       toolkit,
//       url: `/users/${id}`,
//       method: 'put',
//       data,
//     })
// );

// export const deleteUserAsync = createAsyncThunk('users/updateUsersAsync', async (id, toolkit) =>
//   AxiosClient({
//     toolkit,
//     url: `/users/${id}`,
//     method: 'delete',
//   })
// );