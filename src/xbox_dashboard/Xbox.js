import React, {useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import reactFullscreenStatus from "../custom_hooks/useFullscreenStatus";

import styles from './Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';

import useDashboardAnimation from './components/useDashboardBladeAnimation';


import { navigateTo, 
         selectContextIndex,
         selectMarketplacePos,
         selectXboxPos,
         selectGamesPos,
         selectMediaPos,
         selectSystemPos,
         isTrayDisplayed,
         selectBladeContainerWidth,
         selectBladeContainerHeight,
         updateBladeContainerSize,
         selectTransitionDirection,
         selectLastIndexCalled,
         selectBladeSize, 
         updateBladeSize,
        } from './xboxSlice';

import NavBladesContainer from "./components/NavBladesContainer";
import MarketplacePage from "./components/MarketplacePage";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";

const Xbox = (props) => {

    const [isMobileView, setMobileView] = useState(null);
    const [rightButton, setRightButton] = useState(false);
    const [someRef, setSomeRef] = useState(null);

    const dispatch = useDispatch();

            //Using keyboard to initiate animation
            const bladeContainerRef= useDashboardAnimation();

            const testRef = useRef(null);

            useEffect(()=>{
                if(bladeContainerRef['mountRef'].current){
                    testRef.current = bladeContainerRef['mountRef'].current;
                }
            }, [bladeContainerRef, testRef])
    
    
    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const last_index_called = useSelector(selectLastIndexCalled);
    const is_marketplace_rightside = useSelector(selectMarketplacePos);
    const is_xboxlive_rightside = useSelector(selectXboxPos);
    const is_games_rightside = useSelector(selectGamesPos);
    const is_media_rightside = useSelector(selectMediaPos);
    const is_system_rightside = useSelector(selectSystemPos);
    const display_tray = useSelector(isTrayDisplayed);
    const xbox_blade_container_width = useSelector(selectBladeContainerWidth);
    const xbox_blade_container_height = useSelector(selectBladeContainerHeight);
    const transition_direction = useSelector(selectTransitionDirection);


    

    const background_transition_duration = 0.9;
    const background_transition_delay = 0;
    const blade_transition_duration = 0.9;
    const blade_transition_delay = 0;




    //Refs for animating elements
    const xboxBladeContainerRef = useRef(null);
    const xboxliveRef = useRef(null);
    const marketplaceRef = useRef(null);
    const gamesRef = useRef(null);
    const mediaRef = useRef(null);
    const systemRef = useRef(null);
    const xboxBackgroundRef = useRef(null);
    const marketplaceBackgroundRef = useRef(null);
    const gamesBackgroundRef = useRef(null);
    const mediaBackgroundRef = useRef(null);
    const systemBackgroundRef = useRef(null);
    const bladeRef = useRef(null);

    
    //GSAP instance Refs
    const bladeContainerTransition = useRef(null);
    const marketplaceTransition = useRef(null);
    const xboxBladeTransition = useRef(null);
    const gamesBladeTransition = useRef(null);
    const mediaBladeTransition = useRef(null);
    const systemBladeTransition = useRef(null);
    const xboxBackgroundTransition = useRef(null);
    const gamesBackgroundTransition = useRef(null);
    const mediaBackgroundTransition = useRef(null);
    const systemBackgroundTransition = useRef(null);

    

    //Debounced helper functions

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceResizeListener = useCallback(
        debounce((fn) => {
            dispatch(fn);
         }, 500),
         []
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDispatchInput = useCallback(
        debounce((fn) => {
           dispatch(fn);
        }, 200),
        []
      );


    
    //Gets width and height of content container
    useEffect(()=> {
        const updateContainerSize = () => {
            let sizingProperties = {};

            if(xboxBladeContainerRef){
                sizingProperties.width = xboxBladeContainerRef.current.offsetWidth;
                sizingProperties.height = xboxBladeContainerRef.current.offsetHeight;

                if(window.innerWidth <= 900) {
                    setMobileView(true);
                }
                else {
                    setMobileView(false);
                }

                // debounceResizeListener((updateBladeContainerSize(sizingProperties)));
                //TODO create separate function for assigning blade size
                // debounceBladeResize((updateBladeSize(Math.ceil(bladeRef.current.width.baseVal.value))));
            }
        }

            window.addEventListener('resize', updateContainerSize);

            updateContainerSize();

            return () => {
                window.removeEventListener("resize", updateContainerSize);
            }

    }, [debounceResizeListener]);

    
    

      

    return (
        <div>
            <div onClick={()=> {}} className={styles.orientationRequestOverlay}>
            </div>

            <div className={styles.bladeMask}>
            {isMobileView !== null && <NavBladesContainer isMobileView={isMobileView} bladeContainerRef={bladeContainerRef['mountRef']} />}
            
            
            </div>
            <div className={styles.bladeContainerMask}>
            <div className={styles.arrowContextButtonContainer}>
                <div className={styles.xboxHomeLogo}></div>
                <div className={styles.leftArrow} onClick={()=>{bladeContainerRef.shiftLeft()}}></div>
                <div className={styles.rightArrow} onClick={()=>{bladeContainerRef.shiftRight()}}></div>
            </div>
                <div className={styles.mainContainer}>


                    {/* Safe Viewing area */}
                    <div className={styles.pageContentArea} ref={xboxBladeContainerRef}>
                        <MarketplacePage ref={marketplaceBackgroundRef}/>
                        <XboxlivePage current_context_index={current_context_index}/>
                        <GamesPage current_context_index={current_context_index}/>
                        <MediaPage current_context_index={current_context_index}/>
                        <SystemPage current_context_index={current_context_index}/>


                    {/* Buttons, System Tray */}
                    <div className={styles.staticContent}>
                        <div className={styles.curvedGlassOverlay}></div>

                        <div className={styles.topBorder}></div>
                        <div className={styles.bottomBorder}></div>

                        <div className={styles.leftEdge}></div>
                        <div className={styles.rightEdge}></div>

                        <div className={`${styles.systemTrayContainer} ${!display_tray ? transitionStyles.makeTransparent : ''}`}>
                            <div className={styles.trayEllipse}></div>
                            <div className={styles.trayRect}></div>
                            <div className={styles.trayTriangleButton}></div>
                            <div className={styles.trayRectButton}></div>
                            <p>Open Tray</p>
                        </div>
                    </div>
                    </div>
                        <section className={styles.gamesContainer}>

                        </section>
                        
                </div>


            </div>

        </div>
    )
}

export default Xbox

