import { useState, useEffect, useRef, useCallback , useLayoutEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex, selectTransitionState, bladeTransitionAsync } from '../xbox_dashboard/xboxSlice';

export default function useDashboardBladeAnimation() {
  // Refs
  const mountRef = useRef(null);
  const shiftRightTransition = useRef(null);
  const shiftLeftTransition = useRef(null);
  const initializeRef = useRef(null);

  const centerBlockExpandRef = useRef(null);
  const centerBlockExpandAnimate = useRef(null);

  const dashboardUnderlayRef = useRef(null);
  const dashboardUnderlayReveal = useRef(null);

  const leftBladeGroupRef = useRef(null);
  const rightBladeGroupRef = useRef(null);
  const slideAwayAnimate = useRef(null);

  const slideBackAnimate = useRef(null);

  

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

  const initializeTimeline = () => {
    // GSAP Timelines
    
    initializeRef.current = gsap.timeline().to(mountRef.current, { opacity: 1, duration: 0.2 }).pause();
    shiftLeftTransition.current = gsap.timeline().to(mountRef.current, { x: '+=55px', duration: 0.3 }).pause();
    shiftRightTransition.current = gsap.timeline().to(mountRef.current, { x: '-=55px', duration: 0.3 }).pause();


    dashboardUnderlayReveal.current = gsap.timeline().to(dashboardUnderlayRef.current, {opacity: 1, delay:0.7, duration: 0.5}).pause();


    centerBlockExpandAnimate.current = gsap.timeline({defaults:{ease: "elastic.out(1,0.3)"}});

    centerBlockExpandAnimate.current = gsap.timeline().to(centerBlockExpandRef.current, {height: '350px', opacity: 1, duration: 0.1})
                                                      .to(centerBlockExpandRef.current, {height: '350px', opacity: 0.9, duration: 0.1})
                                                      .to(centerBlockExpandRef.current, {height: '630px', opacity: 0.7, duration: 0.33})
                                                      .to(centerBlockExpandRef.current, {height: '600px', opacity: 0.5, duration: 0.33})
                                                      .to(centerBlockExpandRef.current, {height: '600px', opacity: 0, duration: 0.1})
                                                      .to(centerBlockExpandRef.current, {height: '350px', opacity: 0, duration: 0.1})
                                                      .pause();

    slideAwayAnimate.current = gsap.timeline({defaults:{duration: 0.5, ease: "power2.out", opacity: 1}});
    
    slideAwayAnimate.current.to(leftBladeGroupRef.current, {x: '-=200px', opacity: 0})
                            .to(rightBladeGroupRef.current, {x: '+=200px', opacity: 0}, "-=0.5")
                            .pause();

    slideBackAnimate.current = gsap.timeline({defaults:{duration: 0.5, ease: "power2.out", opacity: 0}});

    slideBackAnimate.current.to(leftBladeGroupRef.current, {x: '+=200px', opacity: 1})
                            .to(rightBladeGroupRef.current, {x: '-=200px', opacity: 1}, "-=0.5")
                            .pause();


  };
  initializeTimeline();


  useEffect(()=>{
    console.log(is_transitioning);
  },[is_transitioning]);




  const shiftRight = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      shiftLeftTransition.current.pause();
      shiftRightTransition.current.pause();
    } else {
      if (current_context_index + 1 < 5) {

        dispatch(bladeTransitionAsync());

        shiftRightTransition.current.play();

        centerBlockExpandAnimate.current.play();

        dashboardUnderlayReveal.current.play();


        debounceDispatchInput(navigateTo(current_context_index + 1));
      }
    }
  };

  const shiftLeft = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      shiftLeftTransition.current.pause();
      shiftRightTransition.current.pause();
    } else {
      if (current_context_index - 1 >= 0) {
        shiftLeftTransition.current.play();

        centerBlockExpandAnimate.current.play();

        debounceDispatchInput(navigateTo(current_context_index - 1));
      }
    }
  };

  const slideBladesOut = () => {
      slideAwayAnimate.current.play();
      centerBlockExpandAnimate.current.play();
  }

  const slideBladesBack = () => {
    slideBackAnimate.current.play();
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



  return { mountRef, 
    centerBlockExpandRef, 
    dashboardUnderlayRef, 
    leftBladeGroupRef,
    rightBladeGroupRef,

    shiftRight, 
    shiftLeft, 
    slideBladesOut,
    slideBladesBack};
};