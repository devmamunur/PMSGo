import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SummaryState {
    value: any;
}

const initialState: SummaryState = {
    value: [],
};

export const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        setSummary: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },
    },
});

export const { setSummary } = summarySlice.actions;

export default summarySlice.reducer;
