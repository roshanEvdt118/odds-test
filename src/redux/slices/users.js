import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addUserAsync, getUsersAsync, getUsersDetailsByIdAsync, postCreditAsync, postDebitAmountAsync } from '../services';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  users: [],
  totalCount: 0,
  userDetails:{},
  isMoneySubmitting: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Get Users ----------
    builder.addMatcher(isAnyOf(getUsersAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getUsersAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.body?.content || 0;
      state.totalCount = payload.body?.totalElements || 0;
     ;
    });
    builder.addMatcher(isAnyOf(getUsersAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.users = [];
    });
    // -------------

    // Add User ----------
    builder.addMatcher(isAnyOf(addUserAsync.pending), (state, { payload }) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(addUserAsync.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(addUserAsync.rejected), (state, { payload }) => {
      state.isSubmitting = false;
    });

    // get user Amount //

    builder.addMatcher(isAnyOf(postCreditAsync.pending), (state, { payload }) => {
      state.isMoneySubmitting = true;
    });
    builder.addMatcher(isAnyOf(postCreditAsync.fulfilled), (state, { payload }) => {
      state.isMoneySubmitting = false;
    });
    builder.addMatcher(isAnyOf(postCreditAsync.rejected), (state, { payload }) => {
      state.isMoneySubmitting = false;
    });

        // get user withdrawal //

        builder.addMatcher(isAnyOf(postDebitAmountAsync.pending), (state, { payload }) => {
          state.isMoneySubmitting = true;
        });
        builder.addMatcher(isAnyOf(postDebitAmountAsync.fulfilled), (state, { payload }) => {
          state.isMoneySubmitting = false;
        });
        builder.addMatcher(isAnyOf(postDebitAmountAsync.rejected), (state, { payload }) => {
          state.isMoneySubmitting = false;
        });

        
        builder.addMatcher(isAnyOf(getUsersDetailsByIdAsync.pending), (state, { payload }) => {
          state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(getUsersDetailsByIdAsync.fulfilled), (state, { payload }) => {
          state.isSubmitting = false;
          state.userDetails = payload;
        });
        builder.addMatcher(isAnyOf(getUsersDetailsByIdAsync.rejected), (state, { payload }) => {
          state.isSubmitting = false;
        });

  },
});

export const { clearAlert } = usersSlice.actions;
export default usersSlice.reducer;
