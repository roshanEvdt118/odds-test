import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAllMatchStatusAsync, getFancyRunnersAsync, getRunnersAsync, getTotalFancyPayout, getTotalMatchPayout, patchMarketAsync } from '@redux/services/matchStatus';

const initialState = {
  isLoading: false,
  isUpdating: false,
  isSubmitting: false,
  isDeleting: false,
  bet: [],
  totalPayout: [],
  totalFancyPayout: [],
  runnerData: [],
  runnerList: [],
  totalCount: 0,
};

const matchStatus = createSlice({
  name: 'matchStatus',
  initialState,
  reducers: {
    clearRunnerList: (state) => {
      state.runnerList = [];
    },
  },
  extraReducers: (builder) => {
    // Get All Users Total Win ----------
    builder.addMatcher(isAnyOf(getAllMatchStatusAsync.pending), (state, { payload }) => {
      state.isLoading = true;
      state.totalPayout = [];
      state.totalFancyPayout = [];
      state.runnerList = [];
    });
    builder.addMatcher(isAnyOf(getAllMatchStatusAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.count = payload?.count;
      state.bet = payload;
    });
    builder.addMatcher(isAnyOf(getAllMatchStatusAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      //   state.users = [];
    });


    // Get Total Match Win ----------
    builder.addMatcher(isAnyOf(getTotalMatchPayout.pending), (state, { payload }) => {
      state.isTotalPayoutLoading = true;
    });
    builder.addMatcher(isAnyOf(getTotalMatchPayout.fulfilled), (state, { payload }) => {
      state.isTotalPayoutLoading = false;
      state.count = payload?.count;
      state.totalPayout = payload?.body || [];
    });
    builder.addMatcher(isAnyOf(getTotalMatchPayout.rejected), (state, { payload }) => {
      state.isTotalPayoutLoading = false;
    });

    // Get Total Fancy Win ----------
    builder.addMatcher(isAnyOf(getTotalFancyPayout.pending), (state, { payload }) => {
      state.isTotalPayoutLoading = true;
    });
    builder.addMatcher(isAnyOf(getTotalFancyPayout.fulfilled), (state, { payload }) => {
      state.isTotalPayoutLoading = false;
      state.totalFancyPayout = payload?.body || [];
    });
    builder.addMatcher(isAnyOf(getTotalFancyPayout.rejected), (state, { payload }) => {
      state.isTotalPayoutLoading = false;
    });

    // get fancy runners //

    builder.addMatcher(isAnyOf(getFancyRunnersAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getFancyRunnersAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.count = payload?.count;
      state.runnerData = payload?.body || [];
    });
    builder.addMatcher(isAnyOf(getFancyRunnersAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      //   state.users = [];
    });

    // get fancy runners //

    builder.addMatcher(isAnyOf(patchMarketAsync.pending), (state, { payload }) => {
      state.isUpdating = true;
    });
    builder.addMatcher(isAnyOf(patchMarketAsync.fulfilled), (state, { payload }) => {
      state.isUpdating = false;
    });
    builder.addMatcher(isAnyOf(patchMarketAsync.rejected), (state, { payload }) => {
      state.isUpdating = false;
    });

    // get fancy runners //

    builder.addMatcher(isAnyOf(getRunnersAsync.pending), (state) => {
      state.isUpdating = true;
    });
    builder.addMatcher(isAnyOf(getRunnersAsync.fulfilled), (state, { payload }) => {
      state.isUpdating = false;
      state.runnerList = payload?.body;
    });
    builder.addMatcher(isAnyOf(getRunnersAsync.rejected), (state) => {
      state.isUpdating = false;
      state.runnerList = [];
    });

    // ================================
  },
});

export const {
  clearRunnerList,
} = matchStatus.actions;

export default matchStatus.reducer;
