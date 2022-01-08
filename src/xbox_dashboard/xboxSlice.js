import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    current_context: "marketplace",
    context_index: 0,
    market_pos: "left",
    xbox_pos: "right",
    games_pos: "right",
    media_pos: "right",
    system_pos: "right",
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
            state.xbox_pos = "right";
            state.games_pos = "right";
            state.media_pos = "right";
            state.system_pos = "right";
          break;
          case "xboxlive":
            state.context_index = 1;
            state.xbox_pos = "left";
            state.games_pos = "right";
            state.media_pos = "right";
            state.system_pos = "right";
          break;
          case "games":
            state.context_index = 2;
            state.xbox_pos = "left";
            state.games_pos = "left";
            state.media_pos = "right";
            state.system_pos = "right";
          break;
          case "media":
            state.context_index = 3;
            state.xbox_pos = "left";
            state.games_pos = "left";
            state.media_pos = "left";
            state.system_pos = "right";
          break;
          case "system":
            state.context_index = 4;
            state.xbox_pos = "left";
            state.games_pos = "left";
            state.media_pos = "left";
            state.system_pos = "left";
          break;
          default:
            state.context_index = 0;
        }
      },
    },
});

export const { navigateTo } = xboxSlice.actions;

export const selectCurrentContext = (state) => state.dashboard.current_context;
export const selectContextIndex = (state) => state.dashboard.context_index;
export const selectXboxPos = (state) => state.dashboard.xbox_pos;
export const selectGamesPos = (state) => state.dashboard.games_pos;
export const selectMediaPos = (state) => state.dashboard.media_pos;
export const selectSystemPos = (state) => state.dashboard.system_pos;

export default xboxSlice.reducer;