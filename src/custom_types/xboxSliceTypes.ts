export interface XboxSliceTypes {
    is_mobile_device: boolean | null;
    current_context: string;
    context_index: number;
    last_index_called: number;
    transition_direction: 'left' | 'right';
    is_marketplace_rightside: boolean;
    is_xboxlive_rightside: boolean;
    is_games_rightside: boolean;
    is_media_rightside: boolean;
    is_system_rightside: boolean;
    disc_tray: boolean;
    blade_size: number;
    blade_container_width: number;
    blade_container_height: number;
    is_transitioning: boolean | null;
    is_guide_menu_open: boolean;
}

export interface MenuSliceTypes {
    show_selection_highlight: boolean;
    system_menu_index: number;
    media_menu_index: number | null;
    games_menu_index: number | null;
    xboxlive_menu_index: number | null;
    marketplace_menu_index: number | null;
    marketplace_spotlight_index: number;
    marketplace_spotlight_category: 'games' | 'movies' | 'music';

    community_category: 'messages' | 'friends' | 'players'; 

    show_blades: boolean;

    guide_menu_link_stack_index: number;
    guide_menu_link_stack_highlight: boolean;
    guide_menu_index: number | null;
    guide_menu_highlight: boolean;

    guide_music_player_index: number | null;
    guide_music_player_highlight: boolean;

    is_song_playing: boolean;
    song_index: number;
    current_selected_song: string;
    music_list_size: number;

    show_theme_select: boolean;
    theme_select_index: number | null;
    selected_theme: string;
    theme_select_highlight: boolean;

    external_panel_navigate: boolean;
    sub_menu_navigate: boolean;

    navigate_context: 'guide_panel_main' | 'foreign_extension' | 'main_menu_marketplace' | 'main_menu_xboxlive' | 'main_menu_games' | 'main_menu_media' | 'main_menu_system' | 'default';
    guide_menu_active_state: 'closed' | 'open' | 'external_gamer_profile' | 'guide_setting_main' | 'theme_select' | 'extended_about_dashboard' | 'extended_gamer_profile' | 'foreign_gamer_profile' | 'foreign_community_profile' | 'default';
}