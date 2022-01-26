import React, {useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import reactFullscreenStatus from "../custom_hooks/useFullscreenStatus";

import styles from './Dashboard.module.css';
import pageGridStyles from '../styles/PageGrid.module.css';
import profileCardStyles from '../styles/ProfileCard.module.css';
import transitionStyles from '../styles/TransitionStyles.module.css';
import marketplaceStyles from './Marketplace.module.css';
import xboxliveStyles from '../styles/Xboxlive.module.css';
import descriptionContentStyles from "../styles/DescriptionContainer.module.css";
import gamesStyles from './Games.module.css';
import mediaStyles from './Media.module.css';
import systemStyles from './System.module.css';
import itemSelectStyles from '../styles/ItemSelect.module.css';

import { navigateTo, 
         selectContextIndex,
         selectXboxPos,
         selectGamesPos,
         selectMediaPos,
         selectSystemPos,
         isTrayDisplayed,
         selectBladeContainerWidth,
         selectBladeContainerHeight,
         updateBladeContainerSize,
         selectTransitionDirection,
         selectLastIndexCalled} from './xboxSlice';

import { updateSelectionHighlight,
         selectHighlightState,
         navigateSystemMenu,
         selectSystemMainMenuIndex,
         navigateMediaMenu,
         selectMediaMenuIndex,
         navigateGamesMenu,
         selectGamesMenuIndex,
         navigateXboxliveMenu,
         selectXboxliveMenuIndex,
         navigateMarketplaceMenu,
         selectMarketplaceMenuIndex} from './menuSlice';

import NavBladesContainer from "./components/NavBladesContainer";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";

const Xbox = () => {

    const dispatch = useDispatch();
    
    
    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const last_index_called = useSelector(selectLastIndexCalled);
    const xbox_blade_position = useSelector(selectXboxPos);
    const games_position = useSelector(selectGamesPos);
    const media_position = useSelector(selectMediaPos);
    const system_pos = useSelector(selectSystemPos);
    const display_tray = useSelector(isTrayDisplayed);
    const xbox_blade_container_width = useSelector(selectBladeContainerWidth);
    const xbox_blade_container_height = useSelector(selectBladeContainerHeight);
    const transition_direction = useSelector(selectTransitionDirection);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const systemMenuIndex = useSelector(selectSystemMainMenuIndex);
    const mediaMenuIndex = useSelector(selectMediaMenuIndex);
    const gamesMenuIndex = useSelector(selectGamesMenuIndex)
    const xboxliveMenuIndex = useSelector(selectXboxliveMenuIndex);
    const marketplaceMenuIndex = useSelector(selectMarketplaceMenuIndex);
    

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
    
    //GSAP instance Refs
    const bladeContainerTransition = useRef(null);
    const xboxBladeTransition = useRef(null);
    const gamesBladeTransition = useRef(null);
    const mediaBladeTransition = useRef(null);
    const systemBladeTransition = useRef(null);
    const xboxBackgroundTransition = useRef(null);
    const gamesBackgroundTransition = useRef(null);
    const mediaBackgroundTransition = useRef(null);
    const systemBackgroundTransition = useRef(null);

    

    

    //Runs before browser paint in order to set a new GSAP instance for animating each unique transition.
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
        getTransitionDirection();
        
    },[current_context_index, last_index_called, transition_direction, xbox_blade_container_height]);


    //Runs on first render to initialize the blades 
    useEffect(()=>{

        const initializeBlades = () => {

            if(xbox_blade_container_height <= 575) {
                xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {left: `${xbox_blade_container_width -45}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {left: `${xbox_blade_container_width - 55}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {left: `${xbox_blade_container_width - 65}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                systemBladeTransition.current = gsap.timeline().to(systemRef.current, {left: `${xbox_blade_container_width - 75}`, duration: blade_transition_duration, delay: blade_transition_delay},);
            }
            else {
                xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {left: `${xbox_blade_container_width -60}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {left: `${xbox_blade_container_width - 70}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {left: `${xbox_blade_container_width - 80}`, duration: blade_transition_duration, delay: blade_transition_delay},);
                systemBladeTransition.current = gsap.timeline().to(systemRef.current, {left: `${xbox_blade_container_width - 90}`, duration: blade_transition_duration, delay: blade_transition_delay},);
            }
            

        }

        initializeBlades();

    }, [xbox_blade_container_width, xbox_blade_container_height]);

    //Runs on first render to initialize background slides
    useEffect(()=> {
        xboxBackgroundTransition.current = gsap.timeline().to(xboxBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        gamesBackgroundTransition.current = gsap.timeline().to(gamesBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        mediaBackgroundTransition.current = gsap.timeline().to(mediaBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        systemBackgroundTransition.current = gsap.timeline().to(systemBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        
    }, [xbox_blade_container_width]);

    //
    useEffect(()=> {

    })


    useEffect(()=> {
        const moveBlade = () => {
            switch(current_context_index) {
                case 0:
                    xboxBladeTransition.current.play();
                    gamesBladeTransition.current.play();
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();

                    xboxBackgroundTransition.current.play();
                    gamesBackgroundTransition.current.play();
                    mediaBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();
                break;
                case 1:
                    xboxBladeTransition.current.reverse().delay(blade_transition_delay);
                    gamesBladeTransition.current.play();
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();

                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.play();
                    gamesBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();



                    // animationTransitionBlade.current.reverse();

                break;
                case 2:
                    xboxBladeTransition.current.reverse().delay(blade_transition_delay);
                    gamesBladeTransition.current.reverse().delay(blade_transition_delay);
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();

                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.play();
                    systemBackgroundTransition.current.play();

                break;
                case 3:
                    xboxBladeTransition.current.reverse().delay(blade_transition_delay);
                    gamesBladeTransition.current.reverse().delay(blade_transition_delay);
                    mediaBladeTransition.current.reverse().delay(blade_transition_delay);
                    systemBladeTransition.current.play();

                    mediaBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    systemBackgroundTransition.current.play();

                break;
                case 4:
                    xboxBladeTransition.current.reverse().delay(blade_transition_delay);
                    gamesBladeTransition.current.reverse().delay(blade_transition_delay);
                    mediaBladeTransition.current.reverse().delay(blade_transition_delay);
                    systemBladeTransition.current.reverse().delay(blade_transition_delay);

                    systemBackgroundTransition.current.reverse().delay(background_transition_delay);
                    xboxBackgroundTransition.current.reverse().delay(background_transition_delay);
                    gamesBackgroundTransition.current.reverse().delay(background_transition_delay);
                    mediaBackgroundTransition.current.reverse().delay(background_transition_delay);
                break;
                default:
                break;
            }
        };



        moveBlade();

    }, [current_context_index, bladeContainerTransition, xbox_blade_container_width]);

    //KeyboardEvents 


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDispatchInput = useCallback(
        debounce((fn) => {
           dispatch(fn);
        }, 200),
        []
      );
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceResizeListener = useCallback(
        debounce((fn) => {
            dispatch(fn);
         }, 500),
         []
    );

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

    useEffect(()=> {
        const updateContainerSize = () => {
            let sizingProperties = {};

            if(xboxBladeContainerRef){
                sizingProperties.width = xboxBladeContainerRef.current.offsetWidth;
                sizingProperties.height = xboxBladeContainerRef.current.offsetHeight;

                debounceResizeListener((updateBladeContainerSize(sizingProperties)));
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
                <h2>Please click to enter full screen</h2>
            </div>
            <div className={styles.bladeContainerMask}>
                <div className={styles.topContainerBorder}></div>
                <div className={styles.bottomContainerBorder}></div>
                <div className={styles.mainContainer}>
                <NavBladesContainer 
                xboxBladeContainerRef={xboxBladeContainerRef} 
                xboxliveRef={xboxliveRef}
                marketplaceRef={marketplaceRef}
                gamesRef={gamesRef}
                mediaRef={mediaRef}
                systemRef={systemRef}
                />
                    <section className={styles.gamesContainer}>

                        {/* Backgrounds */}
                        <div className={styles.xboxliveBackground} ref={xboxBackgroundRef}></div>
                        <div className={styles.marketplaceBackground} ref={marketplaceBackgroundRef}></div>
                        <div className={styles.gamesBackground} ref={gamesBackgroundRef}></div>
                        <div className={styles.mediaBackground} ref={mediaBackgroundRef}></div>
                        <div className={styles.systemBackground} ref={systemBackgroundRef}></div>


                        {/********* These elements are consistent across all contexts ********/}
                        <div className={styles.topBorder}></div>
                        <div className={styles.bottomBorder}></div>
                        <div className={styles.lightOverlay}></div>
                        <div className={`${styles.systemTrayContainer} ${!display_tray ? transitionStyles.makeTransparent : ''}`}>
                                    <div className={styles.trayEllipse}></div>
                                    <div className={styles.trayRect}></div>
                                    <div className={styles.trayTriangleButton}></div>
                                    <div className={styles.trayRectButton}></div>
                                    <p>Open Tray</p>
                        </div>
                        {/* <div className={styles.buttonContainer}>
                            <div className={`${styles.buttons}`}>
                                <div id={styles["yButton"]} className={styles.buttonStyle}></div>
                                <div id={styles["xButton"]} className={styles.buttonStyle}></div>
                            </div>
                            <div className={`${styles.buttons}`}>
                                <div id={styles["bButton"]} className={styles.buttonStyle}></div>
                                <div id={styles["aButton"]} className={styles.buttonStyle}></div>
                            </div>
                        </div> */}
                        {/**********************************************************************/}

                        <div id={marketplaceStyles["marketplaceContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>
                            <div id={marketplaceStyles["marketplace"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 0 ? transitionStyles.makeTransparent : ""}`}>
                                <div className={pageGridStyles.leftContent}>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Games</p>
                                    </div>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Media and Entertainment</p>
                                    </div>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Game Demos</p>
                                    </div>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Game Videos</p>
                                    </div>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Themes and Gamer Pictures</p>
                                    </div>
                                    <div className={marketplaceStyles.selectOption}>
                                        <p>Featured Downloads</p>
                                    </div>
                                </div>
                                <div className={pageGridStyles.rightContent}>
                                    <div className={marketplaceStyles.imageHeaderContainer}></div>
                                    <div id={itemSelectStyles["marketplaceSection"]} className={itemSelectStyles.selectItemListContainer}>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Redeem Code
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Active Downloads
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Account Management
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <XboxlivePage/>
                        <GamesPage/>
                        <MediaPage/>
                        <SystemPage/>

                    </section>
                    
                </div>
            </div>

        </div>
    )
}

export default Xbox

