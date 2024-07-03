import { createSlice } from '@reduxjs/toolkit';

import { MenuSliceTypes } from '../custom_types/reduxSliceTypes';

let initialState: MenuSliceTypes = {
    show_selection_highlight: false,
    system_menu_index: 0,
    media_menu_index: null,
    games_menu_index: null,
    xboxlive_menu_index: null,
    marketplace_menu_index: null,
    marketplace_spotlight_index: 0,
    marketplace_spotlight_category: 'games',

    community_category: 'messages',

    show_blades: true,


    guide_menu_link_stack_index: 0,
    guide_menu_link_stack_highlight: false,
    guide_menu_index: null,
    guide_menu_highlight: false,


    guide_music_player_index: null,
    guide_music_player_highlight: false,


    is_song_playing: false,
    song_index: 0,
    current_selected_song: '',
    music_list_size: 0,


    show_theme_select: false,
    theme_select_index: null,
    selected_theme: '',
    theme_select_highlight: false,



    external_panel_navigate: false,
    sub_menu_navigate: false,

    //guide_panel, foreign_extension, marketplace
    navigate_context: 'main_menu_marketplace',
    guide_menu_active_state: 'closed',

};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {

        updateShowBlades: (state, action) => {
            state.show_blades = action.payload;
        },


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
        navigateMarketplaceSpotlightMenu: (state, action) => {
            state.marketplace_spotlight_index = action.payload;
        },
        updateMarketplaceSpotlightCategory: (state, action) => {
            state.marketplace_spotlight_category = action.payload;
        },

        navigateCommunityCategory: (state, action) => {
            state.community_category = action.payload;
        },



        updateGuideActiveState: (state, action) => {
            state.guide_menu_active_state = action.payload;
        },
        updateGuideMenuHighlight: (state, action) => {
            state.guide_menu_highlight = action.payload;
        },
        navigateGuideMenu: (state, action) => {
            state.guide_menu_index = action.payload;
            state.guide_menu_highlight = true;
        },
        navigateGuideMenuLinkStack: (state, action) => {
            state.guide_menu_link_stack_index = action.payload;
            state.guide_menu_link_stack_highlight = true;
        },
        updateLinkStackHighlight: (state, action) => {
            state.guide_menu_link_stack_highlight = action.payload;
        },




        updateGuideMusicPlayerHighlight: (state, action) => {
            state.guide_music_player_highlight = action.payload;
        },
        navigateGuideMusicPlayer: (state, action) => {
            state.guide_music_player_index = action.payload;
            state.guide_music_player_highlight = true;
        },


        playMusic: (state, action) => {
            state.is_song_playing = action.payload;
        },
        navigateSongIndex: (state, action) => {
            state.song_index = action.payload;
        },
        updateSelectedSong: (state, action) => {
            state.current_selected_song = action.payload;
        },
        updateMusicListSize: (state, action) => {
            state.music_list_size = action.payload;
        },




        updateShowThemeSelect: (state, action) => {
            state.show_theme_select = action.payload;
        },
        updateSelectedTheme: (state, action) => {
            state.selected_theme = action.payload;
        },
        navigateThemeSelectIndex: (state, action) => {
            state.theme_select_index = action.payload;
        },
        updateThemeSelectHighlight: (state, action) => {
            state.theme_select_highlight = action.payload;
        },

        updateExternalPanelNavigate: (state, action) => {
            state.external_panel_navigate = action.payload;
        },



        updateSubMenuNavigate: (state, action) => {
            state.sub_menu_navigate = action.payload;
        },


        updateNavigateContext: (state, action) => {
            state.navigate_context = action.payload;
        }
    }
});

export const { updateShowBlades,
               updateSelectionHighlight,
               navigateSystemMenu, 
               navigateMediaMenu, 
               navigateGamesMenu, 
               navigateXboxliveMenu,

               navigateMarketplaceMenu,
               navigateMarketplaceSpotlightMenu,
               updateMarketplaceSpotlightCategory,

               navigateCommunityCategory,
               navigateGuideMenuLinkStack,
               navigateGuideMenu,
               updateGuideActiveState,
               updateGuideMenuHighlight,
               updateLinkStackHighlight,
            
               updateGuideMusicPlayerHighlight,
               navigateGuideMusicPlayer,

               playMusic,
               navigateSongIndex,
               updateSelectedSong,
               updateMusicListSize,

               updateShowThemeSelect,
               updateSelectedTheme,
               navigateThemeSelectIndex,
               updateThemeSelectHighlight,
               updateExternalPanelNavigate,
               updateSubMenuNavigate,
               updateNavigateContext,

            } = menuSlice.actions;

export const selectShowBladeState = (state: { menu: MenuSliceTypes}) => state.menu.show_blades;

export const selectHighlightState = (state:{ menu: MenuSliceTypes}) => state.menu.show_selection_highlight;
export const selectSystemMainMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.system_menu_index;
export const selectMediaMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.media_menu_index;
export const selectGamesMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.games_menu_index;
export const selectXboxliveMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.xboxlive_menu_index;

export const selectMarketplaceMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.marketplace_menu_index;
export const selectMarketplaceSpotlightMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.marketplace_spotlight_index;
export const selectMarketplaceSpotlightCategoryTitle = (state:{ menu: MenuSliceTypes}) => state.menu.marketplace_spotlight_category;

export const selectCommunityCategory = (state:{ menu: MenuSliceTypes}) => state.menu.community_category;


export const selectGuideActiveState = (state:{ menu: MenuSliceTypes}) => state.menu.guide_menu_active_state;
export const selectGuideMenuLinkStackIndex = (state:{ menu: MenuSliceTypes}) => state.menu.guide_menu_link_stack_index;
export const selectGuideMenuLinkStackHighlight = (state:{ menu: MenuSliceTypes}) => state.menu.guide_menu_link_stack_highlight;
export const selectGuideMenuIndex = (state:{ menu: MenuSliceTypes}) => state.menu.guide_menu_index;
export const selectGuideMenuHighlightState = (state:{ menu: MenuSliceTypes}) => state.menu.guide_menu_highlight;


export const selectGuideMusicPlayerIndex = (state:{ menu: MenuSliceTypes}) => state.menu.guide_music_player_index;
export const selectGuideMusicPlayerHighlight = (state:{ menu: MenuSliceTypes}) => state.menu.guide_music_player_highlight;


export const selectMusicState = (state:{ menu: MenuSliceTypes}) => state.menu.is_song_playing;
export const selectSongIndex = (state:{ menu: MenuSliceTypes}) => state.menu.song_index;
export const selectCurrentSong = (state:{ menu: MenuSliceTypes}) => state.menu.current_selected_song;
export const selectMusiclistSize = (state:{ menu: MenuSliceTypes}) => state.menu.music_list_size;


export const selectShowThemeSelect = (state:{ menu: MenuSliceTypes}) => state.menu.show_theme_select;
export const selectThemeSelection = (state:{ menu: MenuSliceTypes}) => state.menu.selected_theme;
export const selectThemeIndex = (state:{ menu: MenuSliceTypes}) => state.menu.theme_select_index;
export const selectThemeHighlightState = (state:{ menu: MenuSliceTypes}) => state.menu.theme_select_highlight;

export const selectExternalNavigationState = (state:{ menu: MenuSliceTypes}) => state.menu.external_panel_navigate;


export const selectSubMenuNavActive = (state:{ menu: MenuSliceTypes}) => state.menu.sub_menu_navigate;


export const selectNavigationContext = (state:{ menu: MenuSliceTypes}) => state.menu.navigate_context;



export default menuSlice.reducer;