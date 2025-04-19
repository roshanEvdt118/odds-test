import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTotalWinAsync } from '@redux/services/totalwin';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  totalWin: [],
  totalCount: 0,
};

const usersSlice = createSlice({
  name: 'totalWin',
  initialState,
  reducers: {
    clearAlert(state) {
    },
  },
  extraReducers: (builder) => {
    // Get All Users Total Win ----------
    builder.addMatcher(isAnyOf(getTotalWinAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getTotalWinAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.totalCount = payload.body?.length;
      state.totalWin = payload.body;
    });
    builder.addMatcher(isAnyOf(getTotalWinAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.users = [];
    });
},
});

export default usersSlice.reducer;
