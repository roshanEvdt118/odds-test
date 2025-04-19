// src/redux/slices/adminSlice.js
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addAdminAsync,
  deleteAdminAsync,
  getAdminAsync,
  getAdminByIdAsync,
  getAllAdminAsync,
  updateAdminAsync,
} from '@redux/services/admin';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  admin: [],
  adminById: {},
  count: 0,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAlert(state) {
      state.alert = {
        type: '',
        message: '',
      };
    },
  },
  extraReducers: (builder) => {
    // get all Admin
    builder.addMatcher(isAnyOf(getAllAdminAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getAllAdminAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.admin = payload?.body?.content;
    });
    builder.addMatcher(isAnyOf(getAllAdminAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // Add Admin By Id
    // builder.addMatcher(isAnyOf(addAdminAsync.pending), (state) => {
    //     state.isSubmitting = true;
    // });
    // builder.addMatcher(isAnyOf(addAdminAsync.fulfilled), (state) => {
    //     state.isSubmitting = false;
    // });
    // builder.addMatcher(isAnyOf(addAdminAsync.rejected), (state) => {
    //     state.isSubmitting = false;
    // });
  },
});

export default adminSlice.reducer;
