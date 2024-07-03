import { MutableRefObject, CSSProperties } from 'react';

export type GsapTimeline = gsap.core.Timeline | null;
export type RefElement = HTMLDivElement | null;
export type ForeignExtendedState = 'foreign_gamer_profile' | 'foreign_community_profile' | 'extended_gamer_profile' |
                                   'foreign_community_profile' | 'foreign_gamer_profile' | 'default'; 
export type ExtendedState = 'extended_about_dashboard' | 'extended_gamer_profile' | 'default';

export interface GuidePanelAnimation {
    revealGuideMenu: MutableRefObject<GsapTimeline>;
    extendMenu: MutableRefObject<GsapTimeline>;
    revealAboutDashboard: MutableRefObject<GsapTimeline>;
    guideSettingsAnimate: MutableRefObject<GsapTimeline>;
    showThemeSelection: MutableRefObject<GsapTimeline>;
    guideMenuRef: MutableRefObject<RefElement>;
    guidePanelRef: MutableRefObject<RefElement>;
    guideSettingsRef: MutableRefObject<RefElement>;
    aboutDashboardPageRef: MutableRefObject<RefElement>;
    gamerProfilePageRef: MutableRefObject<RefElement>;
    guideSelectThemeRef: MutableRefObject<RefElement>;
    communityDashboardPageRef: MutableRefObject<RefElement>;
    showGuideSettings: ()=> void;
    extendGuideMenu: (extendedState: ExtendedState)=> void;
    closeFullMenu: ()=> void;
    extendRevealContent: (extendedState: ExtendedState & ForeignExtendedState | ForeignExtendedState)=> void;
    revealThemeSelection: ()=> void;
    backButtonStateSelection: ()=> void;
}

export interface DashboardBladeAnimation {
    initializeRef: MutableRefObject<GsapTimeline>;
    shiftLeftTransition: MutableRefObject<GsapTimeline>;
    shiftRightTransition: MutableRefObject<GsapTimeline>;
    shiftRightXboxLive: MutableRefObject<GsapTimeline>;
    shiftRightGames: MutableRefObject<GsapTimeline>;
    shiftRightMedia: MutableRefObject<GsapTimeline>;
    shiftRightSystem: MutableRefObject<GsapTimeline>;
    centerBlockExpandAnimate : MutableRefObject<GsapTimeline>;
    slideAwayAnimate: MutableRefObject<GsapTimeline>;
    gamesTabAnimate: MutableRefObject<GsapTimeline>;
    mediaTabAnimate: MutableRefObject<GsapTimeline>;

    mountRef: MutableRefObject<RefElement>;
    centerBlockExpandRef: MutableRefObject<RefElement>;
    leftBladeGroupRef: MutableRefObject<RefElement>;
    rightBladeGroupRef: MutableRefObject<RefElement>;
    l_gamesBladeActiveRef: MutableRefObject<RefElement>;
    l_mediaBladeActiveRef: MutableRefObject<RefElement>;
    l_marketplaceBladeInactiveRef: MutableRefObject<RefElement>;
    l_xboxliveBladeInactiveRef: MutableRefObject<RefElement>;
    l_gamesBladeInactiveRef: MutableRefObject<RefElement>;
    r_mediaBladeInactiveRef: MutableRefObject<RefElement>;
    r_systemBladeInactiveRef: MutableRefObject<RefElement>;

    shiftRight: () => void, 
    shiftLeft: () => void, 
    slideBladesOut: () => void,
    slideBladesBack: () => void,
    gamesSubPageAnimation: () => void,
    gamesSubPageExit: () => void,
    mediaSubPageAnimation: () => void,
    mediaSubPageExit: () => void,
}

export interface DashboardDataItem {
    source: string;
    id: string | number;
    title: string;
    description: string;
    category: string;
    subtitle: string;
}


export interface OrganizedData {
    [category: string]: DashboardDataItem[];
    games: DashboardDataItem[];
    demos: DashboardDataItem[];
    videos: DashboardDataItem[];
    themes: DashboardDataItem[];
    featured: DashboardDataItem[];
  }

  export interface ApiDataReference {
    mockDbData: OrganizedData;
}

export interface SpotlightKeyIdentifier {
    games: DashboardDataItem[];
    demos: DashboardDataItem[];
    videos: DashboardDataItem[];
    themes: DashboardDataItem[];
    featured: DashboardDataItem[];
}

export type SpotlightCategories = keyof SpotlightKeyIdentifier;




export interface MarketplacePageProps {
    mockDbData: SpotlightKeyIdentifier;
    slideBladesAway: () => void;
    slideBladesBack: () => void;
} 
  
export interface XboxlivePageProps {
    foreignExtendGamerProfile: () => void;
    foreignExtendCommunityPage: () => void;
    current_context_index: number;
    guideAnimationRef: GuidePanelAnimation;
}

export interface GamesPageProps {
    foreignExtendGamerProfile: () => void;
    gamesSubPageExit: () => void;
    gamesSubPageAnimation: () => void;
    current_context_index: number;
}

export interface MediaPageProps {
    foreignExtendGamerProfile: () => void;
    mediaSubPageExit: () => void;
    mediaSubPageAnimation: () => void;
    current_context_index: number;
    guideAnimationRef: GuidePanelAnimation;
}

export interface SystemPageProps {
    current_context_index: number|null;
}

export interface NavBladesContainerProps {
    dashboardAnimationState: DashboardBladeAnimation;
}



export interface CustomRootVars extends CSSProperties {
    '--z-depth'?: number | string;
    '--ring-index'?: number | string;
    '--i'?: number | string;
    } 