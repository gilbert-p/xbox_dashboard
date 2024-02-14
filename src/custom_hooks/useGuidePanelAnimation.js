import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

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
            // {onComplete: function(){closeExtendedMenu.current.time(0).pause()}}
        );

        extendMenu.current
        .to(guidePanelRef.current, {translateX: '94%', duration: 0.3})
        .pause();

        closeExtendedMenu.current = gsap.timeline(
            {onComplete: function(){this.time(0).pause(); 
                                    extendMenu.current.time(0).pause(); 
                                    revealGuideMenu.current.time(0).pause();
                                    guideSettingsAnimate.current.time(0).pause();
                                    revealAboutDashboard.current.time(0).pause();
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

        }
        initializeTimeline();


        const loadTimelineIntoMemory = () => {
            revealGuideMenu.current.pause();
        }

        const delayMilliseconds = 300;
        const timeoutId = setTimeout(loadTimelineIntoMemory, delayMilliseconds);

        return () => {
            clearTimeout(timeoutId);
            revealGuideMenu.current.kill();
        }

    },[]);


    //Action Function
    const showGuideSettings = () => {
        console.log('opened guide menu');
        !revealGuideMenu.current.time() > 0 ? revealGuideMenu.current.play() : revealGuideMenu.current.reverse();
    };

    const extendGuideMenu = () => {
        !extendMenu.current.time() > 0 ? extendMenu.current.play() : extendMenu.current.reverse();

        guideSettingsAnimate.current.play();

        revealAboutDashboard.current.play();
    }

    const closeFullMenu = () => {
        closeExtendedMenu.current.play();
    }


    return {revealGuideMenu, 
            extendMenu,
            revealAboutDashboard, 
            showGuideSettings,
            extendGuideMenu,
            closeFullMenu,
            guideSettingsAnimate, 
            guideMenuRef, 
            guidePanelRef,
            guideSettingsRef,
            aboutDashboardPageRef,}
};