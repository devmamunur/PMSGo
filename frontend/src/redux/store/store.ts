import {configureStore} from "@reduxjs/toolkit"
import settingsReducer from '../state-slice/SettingsSlice.js';
import taskReducer from '../state-slice/TaskSlice.js';
import summaryReducer from '../state-slice/SummarySlice.js';
import profileReducer from "../state-slice/ProfileSlice.js";

export default configureStore({
    reducer : {
        settings : settingsReducer,
        task : taskReducer,
        summary : summaryReducer,
        profile : profileReducer
    }
})