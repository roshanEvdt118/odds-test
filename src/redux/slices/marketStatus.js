import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTotalWinAsync } from '@redux/services/totalwin';
import { getAllMarketStatusAsync } from '@redux/services/marketStatus';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  bet: [],
  totalCount: 0,
};

const marketStatus = createSlice({
  name: 'marketStatus',
  initialState,
  reducers: {
    clearAlert(state) {},
  },
  extraReducers: (builder) => {
    // Get All Users Total Win ----------
    builder.addMatcher(isAnyOf(getAllMarketStatusAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getAllMarketStatusAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.count = payload?.count;
      state.bet = payload;
    });
    builder.addMatcher(isAnyOf(getAllMarketStatusAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      //   state.users = [];
    });
  },
});

export default marketStatus.reducer;
