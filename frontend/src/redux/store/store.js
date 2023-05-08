import {configureStore} from "@reduxjs/toolkit"
import settingsReducer from '../state-slice/SettingsSlice.js';
import taskReducer from '../state-slice/TaskSlice';
import summaryReducer from '../state-slice/SummarySlice';
import profileReducer from "../state-slice/ProfileSlice";

export default configureStore({
    reducer : {
        settings : settingsReducer,
        task : taskReducer,
        summary : summaryReducer,
        profile : profileReducer
    }
})