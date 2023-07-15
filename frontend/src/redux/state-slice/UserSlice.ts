import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  value: any[];
}

const initialState: UserState = {
  value: [],
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
