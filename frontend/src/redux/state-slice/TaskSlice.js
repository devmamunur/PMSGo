import {createSlice} from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name : 'task',
    initialState : {
        New: [],
        Completed : [],
        Progress : [],
        Canceled : [],
        Total:[],
        ALLTask:[],
    },
    reducers : {
        SetNewTask : (state, action) => {
            state.New = action.payload
        },
        SetCompletedTask : (state, action) => {
            state.Completed = action.payload
        },
        SetProgressTask : (state, action) => {
            state.Progress = action.payload
        },
        SetCanceledTask : (state, action) => {
            state.Canceled = action.payload
        },
        SetTotal:(state,action)=>{
            state.Total=action.payload
        },
        SetALLTask:(state,action)=>{
            state.ALLTask=action.payload
        }
    }
})

export const {SetNewTask, SetCompletedTask, SetProgressTask, SetCanceledTask, SetTotal, SetALLTask} = taskSlice.actions;
export default taskSlice.reducer;