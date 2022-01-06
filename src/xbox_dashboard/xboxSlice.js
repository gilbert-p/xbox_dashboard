import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    current_context: "games",
    
}

export const xboxSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      navigateTo: (state, action) => {
        state.current_context = action.payload;
      },
    },
});

export const { navigateTo } = xboxSlice.actions;

export const selectCurrentContext = (state) => state.dashboard.current_context;

export default xboxSlice.reducer;