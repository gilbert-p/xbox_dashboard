import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    show_selection_highlight: false,
    system_menu_index: 0,
    media_menu_index: 0,
    games_menu_index: 0,
    xboxlive_menu_index: 0,
    marketplace_menu_index: 0,
    guide_menu_index: 0,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        updateSelectionHighlight: (state, action) => {
            state.show_selection_highlight = action.payload;
        },
        navigateSystemMenu: (state, action) => {
            state.system_menu_index = action.payload;
        },
        navigateMediaMenu: (state, action) => {
            state.media_menu_index = action.payload;
        },
        navigateGamesMenu: (state, action) => {
            state.games_menu_index = action.payload;
        },
        navigateXboxliveMenu: (state, action) => {
            state.xboxlive_menu_index = action.payload;
        },
        navigateMarketplaceMenu: (state, action) => {
            state.marketplace_menu_index = action.payload;
        },
        navigateGuideMenu: (state, action) => {
            state.guide_menu_index = action.payload;
        }
    }
});

export const { updateSelectionHighlight,
               navigateSystemMenu, 
               navigateMediaMenu, 
               navigateGamesMenu, 
               navigateXboxliveMenu,
               navigateMarketplaceMenu,
               navigateGuideMenu } = menuSlice.actions;

export const selectHighlightState = (state) => state.menu.show_selection_highlight;
export const selectSystemMainMenuIndex = (state) => state.menu.system_menu_index;
export const selectMediaMenuIndex = (state) => state.menu.media_menu_index;
export const selectGamesMenuIndex = (state) => state.menu.games_menu_index;
export const selectXboxliveMenuIndex = (state) => state.menu.xboxlive_menu_index;
export const selectMarketplaceMenuIndex = (state) => state.menu.marketplace_menu_index;
export const selectGuideMenuIndex = (state) => state.menu.guide_menu_index;



export default menuSlice.reducer;