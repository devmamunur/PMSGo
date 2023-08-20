import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    projects: any[];
    project: any;
    projectAddDialog : boolean;
    projectEditDialog : boolean;
}

const initialState: ProjectState = {
    projects: [],
    project: {},
    projectAddDialog: false,
    projectEditDialog: false,
};
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<any[]>) => {
            state.projects = action.payload;
        },
        setSingleProject: (state, action: PayloadAction<any[]>) => {
            state.project = action.payload;
        },
        setProjectAddDialog: (state, action: PayloadAction<boolean>) => {
            state.projectAddDialog = action.payload;
        },
        setProjectEditDialog: (state, action: PayloadAction<boolean>) => {
            state.projectEditDialog = action.payload;
        },
    },
});
export const { setProjects, setSingleProject, setProjectAddDialog, setProjectEditDialog } = projectSlice.actions;
export default projectSlice.reducer;
