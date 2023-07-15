import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  loader: string;
}

const initialState: SettingsState = {
  loader: 'd-none',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    showLoader: state => {
      state.loader = '';
    },
    hideLoader: state => {
      state.loader = 'd-none';
    },
  },
});

export const { showLoader, hideLoader } = settingsSlice.actions;
export default settingsSlice.reducer;
