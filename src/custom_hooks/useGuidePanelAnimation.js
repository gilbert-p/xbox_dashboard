import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';

import { selectGuideActiveState,
         updateGuideActiveState,
         updateShowBlades } from '../xbox_dashboard/menuSlice';

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

    const guideSelectThemeRef = useRef(null);
    const showThemeSelection = useRef(null);

    const backButtonRef = useRef(null);
    const backButtonAction = useRef(null);


    const dispatch = useDispatch();
    const guideActiveState = useSelector(selectGuideActiveState);


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


        showThemeSelection.current = gsap.timeline();

        showThemeSelection.current
        .to(guideSettingsRef.current, {opacity: 0, display: "none", duration: 0.1})
        .to(guideSelectThemeRef.current, {opacity: 1, display: "initial", duration: 0.3})
        .pause();


        backButtonAction.current = gsap.timeline();


        

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


    //Action Functions
    const showGuideSettings = () => {

        switch(guideActiveState) {
            case 'closed':
                revealGuideMenu.current.play();
                dispatch(updateGuideActiveState('guide_setting_main'));

                dispatch(updateShowBlades(false));
                break;
            case 'guide_setting_main':
                revealGuideMenu.current.reverse();
                dispatch(updateGuideActiveState('closed'));

                dispatch(updateShowBlades(true));
                break;
            case 'extended_about_dashboard':
                closeExtendedMenu.current.play();
                revealAboutDashboard.current.time(0).pause();
                dispatch(updateGuideActiveState('closed'));

                dispatch(updateShowBlades(true));
                break;
            case 'extended_gamer_profile':
                closeExtendedMenu.current.play();
                revealGamerProfilePage.current.time(0).pause();
                dispatch(updateGuideActiveState('closed'));

                dispatch(updateShowBlades(true));
                break;
            case 'theme_select':
                revealGuideMenu.current.reverse();
                showThemeSelection.current.reverse();
                dispatch(updateGuideActiveState('closed'));

                dispatch(updateShowBlades(true));
                break;
            case 'default':
                break;
        }
    };

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
        switch(guideActiveState) {
            case 'guide_setting_main':
                revealGuideMenu.current.reverse();
                dispatch(updateGuideActiveState('closed'));

                dispatch(updateShowBlades(true));
                break;
            case 'extended_about_dashboard':
                extendGuideMenu('extended_about_dashboard');
                guideSettingsAnimate.current.reverse();
                dispatch(updateGuideActiveState('guide_setting_main'));
                break;
            case 'extended_gamer_profile':
                extendGuideMenu('extended_gamer_profile');
                guideSettingsAnimate.current.reverse();
                dispatch(updateGuideActiveState('guide_setting_main'));
                break;
            case 'theme_select':
                showThemeSelection.current.reverse();
                dispatch(updateGuideActiveState('guide_setting_main'));
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
            revealThemeSelection,
            backButtonStateSelection,
            guideSettingsAnimate, 
            guideMenuRef, 
            guidePanelRef,
            guideSettingsRef,
            aboutDashboardPageRef,
            gamerProfilePageRef,
            showThemeSelection,
            guideSelectThemeRef}
};