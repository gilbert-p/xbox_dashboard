import { useRef, useLayoutEffect, useEffect, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app_store/store'; // Adjust the path
import { 
  selectGuideActiveState,
  updateGuideActiveState,
  updateShowBlades,
  selectNavigationContext,
  updateNavigateContext 
} from '../redux_slices/menuSlice';
import { selectContextIndex } from '../redux_slices/xboxSlice';

export default function useGuidePanelAnimation() {
    const revealGuideMenu = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const extendMenu = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const closeExtendedMenu = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const guideSettingsAnimate = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };

    const guideMenuRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };
    const guidePanelRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };
    const guideSettingsRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };

    const revealAboutDashboard = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const aboutDashboardPageRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };

    const revealGamerProfilePage = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const gamerProfilePageRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };

    const revealCommunityPage = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };
    const communityDashboardPageRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };

    const guideSelectThemeRef = useRef<HTMLDivElement | null>(null) as { current: HTMLDivElement | null };
    const showThemeSelection = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };

    const extendRevealPanel = useRef<gsap.core.Timeline | null>(null) as { current: gsap.core.Timeline | null };

    const dispatch: AppDispatch = useDispatch();
    const guideActiveState = useSelector((state: RootState) => selectGuideActiveState(state));
    const menuNavigationContext = useSelector((state: RootState) => selectNavigationContext(state));
    const current_context_index = useSelector((state: RootState) => selectContextIndex(state));





    useLayoutEffect(() => {
        const initializeTimeline = (): void => {
            // TranslateX 55% to reveal guide options 94% to extend panel completely
            revealGuideMenu.current = gsap.timeline();
            revealGuideMenu.current
                .to(guideMenuRef.current, { opacity: 1, zIndex: 999, duration: 0.3 })
                .to(guidePanelRef.current, { translateX: '55%', duration: 0.3 })
                .pause();

            extendMenu.current = gsap.timeline();
            extendMenu.current
                .to(guidePanelRef.current, { translateX: '94%', duration: 0.3 })
                .pause();

            closeExtendedMenu.current = gsap.timeline({
                onComplete: function() {
                    this.time(0).pause();
                    extendMenu.current?.time(0).pause();
                    revealGuideMenu.current?.time(0).pause();
                    guideSettingsAnimate.current?.time(0).pause();
                }
            });

            closeExtendedMenu.current
                .to(guidePanelRef.current, { translateX: '0', duration: 0.3 })
                .pause();

            extendRevealPanel.current = gsap.timeline();
            extendRevealPanel.current
                .to(guideMenuRef.current, { opacity: 1, zIndex: 999, duration: 0.3 })
                .to(guidePanelRef.current, { translateX: '94%', duration: 0.3 })
                .pause();

            guideSettingsAnimate.current = gsap.timeline();
            guideSettingsAnimate.current
                .to(guideSettingsRef.current, { opacity: 0, display: "none", duration: 0.1 })
                .pause();

            revealAboutDashboard.current = gsap.timeline();
            revealAboutDashboard.current
                .to(aboutDashboardPageRef.current, { opacity: 1, display: "initial", duration: 0.3 })
                .pause();

            revealGamerProfilePage.current = gsap.timeline();
            revealGamerProfilePage.current
                .to(gamerProfilePageRef.current, { opacity: 1, display: "initial", duration: 0.3 })
                .pause();

            revealCommunityPage.current = gsap.timeline();
            revealCommunityPage.current
                .to(communityDashboardPageRef.current, { opacity: 1, display: "initial", duration: 0.3 })
                .pause();

            showThemeSelection.current = gsap.timeline();
            showThemeSelection.current
                .to(guideSettingsRef.current, { opacity: 0, display: "none", duration: 0.1 })
                .to(guideSelectThemeRef.current, { opacity: 1, display: "initial", duration: 0.3 })
                .pause();
        };

        initializeTimeline();
    }, []);

    const showGuideInitial = (): void => {
        if (revealGuideMenu.current && revealGuideMenu.current.time() <= 0) {
          revealGuideMenu.current.play();
        } else if (revealGuideMenu.current) {
          revealGuideMenu.current.reverse();
        }
      };

      const showThemeMenu = () => {
        if (showThemeSelection.current && showThemeSelection.current.time() <= 0) {
          showThemeSelection.current.play();
        } else if (showThemeSelection.current) {
          showThemeSelection.current.reverse();
        }
      };
      
      const showGamerProfile = () => {
        if (revealGamerProfilePage.current && revealGamerProfilePage.current.time() <= 0) {
          revealGamerProfilePage.current.play();
        } else if (revealGamerProfilePage.current) {
          revealGamerProfilePage.current.reverse();
        }
      };
      
      const showCommunityPage = () => {
        if (revealCommunityPage.current && revealCommunityPage.current.time() <= 0) {
          revealCommunityPage.current.play();
        } else if (revealCommunityPage.current) {
          revealCommunityPage.current.reverse();
        }
      };


    const mainMenuMap = ['main_menu_marketplace', 'main_menu_xboxlive', 'main_menu_games', 'main_menu_media', 'main_menu_system'];
    type ForeignExtendedState = 'foreign_gamer_profile' | 'foreign_community_profile' | 'extended_gamer_profile' | 'default'; 
    type ExtendedState = 'extended_about_dashboard' | 'extended_gamer_profile' | 'default';

      
    const showGuideSettings = (): void => {

        switch(menuNavigationContext) {
            case mainMenuMap[current_context_index]:
                //in guide panel and in initial half open panel
                dispatch(updateNavigateContext('guide_panel_main'));
                dispatch(updateGuideActiveState('guide_setting_main'));

                switch(guideActiveState) {
                    case 'closed':
                        showGuideInitial();
                        dispatch(updateGuideActiveState('guide_setting_main'));
        
                        dispatch(updateShowBlades(false));
                        break;
        
                    case 'external_gamer_profile':
                        extendRevealContent('extended_gamer_profile');
                        break;
        
                    case 'default':
                        break;
                }
                break;
            case 'guide_panel_main':

                switch(guideActiveState){
                    case 'guide_setting_main':
                        dispatch(updateShowBlades(true));
                        //update outer context
                        dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                        //update specific context
                        dispatch(updateGuideActiveState('closed'));
                        showGuideInitial();
                        break;
                    case 'theme_select':
                        showGuideInitial();
                        showThemeMenu();

                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                        dispatch(updateShowBlades(true));
                        break;
                    case 'extended_about_dashboard':
                      if(closeExtendedMenu.current){
                        closeExtendedMenu.current.play();
                        revealAboutDashboard.current?.time(0).pause();
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                      }

        
                        dispatch(updateShowBlades(true));
                        break;
                    case 'extended_gamer_profile':
                      if(closeExtendedMenu.current){
                        closeExtendedMenu.current.play();
                        revealGamerProfilePage.current?.time(0).pause();
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                        dispatch(updateShowBlades(true));
                      }
                        break;
                }
                break;

            case 'foreign_extension':

                extendRevealContent(guideActiveState as ForeignExtendedState);
                break;
        }
        

        
    };
    

    const extendRevealContent = (extended_state: ForeignExtendedState): void => {
      
        if (extendRevealPanel.current && extendRevealPanel.current.time() <= 0) {
          extendRevealPanel.current.play();
          if (guideSettingsAnimate.current) {
            guideSettingsAnimate.current.play();
          }
      
          switch (extended_state) {
            case 'foreign_gamer_profile':
              dispatch(updateShowBlades(false));
              showGamerProfile();
              break;
            case 'foreign_community_profile':
              dispatch(updateShowBlades(false));
              showCommunityPage();
              break;
            default:
              break;
          }
        } else if (guideSettingsAnimate.current) {
          guideSettingsAnimate.current.reverse();
      
          switch (extended_state) {
            case 'foreign_gamer_profile':
            case 'foreign_community_profile':
              dispatch(updateShowBlades(true));
              dispatch(updateGuideActiveState('closed'));
              dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
              if (extendRevealPanel.current) {
                extendRevealPanel.current.reverse();
              }
              if (guideSettingsAnimate.current) {
                guideSettingsAnimate.current.reverse();
              }
              if (extended_state === 'foreign_gamer_profile') {
                showGamerProfile();
              } else if (extended_state === 'foreign_community_profile') {
                showCommunityPage();
              }
              break;
            default:
              break;
          }
        }
      };

      const extendGuideMenu = (extended_state: ExtendedState): void => {
      
        if (extendMenu.current && extendMenu.current.time() <= 0) {
          extendMenu.current.play();
          if (guideSettingsAnimate.current) {
            guideSettingsAnimate.current.play();
          }
      
          switch (extended_state) {
            case 'extended_about_dashboard':
              if (revealAboutDashboard.current) {
                revealAboutDashboard.current.play();
              }
              break;
            case 'extended_gamer_profile':
              if (revealGamerProfilePage.current) {
                revealGamerProfilePage.current.play();
              }
              break;
            default:
              break;
          }
        } else if (guideSettingsAnimate.current) {
          if (extendMenu.current) {
            extendMenu.current.reverse();
          }
          if (guideSettingsAnimate.current) {
            guideSettingsAnimate.current.reverse();
          }
      
          switch (extended_state) {
            case 'extended_about_dashboard':
              if (revealAboutDashboard.current) {
                revealAboutDashboard.current.reverse();
              }
              break;
            case 'extended_gamer_profile':
              if (revealGamerProfilePage.current) {
                revealGamerProfilePage.current.reverse();
              }
              break;
            default:
              break;
          }
        }
      };

    const closeFullMenu = (): void => {
        if (closeExtendedMenu.current) {
          closeExtendedMenu.current.play();
        }
      };

      const revealThemeSelection = (): void => {
        if (showThemeSelection.current) {
          if (showThemeSelection.current.time() <= 0) {
            showThemeSelection.current.play();
          } else {
            showThemeSelection.current.reverse();
          }
        }
      };


    const backButtonStateSelection = (): void => {
        //  guide_panel, external_navigate, marketplace, xboxlive, games, media, system 
        switch(menuNavigationContext) {
            case 'guide_panel_main':
                switch(guideActiveState) {
                    case 'guide_setting_main':
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                        dispatch(updateShowBlades(true));
                        showGuideInitial();
                        break;
                    case 'theme_select':
                        dispatch(updateGuideActiveState('guide_setting_main'));
                        showThemeMenu();
                        guideSettingsAnimate.current?.reverse();
                        break;
                    case 'extended_gamer_profile':
                        extendGuideMenu('extended_gamer_profile');
                        guideSettingsAnimate.current?.reverse();
                        dispatch(updateGuideActiveState('guide_setting_main'));
                        break;
                    case 'extended_about_dashboard':
                        extendGuideMenu('extended_about_dashboard');
                        guideSettingsAnimate.current?.reverse();
                        dispatch(updateGuideActiveState('guide_setting_main'));
                        break;
                }
                break;
            case 'foreign_extension':
                switch(guideActiveState) {
                    case 'foreign_gamer_profile':
                        extendRevealContent(guideActiveState);
                        break;
                    case 'foreign_community_profile':
                        extendRevealContent(guideActiveState);
                        break;
                }
                break;
            
            case 'main_menu_marketplace':
                dispatch(updateNavigateContext(mainMenuMap[current_context_index]));
                break;
            case 'default':
                break;
        }

    }


    return {
        revealGuideMenu, 
        extendMenu,
        revealAboutDashboard, 
        showGuideSettings,
        extendGuideMenu,
        closeFullMenu,
        extendRevealContent,
        revealThemeSelection,
        backButtonStateSelection,
        guideSettingsAnimate, 
        guideMenuRef, 
        guidePanelRef,
        guideSettingsRef,
        aboutDashboardPageRef,
        gamerProfilePageRef,
        showThemeSelection,
        guideSelectThemeRef,
        communityDashboardPageRef
        };
};