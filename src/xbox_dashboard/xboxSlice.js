import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transitionBlade } from '../api_features/bladeTransition';


let initialState = {
    current_context: "marketplace",
    context_index: 0,
    last_index_called: 0,
    transition_direction: "right",
    market_reversed: false,
    xbox_reversed: false,
    games_reversed: false,
    media_reversed: false,
    system_reversed: false,
    disc_tray: false,
    blade_size: 100,
    blade_container_width: 0,
    blade_container_height: 0,
    is_transitioning: false,
}

export const bladeTransitionAsync = createAsyncThunk(
  '../api_features/transitionBlade',
  async () => {
    const response = await transitionBlade();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const xboxSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      navigateTo: (state, action) => {
        

        state.current_context = action.payload;

        switch(action.payload){
          case 0:
            state.last_index_called = state.context_index;

            state.context_index = 0;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.xbox_reversed = false;
            state.games_reversed = false;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = false;

          break;
          case 1:
            state.last_index_called = state.context_index;

            state.context_index = 1;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.xbox_reversed = true;
            state.games_reversed = false;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case 2:
            state.last_index_called = state.context_index;

            state.context_index = 2;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.xbox_reversed = true;
            state.games_reversed = true;
            state.media_reversed = false;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case 3:
            state.last_index_called = state.context_index;


            state.context_index = 3;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.xbox_reversed = true;
            state.games_reversed = true;
            state.media_reversed = true;
            state.system_reversed = false;

            state.disc_tray = true;
          break;
          case 4:
            state.last_index_called = state.context_index;

            state.context_index = 4;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

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
      updateBladeContainerSize: (state, action) => {
        state.blade_container_width = action.payload.width;
        state.blade_container_height = action.payload.height;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(bladeTransitionAsync.pending, (state) => {
        state.is_transitioning = true;
      })
      .addCase(bladeTransitionAsync.fulfilled, (state) => {
        state.is_transitioning = false;
      });
    }
});

export const { navigateTo, updateBladeContainerSize } = xboxSlice.actions;

export const selectCurrentContext = (state) => state.dashboard.current_context;
export const selectContextIndex = (state) => state.dashboard.context_index;
export const selectXboxPos = (state) => state.dashboard.xbox_reversed;
export const selectGamesPos = (state) => state.dashboard.games_reversed;
export const selectMediaPos = (state) => state.dashboard.media_reversed;
export const selectSystemPos = (state) => state.dashboard.system_reversed;
export const isTrayDisplayed = (state) => state.dashboard.disc_tray;
export const selectBladeSize = (state) => state.dashboard.blade_size;
export const selectBladeContainerWidth = (state) => state.dashboard.blade_container_width;
export const selectBladeContainerHeight = (state) => state.dashboard.blade_container_height;
export const selectTransitionState = (state) => state.dashboard.is_transitioning;
export const selectTransitionDirection = (state) => state.dashboard.transition_direction;
export const selectLastIndexCalled = (state) => state.dashboard.last_index_called;

export default xboxSlice.reducer;