import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  New: any;
  Completed: any;
  Progress: any;
  Canceled: any;
  Total: any;
  ALLTask: any;
}

const initialState: TaskState = {
  New: [],
  Completed: [],
  Progress: [],
  Canceled: [],
  Total: [],
  ALLTask: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setNewTask: (state, action: PayloadAction<any[]>) => {
      state.New = action.payload;
    },
    setCompletedTask: (state, action: PayloadAction<any[]>) => {
      state.Completed = action.payload;
    },
    setProgressTask: (state, action: PayloadAction<any[]>) => {
      state.Progress = action.payload;
    },
    setCanceledTask: (state, action: PayloadAction<any[]>) => {
      state.Canceled = action.payload;
    },
    setTotal: (state, action: PayloadAction<any[]>) => {
      state.Total = action.payload;
    },
    setAllTask: (state, action: PayloadAction<any[]>) => {
      state.ALLTask = action.payload;
    },
  },
});

export const {
  setNewTask,
  setCompletedTask,
  setProgressTask,
  setCanceledTask,
  setTotal,
  setAllTask,
} = taskSlice.actions;

export default taskSlice.reducer;
