import { getDashboardAsync } from '@redux/services/dashboardService';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  alert: {
    type: '',
    message: '',
  },
  dashboardList: [],
  totalCount: 0,
};

const dashboardSlice = createSlice({
  name: 'Dashboard',
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
    // Get Dashboard ----------
    builder.addMatcher(isAnyOf(getDashboardAsync.pending), (state, { payload }) => {
      state.isLoading = true;
      state.dashboardList = [];
    });
    builder.addMatcher(isAnyOf(getDashboardAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        type: 'success',
        message: 'Data fetched successfully.',
      };
      state.totalCount = payload?.count;
      state.dashboardList = payload?.body;
    });
    builder.addMatcher(isAnyOf(getDashboardAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        type: 'error',
        message: 'Something went wrong.',
      };
      state.dashboardList = [];
    });
    // -------------
  },
});

export const { clearAlert } = dashboardSlice.actions;
export default dashboardSlice.reducer;
