import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    value: any[];
}

const initialState: ProjectState = {
    value: [],
};
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },
    },
});
export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
