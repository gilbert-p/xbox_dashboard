import React, {useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import reactFullscreenStatus from "../custom_hooks/useFullscreenStatus";

import styles from './Dashboard.module.css';
import transitionStyles from '../styles/TransitionStyles.module.css';


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
         updateBladeSize} from './xboxSlice';

import NavBladesContainer from "./components/NavBladesContainer";
import MarketplacePage from "./components/MarketplacePage";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";

const Xbox = (props) => {

    const [isMobileView, setMobileView] = useState(null);

    const dispatch = useDispatch();
    
    
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

    


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceResizeListener = useCallback(
        debounce((fn) => {
            dispatch(fn);
         }, 500),
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


    useLayoutEffect(()=> {

        const getTransitionDirection = () => {

            bladeContainerTransition.current = {};

            let shift_offset = (Math.abs(current_context_index - last_index_called));


            if(transition_direction === "left") {
                if(xbox_blade_container_height <= 575) {
                    bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `-=${shift_offset * 20}`, duration: 0.3});
                }
                else {
                    bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `-=${shift_offset * 40}`, duration: 0.3});
                }

            }
            else {
                if(xbox_blade_container_height <= 575) {
                    bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `+=${shift_offset * 20}`, duration: 0.3});
                }
                else {
                    bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `+=${shift_offset * 40}`, duration: 0.3});
                }
            }

        };
        // getTransitionDirection();

        return () => {
            bladeContainerTransition.current = {};
        }

        
    },[current_context_index]);




    
    //Runs on first render to initialize background slides
    useEffect(()=> {
        // xboxBackgroundTransition.current = gsap.timeline().to(xboxBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        // gamesBackgroundTransition.current = gsap.timeline().to(gamesBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        // mediaBackgroundTransition.current = gsap.timeline().to(mediaBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        // systemBackgroundTransition.current = gsap.timeline().to(systemBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        
    }, [xbox_blade_container_width, xbox_blade_container_height]);

    useEffect(()=> {
        const moveBackground = () => {
            switch(current_context_index) {
                case 0:

                    xboxBackgroundTransition.current.play();
                    gamesBackgroundTransition.current.play();
                    mediaBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();
                break;
                case 1:

                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.play();
                    gamesBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();


                break;
                case 2:

                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();

                break;
                case 3:

                    mediaBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    systemBackgroundTransition.current.play();

                break;
                case 4:

                    systemBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.reverse().delay(background_transition_delay);
                break;
                default:
                break;
            }
        };



        // moveBackground();


    }, [current_context_index,xbox_blade_container_width, xbox_blade_container_height]);



    //Debounced helper functions

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDispatchInput = useCallback(
        debounce((fn) => {
           dispatch(fn);
        }, 200),
        []
      );
      


    //Keyboard event listeners
    useEffect((e)=> {
        const navigateUsingKeys = (e) => {
            if(e !== undefined) {
                switch(e.key) {
                    case "ArrowUp":
                    break;
                    case "ArrowRight":
                        if((current_context_index + 1) < 5) {
                            debounceDispatchInput(navigateTo(current_context_index + 1));
                            
                        }
                    break;
                    case "ArrowDown":
                    break;
                    case "ArrowLeft":
                        if((current_context_index - 1) >= 0) {
                            debounceDispatchInput(navigateTo(current_context_index - 1));
                        }
                    break;
                    default:
                    break;
                }
            }
        }
        navigateUsingKeys(e);

        window.addEventListener("keydown", navigateUsingKeys);


        return () => {
            window.removeEventListener("keydown", navigateUsingKeys);
        }


    }, [current_context_index, debounceDispatchInput])




    return (
        <div>
            <div onClick={()=> {}} className={styles.orientationRequestOverlay}>
            </div>

            <div className={styles.bladeMask}>
            {isMobileView !== null && <NavBladesContainer isMobileView={isMobileView}/>}
            </div>
            <div className={styles.bladeContainerMask}>
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

