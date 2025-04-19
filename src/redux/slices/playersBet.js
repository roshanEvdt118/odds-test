// src/redux/slices/playersBetSlice.js
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getPlayersBetAsync, processMatchWinnerAsync, postFancyWinnerAsync, updateMarketStatusAsync, updateMatchStatusAsync } from '@redux/services/playersBet';

const initialState = {
    isLoading: false,
    isSubmitting: false,
    isDeleting: false,
    playersBet: [],
    playersBetById: {},
    count: 0,
};

const playersBetSlice = createSlice({
    name: 'playersBet',
    initialState,
    reducers: {
        clearAlert(state) {
        },
    },
    extraReducers: (builder) => {
        // Get All PlayersBets
        builder.addMatcher(isAnyOf(getPlayersBetAsync.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getPlayersBetAsync.fulfilled), (state, { payload }) => {
            state.isLoading = false;
            state.playersBet = payload?.body.content;
            state.count = payload?.body.totalElements;
        });
        builder.addMatcher(isAnyOf(getPlayersBetAsync.rejected), (state) => {
            state.isLoading = false;
        });


        // process Match Winner
        builder.addMatcher(isAnyOf(processMatchWinnerAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(processMatchWinnerAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(processMatchWinnerAsync.rejected), (state) => {
            state.isSubmitting = false;
        });


        // post Bet Settelment
        builder.addMatcher(isAnyOf(postFancyWinnerAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(postFancyWinnerAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(postFancyWinnerAsync.rejected), (state) => {
            state.isSubmitting = false;
        });

        // Update Market Status
        builder.addMatcher(isAnyOf(updateMarketStatusAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(updateMarketStatusAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(updateMarketStatusAsync.rejected), (state) => {
            state.isSubmitting = false;
        });
        
        // Update match Status
        builder.addMatcher(isAnyOf(updateMatchStatusAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(updateMatchStatusAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(updateMatchStatusAsync.rejected), (state) => {
            state.isSubmitting = false;
        });
    },
});

export default playersBetSlice.reducer;
