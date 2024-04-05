import { useState, useEffect, useRef, useCallback , useLayoutEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex, selectTransitionState, bladeTransitionAsync, updateDashboardAnimationStatus } from '../redux_slices/xboxSlice';
import { updateNavigateContext } from "../redux_slices/menuSlice";

export default function useDashboardBladeAnimation() {
  // Refs
  const mountRef = useRef(null);
  const shiftRightTransition = useRef(null);
  const shiftRightXboxLive = useRef(null);
  const shiftRightGames = useRef(null);
  const shiftRightMedia = useRef(null);
  const shiftRightSystem = useRef(null);

  const shiftLeftTransition = useRef(null);
  const initializeRef = useRef(null);

  const centerBlockExpandRef = useRef(null);
  const centerBlockExpandAnimate = useRef(null);


  const leftBladeGroupRef = useRef(null);
  const rightBladeGroupRef = useRef(null);
  const slideAwayAnimate = useRef(null);

  const gamesTabAnimate = useRef(null);
  const mediaTabAnimate = useRef(null);


  const l_gamesBladeActiveRef = useRef(null);
  const l_mediaBladeActiveRef = useRef(null);

  const l_marketplaceBladeInactiveRef = useRef(null);
  const l_xboxliveBladeInactiveRef = useRef(null);
  const l_gamesBladeInactiveRef = useRef(null);
  const r_mediaBladeInactiveRef = useRef(null);
  const r_systemBladeInactiveRef = useRef(null);


  

  // Redux state
  const current_context_index = useSelector(selectContextIndex) || 0;

  const is_transitioning = useSelector(selectTransitionState);

  const dispatch = useDispatch();

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
    // console.log(is_transitioning);

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
  
  
      dispatch(updateDashboardAnimationStatus(true));
    };

      initializeTimeline();

  },[]);


  const mainMenuMap = ['main_menu_marketplace', 'main_menu_xboxlive', 'main_menu_games', 'main_menu_media', 'main_menu_system'];

  const shiftRight = () => {

    if (current_context_index + 1 < 5) {

      switch(current_context_index) {
        case 0:  
              shiftRightTransition.current.play();
               break;

        case 1: 
              shiftRightXboxLive.current.play();
              break;

        case 2: 
              shiftRightGames.current.play();
              break;

        case 3: 
              shiftRightMedia.current.play();
              break;

        case 4: 
              shiftRightSystem.current.play();
              break;

        case 'default': 
              break;
      }

      dispatch(bladeTransitionAsync());

      centerBlockExpandAnimate.current.play();

      dispatch(updateNavigateContext(mainMenuMap[current_context_index + 1]));


      debounceDispatchInput(navigateTo(current_context_index + 1));

    }



    }


  const shiftLeft = () => {
    if (current_context_index - 1 >= 0) {

      switch(current_context_index) {

        case 1: 
              shiftRightTransition.current.reverse();
              break;

        case 2: 
              shiftRightXboxLive.current.reverse();
              break;

        case 3: 
              shiftRightGames.current.reverse();
              break;

        case 4: 
              shiftRightMedia.current.reverse();
              break;

        case 'default': 
              break;
      }

      dispatch(bladeTransitionAsync());

      centerBlockExpandAnimate.current.play();

      dispatch(updateNavigateContext(mainMenuMap[current_context_index - 1]));


      debounceDispatchInput(navigateTo(current_context_index - 1));

    }

  };

  const slideBladesOut = () => {
      slideAwayAnimate.current.play();
      centerBlockExpandAnimate.current.play();
  }

  const slideBladesBack = () => {
    slideAwayAnimate.current.reverse();
    // slideBackAnimate.current.play();
  }

  const gamesSubPageAnimation = () => {
    gamesTabAnimate.current.play();
  }
  const gamesSubPageExit = () => {
    // gamesTabReverse.current.play();
    gamesTabAnimate.current.reverse();
  }

  const mediaSubPageAnimation = () => {
    mediaTabAnimate.current.play();
  }

  const mediaSubPageExit = () => {
    // mediaTabReverse.current.play();
    mediaTabAnimate.current.reverse();
  }

  // Keyboard event listeners
  useLayoutEffect(() => {
    const navigateUsingKeys = (e) => {
      if (e !== undefined) {
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
      }
    };

    navigateUsingKeys();

    window.addEventListener('keydown', navigateUsingKeys);

    return () => {
      window.removeEventListener('keydown', navigateUsingKeys);
    };
  }, [current_context_index, isInitialized]);



  return {
    mountRef, 
    centerBlockExpandRef, 

    leftBladeGroupRef,
    rightBladeGroupRef,

    l_marketplaceBladeInactiveRef,
    l_xboxliveBladeInactiveRef,
    l_gamesBladeInactiveRef,
    
    l_mediaBladeActiveRef,
    l_gamesBladeActiveRef,

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