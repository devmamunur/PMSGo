import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    value: any[];
    projectAddDialog : boolean;
    projectEditDialog : boolean;
}

const initialState: ProjectState = {
    value: [],
    projectAddDialog: false,
    projectEditDialog: false,
};
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },
        setProjectAddDialog: (state, action: PayloadAction<boolean>) => {
            state.projectAddDialog = action.payload;
        },
        setProjectEditDialog: (state, action: PayloadAction<boolean>) => {
            state.projectEditDialog = action.payload;
        },
    },
});
export const { setProject, setProjectAddDialog, setProjectEditDialog } = projectSlice.actions;
export default projectSlice.reducer;
