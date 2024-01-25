import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex } from '../xbox_dashboard/xboxSlice';

export default function useGuidePanelAnimation() {
    const revealGuideMenu = useRef(null);
    const guideMenuRef = useRef(null);
    const guideBladeRef = useRef(null);


    const initializeTimeline = () => {

    //Translate 92% to extend the menu fully
    //55% half open

    revealGuideMenu.current = gsap.timeline({
        onStart: () => { document.getElementById("guideMenuPanel").style.zIndex = `999`},
        onReverseComplete: () => { document.getElementById("guideMenuPanel").style.zIndex = `-1000`}
      });

    revealGuideMenu.current
    .to(guideMenuRef.current, { opacity: 1, duration: 0.3 })
    .to(guideBladeRef.current, { translateX: '55%', duration: 0.3 })
    .pause();
  
    }

    initializeTimeline();

    useEffect(()=> {
        const loadTimelineIntoMemory = () => {
            revealGuideMenu.pause();
        }

        const delayMilliseconds = 300;
        const timeoutId = setTimeout(loadTimelineIntoMemory, delayMilliseconds);

        return () => {
            clearTimeout(timeoutId);
            revealGuideMenu.current.kill();
        }
    });


    //Action Function
    const openGuideMenu = () => {

        !revealGuideMenu.current.time() > 0 ? revealGuideMenu.current.play() : revealGuideMenu.current.reverse();
      };


    return {guideMenuRef, guideBladeRef, openGuideMenu}
}