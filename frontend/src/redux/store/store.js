import {configureStore} from "@reduxjs/toolkit"
import settingsReducer from '../state-slice/Settings-slice';
import taskReducer from '../state-slice/TaskSlice';
import summaryReducer from '../state-slice/SummarySlice';
export default configureStore({
    reducer : {
        settings : settingsReducer,
        task : taskReducer,
        summary : summaryReducer,
    }
})