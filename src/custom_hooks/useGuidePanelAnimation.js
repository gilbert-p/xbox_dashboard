import { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';

import { selectGuideActiveState,
         updateGuideActiveState,
         updateShowBlades,
         updateExternalPanelNavigate,
         selectExternalNavigationState,
        
         selectSubMenuNavActive,
         selectNavigationContext,
         updateNavigateContext} from '../xbox_dashboard/menuSlice';

export default function useGuidePanelAnimation() {
    const revealGuideMenu = useRef(null);
    const extendMenu = useRef(null);
    const closeExtendedMenu = useRef(null);
    const guideSettingsAnimate = useRef(null);

    const guideMenuRef = useRef(null);
    const guidePanelRef = useRef(null);
    const guideSettingsRef = useRef(null);

    const revealAboutDashboard = useRef(null);
    const aboutDashboardPageRef = useRef(null);

    const revealGamerProfilePage = useRef(null);
    const gamerProfilePageRef = useRef(null);

    const revealCommunityPage = useRef(null);
    const communityDashboardPageRef = useRef(null);

    const guideSelectThemeRef = useRef(null);
    const showThemeSelection = useRef(null);


    const extendRevealPanel = useRef(null);


    const dispatch = useDispatch();
    const guideActiveState = useSelector(selectGuideActiveState);

    const isExternalNavigate = useSelector(selectExternalNavigationState);

    const isSubMenuActive = useSelector(selectSubMenuNavActive);

    const menuNavigationContext = useSelector(selectNavigationContext);




    useLayoutEffect(()=> {

        const initializeTimeline = () => {



        /*TranslateX
          55% to reveal guide options
          94% to extend panel completely
        */

        revealGuideMenu.current = gsap.timeline();
        
        revealGuideMenu.current
        .to(guideMenuRef.current, { opacity: 1, zIndex: 999,  duration: 0.3 })
        .to(guidePanelRef.current, { translateX: '55%', duration: 0.3 })
        .pause();


        extendMenu.current = gsap.timeline(
        );

        extendMenu.current
        .to(guidePanelRef.current, {translateX: '94%', duration: 0.3})
        .pause();

        closeExtendedMenu.current = gsap.timeline(
            {onComplete: 
                function(){
                            this.time(0).pause(); 
                            extendMenu.current.time(0).pause(); 
                            revealGuideMenu.current.time(0).pause();
                            guideSettingsAnimate.current.time(0).pause();
                          }
            }
        );

        closeExtendedMenu.current
        .to(guidePanelRef.current, {translateX: '0', duration: 0.3})
        .pause();

        extendRevealPanel.current = gsap.timeline();

        extendRevealPanel.current
        .to(guideMenuRef.current, {opacity: 1, zIndex: 999, duration: 0.3 })
        .to(guidePanelRef.current, { translateX: '94%', duration: 0.3})
        .pause();


        guideSettingsAnimate.current = gsap.timeline();

        guideSettingsAnimate.current
        .to(guideSettingsRef.current, {opacity: 0, display: "none", duration: 0.1})
        .pause();


        revealAboutDashboard.current = gsap.timeline();

        revealAboutDashboard.current
        .to(aboutDashboardPageRef.current, {opacity: 1, display: "initial", duration: 0.3})
        .pause();

        revealGamerProfilePage.current = gsap.timeline();

        revealGamerProfilePage.current
        .to(gamerProfilePageRef.current, {opacity: 1, display: "initial", duration: 0.3})
        .pause();


        revealCommunityPage.current = gsap.timeline();

        revealCommunityPage.current
        .to(communityDashboardPageRef.current, {opacity: 1, display: "initial", duration: 0.3})
        .pause();


        showThemeSelection.current = gsap.timeline();

        showThemeSelection.current
        .to(guideSettingsRef.current, {opacity: 0, display: "none", duration: 0.1})
        .to(guideSelectThemeRef.current, {opacity: 1, display: "initial", duration: 0.3})
        .pause();




        

        }
        initializeTimeline();


        const loadTimelineIntoMemory = () => {
            revealGuideMenu.current.pause();
        }

        const delayMilliseconds = 300;
        const timeoutId = setTimeout(loadTimelineIntoMemory, delayMilliseconds);

        return () => {
            clearTimeout(timeoutId);
        }

    },[]);

    const showGuideInitial = () => {
        if(revealGuideMenu.current.time() <= 0) {
            revealGuideMenu.current.play();
        }
        else {
            revealGuideMenu.current.reverse();
        }
    };

    const showThemeMenu = () => {
        if(showThemeSelection.current.time() <= 0) {
            showThemeSelection.current.play();
        }
        else {
            showThemeSelection.current.reverse();
        }
    }

    const showGamerProfile = () => {
        if(revealGamerProfilePage.current.time() <= 0) {
            revealGamerProfilePage.current.play();
        }
        else {
            revealGamerProfilePage.current.reverse();
        }
    }

    const showCommunityPage = () => {
        if(revealCommunityPage.current.time() <= 0) {
            revealCommunityPage.current.play();
        }
        else {
            revealCommunityPage.current.reverse();
        }
    }



    //Action Functions
    const showGuideSettings = () => {

        // console.log("navigation context", menuNavigationContext);
        switch(menuNavigationContext) {
            case 'main_menu':
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
                        dispatch(updateNavigateContext('main_menu'));
                        //update specific context
                        dispatch(updateGuideActiveState('closed'));
                        showGuideInitial();
                        break;
                    case 'theme_select':
                        showGuideInitial();
                        showThemeMenu();

                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext('main_menu'));
                        dispatch(updateShowBlades(true));
                        break;
                    case 'extended_about_dashboard':
                        closeExtendedMenu.current.play();
                        revealAboutDashboard.current.time(0).pause();
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext('main_menu'));
        
                        dispatch(updateShowBlades(true));
                        break;
                    case 'extended_gamer_profile':
                        closeExtendedMenu.current.play();
                        revealGamerProfilePage.current.time(0).pause();
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext('main_menu'));
        
                        dispatch(updateShowBlades(true));
                        break;
                }
                break;

            case 'foreign_extension':

                extendRevealContent(guideActiveState);
                break;
        }
        

        
    };

    const extendRevealContent = (extended_state) => {

        if(extendRevealPanel.current.time() <= 0) {
            extendRevealPanel.current.play();
            guideSettingsAnimate.current.play();

            console.log("extendRevealContent called");
            console.log(extended_state);

            // dispatch(updateExternalPanelNavigate(true));

            switch(extended_state) {
                case 'foreign_gamer_profile':
                    dispatch(updateShowBlades(false));
                    console.log("reveal foreign gamer profile");
                    showGamerProfile();

                    break;
                case 'foreign_community_profile':
                    dispatch(updateShowBlades(false));
                    console.log("reveal foreign community profile");
                    showCommunityPage();
                    break;
                case 'default':
                    break;
            }
        }
        else {
            guideSettingsAnimate.current.reverse();

            // dispatch(updateExternalPanelNavigate(false));

            switch(extended_state) {
                case 'foreign_gamer_profile':
                    dispatch(updateShowBlades(true));
                    dispatch(updateGuideActiveState('closed'));
                    dispatch(updateNavigateContext('main_menu'));
                    extendRevealPanel.current.reverse();
                    guideSettingsAnimate.current.reverse();
                    showGamerProfile();
                    break;
                case 'foreign_community_profile':
                    dispatch(updateShowBlades(true));
                    dispatch(updateGuideActiveState('closed'));
                    dispatch(updateNavigateContext('main_menu'));
                    extendRevealPanel.current.reverse();
                    guideSettingsAnimate.current.reverse();
                    showCommunityPage();
                    break;
                case 'default':
                    break;
            }
        }

    }

    const extendGuideMenu = (extended_state) => {

        if(!extendMenu.current.time() > 0) {
            extendMenu.current.play();
            guideSettingsAnimate.current.play();
            //What to show when extending the menu
            switch(extended_state) {
                case 'extended_about_dashboard':
                    revealAboutDashboard.current.play();
                    break;
                case 'extended_gamer_profile':
                    revealGamerProfilePage.current.play();
                    break;
                case 'default':
                    break;
            }
        }
        else {
            extendMenu.current.reverse();
            guideSettingsAnimate.current.reverse();

            switch(extended_state) {
                case 'extended_about_dashboard':
                    revealAboutDashboard.current.reverse();
                    break;
                case 'extended_gamer_profile':
                    revealGamerProfilePage.current.reverse();
                    break;
                case 'default':
                    break;
            }
        }


    }

    const closeFullMenu = () => {
        closeExtendedMenu.current.play();
    }

    const revealThemeSelection = () => {
        !showThemeSelection.current.time() > 0 ? showThemeSelection.current.play() : showThemeSelection.current.reverse();
    }

    
    const backButtonStateSelection = () => {
        //  guide_panel, external_navigate, marketplace, xboxlive, games, media, system 
        switch(menuNavigationContext) {
            case 'guide_panel_main':
                switch(guideActiveState) {
                    case 'guide_setting_main':
                        dispatch(updateGuideActiveState('closed'));
                        dispatch(updateNavigateContext('main_menu'));
                        dispatch(updateShowBlades(true));
                        showGuideInitial();
                        break;
                    case 'theme_select':
                        dispatch(updateGuideActiveState('guide_setting_main'));
                        showThemeMenu();
                        guideSettingsAnimate.reverse();
                        break;
                    case 'extended_gamer_profile':
                        extendGuideMenu('extended_gamer_profile');
                        guideSettingsAnimate.current.reverse();
                        dispatch(updateGuideActiveState('guide_setting_main'));
                        break;
                    case 'extended_about_dashboard':
                        extendGuideMenu('extended_about_dashboard');
                        guideSettingsAnimate.current.reverse();
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
            
            case 'marketplace':
                dispatch(updateNavigateContext('main_menu'));
                break;
            case 'default':
                break;
        }

    }
    

    return {revealGuideMenu, 
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
            communityDashboardPageRef}
};