import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProfileState {
    value: any
}

const initialState: ProfileState = {
    value: []
}
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        }
    }
})
export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;