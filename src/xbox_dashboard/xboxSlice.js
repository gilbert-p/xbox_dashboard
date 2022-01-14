import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    current_context: "marketplace",
    context_index: 0,
    market_reversed: false,
    xbox_reversed: true,
    games_reversed: true,
    media_reversed: true,
    system_reversed: true,
    disc_tray: false,
    blade_size: 35,
    blade_container_width: 0,
}

export const xboxSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      navigateTo: (state, action) => {
        state.current_context = action.payload;
        switch(action.payload){
          case "marketplace":
            state.context_index = 0;
            state.xbox_reversed = false;
            state.games_reversed = false;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = false;

          break;
          case "xboxlive":
            state.context_index = 1;
            state.xbox_reversed = true;
            state.games_reversed = false;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case "games":
            state.context_index = 2;
            state.xbox_reversed = true;
            state.games_reversed = true;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case "media":
            state.context_index = 3;
            state.xbox_reversed = true;
            state.games_reversed = true;
            state.media_reversed = true;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case "system":
            state.context_index = 4;
            state.xbox_reversed = true;
            state.games_reversed = true;
            state.media_reversed = true;
            state.system_reversed = true;

            state.disc_tray = false;
          break;
          default:
            state.context_index = 0;
        }
      },
      updateBladeContainerWidth: (state, action) => {
        state.blade_container_width = action.payload;
      },
    },
});

export const { navigateTo, updateBladeContainerWidth } = xboxSlice.actions;

export const selectCurrentContext = (state) => state.dashboard.current_context;
export const selectContextIndex = (state) => state.dashboard.context_index;
export const selectXboxPos = (state) => state.dashboard.xbox_reversed;
export const selectGamesPos = (state) => state.dashboard.games_reversed;
export const selectMediaPos = (state) => state.dashboard.media_reversed;
export const selectSystemPos = (state) => state.dashboard.system_reversed;
export const isTrayDisplayed = (state) => state.dashboard.disc_tray;
export const selectBladeSize = (state) => state.dashboard.blade_size;
export const selectBladeContainerWidth = (state) => state.dashboard.blade_container_width;

export default xboxSlice.reducer;