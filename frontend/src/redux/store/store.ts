import { configureStore, combineReducers } from '@reduxjs/toolkit';
import settingsReducer from '@/redux/state-slice/SettingsSlice';
import taskReducer from '@/redux/state-slice/TaskSlice';
import summaryReducer from '@/redux/state-slice/SummarySlice';
import userReducer from '@/redux/state-slice/UserSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    task: taskReducer,
    summary: summaryReducer,
    users: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
