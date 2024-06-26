import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useTransitionBlade } from '../api_features/useTransitionBlade';


let initialState = {
    is_mobile_device: null,

    current_context: "marketplace",
    context_index: 0,
    last_index_called: 0,
    transition_direction: "right",
    
    is_marketplace_rightside: false,
    is_xboxlive_rightside: false,
    is_games_rightside: false,
    is_media_rightside: false,
    is_system_rightside: false,

    disc_tray: false,
    blade_size: 0,
    blade_container_width: 0,
    blade_container_height: 0,
    is_transitioning: null,

    is_guide_menu_open: false,
}

export const bladeTransitionAsync = createAsyncThunk(
  '../api_features/useTransitionBlade',
  async () => {
    const response = await useTransitionBlade();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const xboxSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      updateMobileStatus: (state, action) => {
        state.is_mobile_device = action.payload;
      },

      navigateTo: (state, action) => {

        state.current_context = action.payload;

        switch(action.payload){
          case 0:
            state.last_index_called = state.context_index;

            state.context_index = 0;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.is_xboxlive_rightside = true;
            state.is_games_rightside = true;
            state.is_media_rightside = true;
            state.is_system_rightside = true;

            state.disc_tray = false;

          break;
          case 1:
            state.last_index_called = state.context_index;

            state.context_index = 1;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.is_xboxlive_rightside = false;
            state.is_games_rightside = true;
            state.is_media_rightside = true;
            state.is_system_rightside = true;

            state.disc_tray = true;
          break;
          case 2:
            state.last_index_called = state.context_index;

            state.context_index = 2;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.is_xboxlive_rightside = false;
            state.is_games_rightside = false;
            state.is_media_rightside = true;
            state.is_system_rightside = true;

            state.disc_tray = true;
          break;
          case 3:
            state.last_index_called = state.context_index;


            state.context_index = 3;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.is_xboxlive_rightside = false;
            state.is_games_rightside = false;
            state.is_media_rightside = false;
            state.is_system_rightside = true;

            state.disc_tray = true;
          break;
          case 4:
            state.last_index_called = state.context_index;

            state.context_index = 4;

            state.last_index_called > state.context_index ?
              state.transition_direction = "right" :
              state.transition_direction = "left";

            state.is_xboxlive_rightside = false;
            state.is_games_rightside = false;
            state.is_media_rightside = false;
            state.is_system_rightside = false;

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
      updateBladeSize: (state, action) => {
        state.blade_size = action.payload;
      },
      updateGuideMenuState: (state, action) => {
        state.is_guide_menu_open = action.payload;
      },
      updateDiscTrayState: (state, action) => {
        state.disc_tray = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(bladeTransitionAsync.pending, (state) => {
        state.is_transitioning = true;
      })
      .addCase(bladeTransitionAsync.fulfilled, (state, action) => {
        state.is_transitioning = false;
      });
    }
});

export const {
   navigateTo,
   updateBladeContainerSize, 
   updateBladeSize, 
   setBladeAnimationRef, 
   updateGuideMenuState,
   updateDiscTrayState,
   updateMobileStatus,
   } = xboxSlice.actions;

export const selectMobileDeviceStatus = (state) => state.dashboard.is_mobile_device;

export const selectCurrentContext = (state) => state.dashboard.current_context;
export const selectContextIndex = (state) => state.dashboard.context_index;
export const selectMarketplacePos = (state) => state.dashboard.is_marketplace_rightside
export const selectXboxPos = (state) => state.dashboard.is_xboxlive_rightside;
export const selectGamesPos = (state) => state.dashboard.is_games_rightside;
export const selectMediaPos = (state) => state.dashboard.is_media_rightside;
export const selectSystemPos = (state) => state.dashboard.is_system_rightside;
export const isTrayDisplayed = (state) => state.dashboard.disc_tray;
export const selectBladeSize = (state) => state.dashboard.blade_size;
export const selectBladeContainerWidth = (state) => state.dashboard.blade_container_width;
export const selectBladeContainerHeight = (state) => state.dashboard.blade_container_height;
export const selectTransitionState = (state) => state.dashboard.is_transitioning;
export const selectTransitionDirection = (state) => state.dashboard.transition_direction;
export const selectLastIndexCalled = (state) => state.dashboard.last_index_called;

export const isGuideOpen = (state) => state.dashboard.is_guide_menu_open;


export default xboxSlice.reducer;