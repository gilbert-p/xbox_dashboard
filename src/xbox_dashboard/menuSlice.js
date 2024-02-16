import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    show_selection_highlight: false,
    system_menu_index: 0,
    media_menu_index: null,
    games_menu_index: null,
    xboxlive_menu_index: null,
    marketplace_menu_index: null,

    show_blades: true,


    guide_menu_active_state: 'closed',
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
        }
    }
});

export const { 
               updateShowBlades,

               updateSelectionHighlight,
               navigateSystemMenu, 
               navigateMediaMenu, 
               navigateGamesMenu, 
               navigateXboxliveMenu,
               navigateMarketplaceMenu,

               
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

            } = menuSlice.actions;

export const selectShowBladeState = (state) => state.menu.show_blades;

export const selectHighlightState = (state) => state.menu.show_selection_highlight;
export const selectSystemMainMenuIndex = (state) => state.menu.system_menu_index;
export const selectMediaMenuIndex = (state) => state.menu.media_menu_index;
export const selectGamesMenuIndex = (state) => state.menu.games_menu_index;
export const selectXboxliveMenuIndex = (state) => state.menu.xboxlive_menu_index;
export const selectMarketplaceMenuIndex = (state) => state.menu.marketplace_menu_index;


export const selectGuideActiveState = (state) => state.menu.guide_menu_active_state;
export const selectGuideMenuLinkStackIndex = (state) => state.menu.guide_menu_link_stack_index;
export const selectGuideMenuLinkStackHighlight = (state) => state.menu.guide_menu_link_stack_highlight;
export const selectGuideMenuIndex = (state) => state.menu.guide_menu_index;
export const selectGuideMenuHighlightState = (state) => state.menu.guide_menu_highlight;


export const selectGuideMusicPlayerIndex = (state) => state.menu.guide_music_player_index;
export const selectGuideMusicPlayerHighlight = (state) => state.menu.guide_music_player_highlight;


export const selectMusicState = (state) => state.menu.is_song_playing;
export const selectSongIndex = (state) => state.menu.song_index;
export const selectCurrentSong = (state) => state.menu.current_selected_song;
export const selectMusiclistSize = (state) => state.menu.music_list_size;



export default menuSlice.reducer;