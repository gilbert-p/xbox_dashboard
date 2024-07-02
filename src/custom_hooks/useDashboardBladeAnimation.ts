import { useState, useEffect, useRef, useCallback , useLayoutEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex, selectTransitionState, bladeTransitionAsync, } from '../redux_slices/xboxSlice';
import { updateNavigateContext } from "../redux_slices/menuSlice";

import { RootState, AppDispatch } from '../app_store/store';
import { DashboardBladeAnimation, RefElement, GsapTimeline } from '../custom_types/utilityTypes';

export default function useDashboardBladeAnimation(): DashboardBladeAnimation {
  // Refs
  const mountRef = useRef<RefElement>(null);
  const shiftRightTransition = useRef<GsapTimeline>(null);
  const shiftRightXboxLive = useRef<GsapTimeline>(null);
  const shiftRightGames = useRef<GsapTimeline>(null);
  const shiftRightMedia = useRef<GsapTimeline>(null);
  const shiftRightSystem = useRef<GsapTimeline>(null);
  
  const shiftLeftTransition = useRef<GsapTimeline>(null);
  const initializeRef = useRef<GsapTimeline>(null);
  
  const centerBlockExpandRef = useRef<RefElement>(null);
  const centerBlockExpandAnimate = useRef<GsapTimeline>(null);
  
  const leftBladeGroupRef = useRef<RefElement>(null);
  const rightBladeGroupRef = useRef<RefElement>(null);
  const slideAwayAnimate = useRef<GsapTimeline>(null);
  
  const gamesTabAnimate = useRef<GsapTimeline>(null);
  const mediaTabAnimate = useRef<GsapTimeline>(null);
  
  const l_gamesBladeActiveRef = useRef<RefElement>(null);
  const l_mediaBladeActiveRef = useRef<RefElement>(null);
  
  const l_marketplaceBladeInactiveRef = useRef<RefElement>(null);
  const l_xboxliveBladeInactiveRef = useRef<RefElement>(null);
  const l_gamesBladeInactiveRef = useRef<RefElement>(null);
  const r_mediaBladeInactiveRef = useRef<RefElement>(null);
  const r_systemBladeInactiveRef = useRef<RefElement>(null);


  

  // Redux state
  const dispatch: AppDispatch = useDispatch();
  const current_context_index = useSelector((state: RootState) => selectContextIndex(state));

  // State
  const [isInitialized, setIsInitialized] = useState(true);

  // Debounce dispatch input
  const debounceDispatchInput = useCallback(
    debounce((fn) => {
      dispatch(fn);
    }, 200),
    []
  );

 



  useLayoutEffect(()=>{

    const initializeTimeline = () => {
      // GSAP Timelines
      
      initializeRef.current = gsap.timeline();

      initializeRef.current.to(mountRef.current, { opacity: 1, duration: 0.2 }).pause();
      shiftLeftTransition.current = gsap.timeline().to(mountRef.current, { x: '+=55px', duration: 0.3 }).pause();

      shiftRightTransition.current = gsap.timeline();
      shiftRightTransition.current.to(mountRef.current, { x: '-=55px', duration: 0.3 }).pause();


      shiftRightXboxLive.current = gsap.timeline();
      shiftRightXboxLive.current.to(mountRef.current, {x: '-=55px', duration: 0.3}).pause();

      shiftRightGames.current = gsap.timeline();
      shiftRightGames.current.to(mountRef.current, {x: '-=55px', duration: 0.3}).pause();

      shiftRightMedia.current = gsap.timeline();
      shiftRightMedia.current.to(mountRef.current, {x: '-=55px', duration: 0.3}).pause();
      
      shiftRightSystem.current = gsap.timeline();
      shiftRightSystem.current.to(mountRef.current, {x: '-=55px', duration: 0.3}).pause();
  
  
  
      centerBlockExpandAnimate.current = gsap.timeline({onComplete: function(){this.progress(0).pause()}});
 
      centerBlockExpandAnimate.current    .to(centerBlockExpandRef.current, {height: '350px', opacity: 1, duration: 0.1})
                                          .to(centerBlockExpandRef.current, {height: '350px', opacity: 0.9, duration: 0.1})
                                          .to(centerBlockExpandRef.current, {height: '630px', opacity: 0.7, duration: 0.33})
                                          .to(centerBlockExpandRef.current, {height: '600px', opacity: 0.5, duration: 0.33})
                                          .to(centerBlockExpandRef.current, {height: '600px', opacity: 0, duration: 0.1})
                                          .to(centerBlockExpandRef.current, {height: '350px', opacity: 0, duration: 0.1})
                                          .pause();
  
      slideAwayAnimate.current = gsap.timeline({defaults:{duration: 0.5, opacity: 1}});
      
      slideAwayAnimate.current.to(leftBladeGroupRef.current, {x: '-=200px', opacity: 0})
                              .to(rightBladeGroupRef.current, {x: '+=200px', opacity: 0}, "-=0.5")
                              .pause();
  
  
      gamesTabAnimate.current = gsap.timeline({defaults:{duration: 0.5}});
  
      gamesTabAnimate.current
                             .to(l_marketplaceBladeInactiveRef.current, {x: '-=200px', opacity: 0})
                             .to(l_xboxliveBladeInactiveRef.current, {x: '-200px', opacity: 0}, "<")
                             .to(r_mediaBladeInactiveRef.current, {x: '+200px', opacity: 0}, "<")
                             .to(r_systemBladeInactiveRef.current, {x: '+200px', opacity: 0}, "<")
                             .to(l_gamesBladeActiveRef.current, {x: '-=20px',  duration: 0.5, delay:0.1 }, "<")
                             .pause();
  
  
      mediaTabAnimate.current = gsap.timeline({defaults:{duration: 0.5}});
  
      mediaTabAnimate.current
                            .to(l_marketplaceBladeInactiveRef.current, {x: '-=200px', opacity: 0})
                            .to(l_xboxliveBladeInactiveRef.current, {x: '-=200px', opacity: 0}, "<")
                            .to(l_gamesBladeInactiveRef.current, {x: '-=200px', opacity: 0}, "<")
                            .to(r_systemBladeInactiveRef.current, {x: '+=200px', opacity: 0}, "<")
                            .to(l_mediaBladeActiveRef.current, {x: '-=20px', duration: 0.5, delay:0.1 }, "<")
                            .pause();
  
  
    };

      initializeTimeline();

  },[]);


  const mainMenuMap = ['main_menu_marketplace', 'main_menu_xboxlive', 'main_menu_games', 'main_menu_media', 'main_menu_system'];

  const shiftRight = () => {

    if (current_context_index + 1 < 5) {

      switch(current_context_index) {
        case 0:  
              shiftRightTransition.current?.play();
               break;

        case 1: 
              shiftRightXboxLive.current?.play();
              break;

        case 2: 
              shiftRightGames.current?.play();
              break;

        case 3: 
              shiftRightMedia.current?.play();
              break;

        case 4: 
              shiftRightSystem.current?.play();
              break;

        default: 
              break;
      }

      centerBlockExpandAnimate.current?.play();

      dispatch(updateNavigateContext(mainMenuMap[current_context_index + 1]));


      debounceDispatchInput(navigateTo(current_context_index + 1));

    }



    }


  const shiftLeft = () => {
    if (current_context_index - 1 >= 0) {

      switch(current_context_index) {

        case 1: 
              shiftRightTransition.current?.reverse();
              break;

        case 2: 
              shiftRightXboxLive.current?.reverse();
              break;

        case 3: 
              shiftRightGames.current?.reverse();
              break;

        case 4: 
              shiftRightMedia.current?.reverse();
              break;

        default: 
              break;
      }

      centerBlockExpandAnimate.current?.play();

      dispatch(updateNavigateContext(mainMenuMap[current_context_index - 1]));


      debounceDispatchInput(navigateTo(current_context_index - 1));

    }

  };

  const slideBladesOut = () => {
      slideAwayAnimate.current?.play();
      centerBlockExpandAnimate.current?.play();
  }

  const slideBladesBack = () => {
    slideAwayAnimate.current?.reverse();
  }

  const gamesSubPageAnimation = () => {
    gamesTabAnimate.current?.play();
  }
  const gamesSubPageExit = () => {
    gamesTabAnimate.current?.reverse();
  }

  const mediaSubPageAnimation = () => {
    mediaTabAnimate.current?.play();
  }

  const mediaSubPageExit = () => {
    mediaTabAnimate.current?.reverse();
  }

  // Keyboard event listeners
  useLayoutEffect(() => {
    const navigateUsingKeys = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          break;
        case 'ArrowRight':
          shiftRight();
          break;
        case 'ArrowDown':
          break;
        case 'ArrowLeft':
          shiftLeft();
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', navigateUsingKeys);
  
    return () => {
      window.removeEventListener('keydown', navigateUsingKeys);
    };
  }, [current_context_index, isInitialized]);



  return {
    initializeRef,
    shiftLeftTransition,
    shiftRightTransition,
    shiftRightXboxLive,
    shiftRightGames,
    shiftRightMedia,
    shiftRightSystem,
    centerBlockExpandAnimate ,
    slideAwayAnimate,
    gamesTabAnimate,
    mediaTabAnimate,

    mountRef,
    centerBlockExpandRef,
    leftBladeGroupRef,
    rightBladeGroupRef,
    l_gamesBladeActiveRef,
    l_mediaBladeActiveRef,
    l_marketplaceBladeInactiveRef,
    l_xboxliveBladeInactiveRef,
    l_gamesBladeInactiveRef,
    r_mediaBladeInactiveRef,
    r_systemBladeInactiveRef,

    shiftRight, 
    shiftLeft, 
    slideBladesOut,
    slideBladesBack,
    gamesSubPageAnimation,
    gamesSubPageExit,
    mediaSubPageAnimation,
    mediaSubPageExit,
  };
};