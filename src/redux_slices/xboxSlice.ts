import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useTransitionBlade } from '../api_features/useTransitionBlade';

import { XboxSliceTypes } from '../custom_types/xboxSliceTypes';


const initialState: XboxSliceTypes = {
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
};

// Define async thunk for blade transition
export const bladeTransitionAsync = createAsyncThunk(
    'dashboard/bladeTransition',
    async () => {
        const response = await useTransitionBlade();
        return response;
    }
);

// Create the slice
export const xboxSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateMobileStatus: (state, action) => {
            state.is_mobile_device = action.payload;
        },
        navigateTo: (state, action) => {
            state.current_context = action.payload;
            switch (action.payload) {
                case 0:
                    state.last_index_called = state.context_index;
                    state.context_index = 0;
                    state.transition_direction = state.last_index_called > state.context_index ? "right" : "left";
                    state.is_xboxlive_rightside = true;
                    state.is_games_rightside = true;
                    state.is_media_rightside = true;
                    state.is_system_rightside = true;
                    state.disc_tray = false;
                    break;
                case 1:
                    state.last_index_called = state.context_index;
                    state.context_index = 1;
                    state.transition_direction = state.last_index_called > state.context_index ? "right" : "left";
                    state.is_xboxlive_rightside = false;
                    state.is_games_rightside = true;
                    state.is_media_rightside = true;
                    state.is_system_rightside = true;
                    state.disc_tray = true;
                    break;
                case 2:
                    state.last_index_called = state.context_index;
                    state.context_index = 2;
                    state.transition_direction = state.last_index_called > state.context_index ? "right" : "left";
                    state.is_xboxlive_rightside = false;
                    state.is_games_rightside = false;
                    state.is_media_rightside = true;
                    state.is_system_rightside = true;
                    state.disc_tray = true;
                    break;
                case 3:
                    state.last_index_called = state.context_index;
                    state.context_index = 3;
                    state.transition_direction = state.last_index_called > state.context_index ? "right" : "left";
                    state.is_xboxlive_rightside = false;
                    state.is_games_rightside = false;
                    state.is_media_rightside = false;
                    state.is_system_rightside = true;
                    state.disc_tray = true;
                    break;
                case 4:
                    state.last_index_called = state.context_index;
                    state.context_index = 4;
                    state.transition_direction = state.last_index_called > state.context_index ? "right" : "left";
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
                // Handle the response payload if needed
            });
    },
});

// Export actions from slice
export const {
    navigateTo,
    updateBladeContainerSize,
    updateBladeSize,
    updateGuideMenuState,
    updateDiscTrayState,
    updateMobileStatus,
} = xboxSlice.actions;

// Export selectors
export const selectMobileDeviceStatus = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_mobile_device;
export const selectCurrentContext = (state: { dashboard: XboxSliceTypes }) => state.dashboard.current_context;
export const selectContextIndex = (state: { dashboard: XboxSliceTypes }) => state.dashboard.context_index;
export const selectMarketplacePos = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_marketplace_rightside;
export const selectXboxPos = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_xboxlive_rightside;
export const selectGamesPos = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_games_rightside;
export const selectMediaPos = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_media_rightside;
export const selectSystemPos = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_system_rightside;
export const isTrayDisplayed = (state: { dashboard: XboxSliceTypes }) => state.dashboard.disc_tray;
export const selectBladeSize = (state: { dashboard: XboxSliceTypes }) => state.dashboard.blade_size;
export const selectBladeContainerWidth = (state: { dashboard: XboxSliceTypes }) => state.dashboard.blade_container_width;
export const selectBladeContainerHeight = (state: { dashboard: XboxSliceTypes }) => state.dashboard.blade_container_height;
export const selectTransitionState = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_transitioning;
export const selectTransitionDirection = (state: { dashboard: XboxSliceTypes }) => state.dashboard.transition_direction;
export const selectLastIndexCalled = (state: { dashboard: XboxSliceTypes }) => state.dashboard.last_index_called;
export const isGuideOpen = (state: { dashboard: XboxSliceTypes }) => state.dashboard.is_guide_menu_open;

// Export the reducer
export default xboxSlice.reducer;