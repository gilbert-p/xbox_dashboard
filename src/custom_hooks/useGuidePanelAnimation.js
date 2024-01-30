import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex } from '../xbox_dashboard/xboxSlice';

export default function useGuidePanelAnimation() {
    const revealGuideMenu = useRef(null);
    const guideMenuRef = useRef(null);
    const guidePanelRef = useRef(null);

    const guideMenuDOM = useRef(document.getElementById("guideMenuPanel"));

    const [isGuidePanelOpen, setGuidePanelStatus] = useState(false);




    useLayoutEffect(()=> {

            const initializeTimeline = () => {

    //Translate 92% to extend the menu fully
    //55% half open

        revealGuideMenu.current = gsap.timeline(
                {
                // onStart: () => { document.getElementById("guideMenuPanel").style.zIndex = `999`;},
                // onReverseComplete: () => { document.getElementById("guideMenuPanel").style.zIndex = `-1000`}
              }
              );
        
            revealGuideMenu.current
            .to(guideMenuRef.current, { opacity: 1, zIndex: 999,  duration: 0.3 })
            .to(guidePanelRef.current, { translateX: '55%', duration: 0.3 })
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
    const openGuideMenu = () => {
        console.log("opened", revealGuideMenu);

        !revealGuideMenu.current.time() > 0 ? revealGuideMenu.current.play() : revealGuideMenu.current.reverse();
      };


    return {revealGuideMenu, guideMenuRef, guidePanelRef, openGuideMenu}
};