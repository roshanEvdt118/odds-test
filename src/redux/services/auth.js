import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const signInAsync = createAsyncThunk('auth/signInAsync', async (data, toolkit) =>
    AxiosClient({
        toolkit,
        url: '/admin/login',
        method: 'post',
        data,
    })
);