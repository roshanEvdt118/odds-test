import { getTransactionAsync } from '@redux/services/transaction';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  transactions: [],
  totalCount: 0,
  userDetails:{}
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Get Users ----------
    builder.addMatcher(isAnyOf(getTransactionAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getTransactionAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.transactions = payload.body?.content || 0;
      state.totalCount = payload.body?.totalElements || 0;
     ;
    });
    builder.addMatcher(isAnyOf(getTransactionAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.transactions = [];
    });
    // -------------

   

  },
});

export const { clearAlert } = transactionsSlice.actions;
export default transactionsSlice.reducer;
