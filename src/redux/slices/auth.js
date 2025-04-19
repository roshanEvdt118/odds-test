import { signInAsync } from '@redux/services/auth';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';


const initialState = {
    isSubmitting: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Sign In ----------
        builder.addMatcher(isAnyOf(signInAsync.pending), (state, { payload }) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(signInAsync.fulfilled), (state, { payload }) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(signInAsync.rejected), (state, { payload }) => {
            state.isSubmitting = false;
        });
        // -------------
    },
});

export default authSlice.reducer;