// src/redux/services.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const addAdminAsync = createAsyncThunk('admin/addAdminAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/admin/create-admin',
    method: 'post',
    data,
  })
);

export const getAllAdminAsync = createAsyncThunk('admin/get-all-admin', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/admin/get-all-admin?page=${params?.page}&size=${params?.limit}`,
    method: 'get',
  })
);


