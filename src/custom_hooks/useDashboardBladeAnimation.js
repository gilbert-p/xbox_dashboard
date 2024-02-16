import { useState, useEffect, useRef, useCallback , useLayoutEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex } from '../xbox_dashboard/xboxSlice';

export default function useDashboardBladeAnimation() {
  // Refs
  const mountRef = useRef(null);
  const shiftRightTransition = useRef(null);
  const shiftLeftTransition = useRef(null);
  const initializeRef = useRef(null);
  const revealGuideMenu = useRef(null);
  const guideMenuRef = useRef(null);
  const guideBladeRef = useRef(null);

  // Redux state
  const current_context_index = useSelector(selectContextIndex) || 0;
  const dispatch = useDispatch();

  // State
  const [isInitialized, setIsInitialized] = useState(false);

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
  };
  initializeTimeline();



  useLayoutEffect(()=>{

    const loadTimelineIntoMemory = ()=> {
      setIsInitialized(true);
      initializeRef.current.pause();
      shiftLeftTransition.current.pause();
      shiftRightTransition.current.pause();
    }

    const delayMilliseconds = 300;
    const timeoutId = setTimeout(loadTimelineIntoMemory, delayMilliseconds);



    return () => {
      clearTimeout(timeoutId);
      shiftLeftTransition.current.kill();
      shiftRightTransition.current.kill();
    }
  }, []);






  const shiftRight = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      shiftLeftTransition.current.pause();
      shiftRightTransition.current.pause();
    } else {
      if (current_context_index + 1 < 5) {
        shiftRightTransition.current.play();
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
        debounceDispatchInput(navigateTo(current_context_index - 1));
      }
    }
  };

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



  return { mountRef, shiftRight, shiftLeft };
};