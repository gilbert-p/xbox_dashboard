import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    system_menu_index: 0,
};

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        navigateSystemMenu: (state, action) => {
            state.system_menu_index = action.payload;
        }
    }
});

export const { navigateSystemMenu } = systemSlice.actions;

export const selectSystemMainMenuIndex = (state) => state.system.system_menu_index;

export default systemSlice.reducer;