import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTotalLossAsync } from '@redux/services/totalLoss';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  totalLoss: [],
  totalCount: 0,
};

const usersSlice = createSlice({
  name: 'totalLoss',
  initialState,
  reducers: {
    clearAlert(state) {
    },
  },
  extraReducers: (builder) => {
    // Get All Users Total Loss ----------
    builder.addMatcher(isAnyOf(getTotalLossAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getTotalLossAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.totalCount = payload.body?.length;
      state.totalLoss = payload.body;
    });
    builder.addMatcher(isAnyOf(getTotalLossAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.users = [];
    });
},
});

export default usersSlice.reducer;
