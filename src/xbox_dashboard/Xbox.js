import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import styles from './Dashboard.module.css';
import marketplaceStyles from './Marketplace.module.css';
import xboxliveStyles from '../styles/Xboxlive.module.css';
import gamesStyles from './Games.module.css';
import mediaStyles from './Media.module.css';
import systemStyles from './System.module.css';
import itemSelectStyles from '../styles/ItemSelect.module.css';
import bladeStyles from '../styles/BladeStyling.module.css';
import ringAnim from './ringAnimation.module.css';
import { navigateTo, 
         selectCurrentContext, 
         selectContextIndex,
         selectXboxPos,
         selectGamesPos,
         selectMediaPos,
         selectSystemPos,
         isTrayDisplayed,
         selectBladeSize,
         selectBladeContainerWidth,
         updateBladeContainerWidth,
         bladeTransitionAsync,
         selectTransitionState,
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

const Xbox = () => {

    const dispatch = useDispatch();
    
    
    //Dashboard state variables
    const current_dashboard_context = useSelector(selectCurrentContext);
    const current_context_index = useSelector(selectContextIndex);
    const last_index_called = useSelector(selectLastIndexCalled);
    const xbox_blade_position = useSelector(selectXboxPos);
    const games_position = useSelector(selectGamesPos);
    const media_position = useSelector(selectMediaPos);
    const system_pos = useSelector(selectSystemPos);
    const display_tray = useSelector(isTrayDisplayed);
    const blade_size = useSelector(selectBladeSize);
    const xbox_blade_container_width = useSelector(selectBladeContainerWidth);
    const transition_state = useSelector(selectTransitionState);
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
    const transtionBladeRef = useRef(null);
    
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
    const animationTransitionBlade = useRef(null);

    

    //Runs before browser paint in order to set a new GSAP instance for animating each unique transition.
    useLayoutEffect(()=> {
        bladeContainerTransition.current = {};

        let shift_offset = (Math.abs(current_context_index - last_index_called));

        if(transition_direction === "left") {
            bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `-=${shift_offset * 40}`, duration: 0.3})
        }
        else {
            bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `+=${shift_offset * 40}`, duration: 0.3});
        }
        
    },[current_context_index]);


    //Runs on first render to initialize the blades 
    useEffect(()=>{
        // bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {left: `${-0}`, duration: blade_transition_duration, delay: blade_transition_delay});
        xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {left: `${xbox_blade_container_width -60}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {left: `${xbox_blade_container_width - 60}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {left: `${xbox_blade_container_width - 60}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        systemBladeTransition.current = gsap.timeline().to(systemRef.current, {left: `${xbox_blade_container_width - 60}`, duration: blade_transition_duration, delay: blade_transition_delay},);
    }, [xboxBladeContainerRef,xbox_blade_container_width]);

    //Runs on first render to initialize background slides
    useEffect(()=> {
        xboxBackgroundTransition.current = gsap.timeline().to(xboxBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        gamesBackgroundTransition.current = gsap.timeline().to(gamesBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        mediaBackgroundTransition.current = gsap.timeline().to(mediaBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        systemBackgroundTransition.current = gsap.timeline().to(systemBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        
    }, [xboxBackgroundRef.current]);


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

    }, [current_context_index, bladeContainerTransition,]);

    //KeyboardEvents 

    const debounceDispatchInput = useCallback(
        debounce((index) => {
           dispatch(navigateTo(index));
        }, 200),
        []
      );

    useEffect((e)=> {
        const navigateUsingKeys = (e) => {
            if(e !== undefined) {
                switch(e.key) {
                    case "ArrowUp":
                        console.log("ArrowUp");
                    break;
                    case "ArrowRight":
                        console.log("ArrowRight");
                        if((current_context_index + 1) < 5) {
                            // dispatch(navigateTo(current_context_index + 1));
                            debounceDispatchInput(current_context_index + 1);
                            
                        }

                    break;
                    case "ArrowDown":
                        console.log("ArrowDown");
                    break;
                    case "ArrowLeft":
                        console.log("ArrowLeft");
                        if((current_context_index - 1) >= 0) {
                            debounceDispatchInput(current_context_index -1);
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


    }, [current_context_index])

    useEffect(()=> {
                 //TODO: Optimize using debounce.
        const updateContainerWidth = () => {
            xboxBladeContainerRef && dispatch(updateBladeContainerWidth(xboxBladeContainerRef.current.offsetWidth));
         }

         window.addEventListener('resize', updateContainerWidth);

         updateContainerWidth();

         return () => {
             window.removeEventListener("resize", updateContainerWidth);
         }

    }, [xboxBladeContainerRef.current]);

    const formattedContext = (context) => {
        switch(context){
            case "marketplace":
                return "Marketplace";
            case "xboxlive":
                return "Xbox LIVE";
            case "games":
                return "Games";
            case "media":
                return "Media";
            case "system":
                return "System";
            default: return "marketplace";
        }
    };

    const handleKeyPress = (e) => {
        console.log("You pressed:");
        console.log(e.key);
    }

    return (
        <div onKeyDown={(e)=>{handleKeyPress(e)}}>
            <div className={styles.bladeContainerMask}>
                <div className={styles.topContainerBorder}></div>
                <div className={styles.bottomContainerBorder}></div>
                <div className={styles.mainContainer}>
                    <div className={styles.bladeContainer} ref={xboxBladeContainerRef}>
                        <div id={styles["marketplaceBlade"]} className={`${styles.blade} `}  style={{"--index": 0}} ref={marketplaceRef} >
                            <div className={`${bladeStyles.bladeShrink}`}>
                                <svg  className={bladeStyles.bladeBase}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(0));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                    <defs>
                                        <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                        <stop offset="0.946467" stop-color="#C1C1C1"/>
                                        <stop offset="0.973669" stop-color="#DBDBDB"/>
                                        <stop offset="1" stop-color="#8B8B8B"/>
                                        </radialGradient>
                                    </defs>
                                </svg>

                                <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 0  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMarketplaceJewelFill}`} onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(0));}} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                    <defs>
                                        {/* Active gradient */}
                                        <radialGradient id="paint0_radial_217_185" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                            <stop offset="0.968864" stop-color="#B35F2D"/>
                                            <stop offset="0.968964" stop-color="#BE6B32"/>
                                            <stop offset="0.982838" stop-color="#FF9D42"/>
                                            <stop offset="1" stop-color="#CB8536"/>
                                        </radialGradient>

                                        {/* Inactive gradient */}
                                        <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                            <stop offset="0.885417" stop-color="#5B5B5B"/>
                                            <stop offset="0.96875" stop-color="#D3D3D3"/>
                                            <stop offset="1" stop-color="#848484"/>
                                        </radialGradient>
                                    </defs>
                                </svg>


                            </div>
                        </div>        
                        <div id={styles["xboxliveBlade"]}    className={`${styles.blade}`}   style={{"--index": 1}} ref={xboxliveRef}>


                                {/* Left Blade */}
                                <div className={`${bladeStyles.bladeShrink} ${!xbox_blade_position ? styles.instantTransparent : ""}`}>
                                        <svg className={bladeStyles.bladeBase}   viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(1));}}  d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                            <defs>
                                                <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                                <stop offset="1" stop-color="#8B8B8B"/>
                                                </radialGradient>
                                            </defs>
                                        </svg>

                                        <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`}  viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                            <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(1));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                            <defs>
                                                {/* Active gradient */}
                                                <radialGradient id="paint0_radial_217_189" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                                    <stop offset="0.901042" stop-color="#DB9C43"/>
                                                    <stop offset="0.968864" stop-color="#C79042"/>
                                                    <stop offset="0.968964" stop-color="#BE6B32"/>
                                                    <stop offset="0.982838" stop-color="#FDC04F"/>
                                                    <stop offset="1" stop-color="#EAA162"/>
                                                </radialGradient>

                                                {/* Inactive gradient */}
                                                <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                                    <stop offset="0.885417" stop-color="#5B5B5B"/>
                                                    <stop offset="0.96875" stop-color="#D3D3D3"/>
                                                    <stop offset="1" stop-color="#848484"/>
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                </div>
                                
                                {/* Right Blade */}
                                <div className={`${bladeStyles.bladeShrink} ${xbox_blade_position ? styles.instantTransparent : ""}`}>
                                        <svg className={bladeStyles.bladeBaseRight}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(1));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                                            <defs>
                                                <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                                <stop offset="1" stop-color="#8B8B8B"/>
                                                </radialGradient>
                                            </defs>
                                        </svg>

                                        <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`}  viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                            <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(1));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                                            <defs>
                                                <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                                <stop offset="1" stop-color="#848484"/>
                                                </radialGradient>
                                            </defs>
                                        </svg>


                                </div>

                            {/* Transition blade for mid animation */}
                            {/* <div className={`${bladeStyles.transitionBlade} ${!transition_state ? styles.instantTransparent : "" } `}></div> */}
                        </div>
                        <div id={styles["gamesBlade"]}       className={`${styles.blade}`}   style={{"--index": 2}} ref={gamesRef}>
                            {/* Left Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${!games_position ? styles.instantTransparent : ""}`}>
                                    <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(2));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                        <defs>
                                            <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                                            <stop offset="1" stop-color="#8B8B8B"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>

                                    <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 2  ? bladeStyles.inactiveBladeFill : bladeStyles.activeGamesJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(2));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                        <defs>
                                            {/* Active gradient */}
                                            <radialGradient id="paint0_radial_217_181" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                                <stop offset="0.968964" stop-color="#4CA63A"/>
                                                <stop offset="0.982838" stop-color="#68CE3C"/>
                                                <stop offset="1" stop-color="#4D9E3C"/>
                                            </radialGradient>

                                            {/* Inactive gradient */}
                                            <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                                <stop offset="1" stop-color="#848484"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>


                            </div>

                            {/* Right Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${games_position ? styles.instantTransparent : ""}`}>
                                    <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(2));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                                        <defs>
                                            <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                                            <stop offset="1" stop-color="#8B8B8B"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>

                                    <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(2));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                                        <defs>
                                            <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                            <stop offset="0.885417" stop-color="#5B5B5B"/>
                                            <stop offset="0.96875" stop-color="#D3D3D3"/>
                                            <stop offset="1" stop-color="#848484"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>


                            </div>
                        </div>
                        <div id={styles["mediaBlade"]}       className={`${styles.blade}`}   style={{"--index": 3}} ref={mediaRef}>
                            {/* Left Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${!media_position ? styles.instantTransparent : ""}`}>
                                    <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(3));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                        <defs>
                                            <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                                            <stop offset="1" stop-color="#8B8B8B"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>

                                    <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 3  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMediaJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(3));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                        <defs>
                                            {/* Active gradient */}
                                            <radialGradient id="paint0_radial_217_193" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                                <stop offset="0.968864" stop-color="#356DA7"/>
                                                <stop offset="0.968964" stop-color="#3872AB"/>
                                                <stop offset="0.982838" stop-color="#5CB2FF"/>
                                                <stop offset="1" stop-color="#3E7FBD"/>
                                            </radialGradient>

                                            {/* Inactive gradient */}
                                            <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                                <stop offset="1" stop-color="#848484"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>


                            </div>

                            {/* Right Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${media_position ? styles.instantTransparent : ""}`}>
                                <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(3));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                                    <defs>
                                        <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                        <stop offset="0.946467" stop-color="#C1C1C1"/>
                                        <stop offset="0.973669" stop-color="#DBDBDB"/>
                                        <stop offset="1" stop-color="#8B8B8B"/>
                                        </radialGradient>
                                    </defs>
                                </svg>

                                <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(3));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                                    <defs>
                                        <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                        <stop offset="0.885417" stop-color="#5B5B5B"/>
                                        <stop offset="0.96875" stop-color="#D3D3D3"/>
                                        <stop offset="1" stop-color="#848484"/>
                                        </radialGradient>
                                    </defs>
                                </svg>


                            </div>
                        </div>
                        <div id={styles["systemBlade"]}      className={`${styles.blade}`}   style={{"--index": 4}} ref={systemRef}>
                            {/* Left Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${!system_pos ? styles.instantTransparent : ""}`}>
                                    <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(4));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                        <defs>
                                            <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                                            <stop offset="1" stop-color="#8B8B8B"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>

                                    <svg id={bladeStyles["marketplaceJewel"]} className={`${bladeStyles.bladeJewel} ${current_context_index !== 4  ? bladeStyles.inactiveBladeFill : bladeStyles.activeSystemJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                        <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(4));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                        <defs>
                                            {/* Active gradient */}
                                            <radialGradient id="paint0_radial_217_197" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                                <stop offset="0.968864" stop-color="#8664B4"/>
                                                <stop offset="0.982838" stop-color="#A983FA"/>
                                                <stop offset="1" stop-color="#8E6FCB"/>
                                            </radialGradient>

                                            {/* Inactive gradient */}
                                            <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                                <stop offset="1" stop-color="#848484"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>


                            </div>

                            {/* Right Blade */}
                            <div className={`${bladeStyles.bladeShrink} ${system_pos ? styles.instantTransparent : ""}`}>
                                <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(4));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                                    <defs>
                                        <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                        <stop offset="0.946467" stop-color="#C1C1C1"/>
                                        <stop offset="0.973669" stop-color="#DBDBDB"/>
                                        <stop offset="1" stop-color="#8B8B8B"/>
                                        </radialGradient>
                                    </defs>
                                </svg>

                                <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={()=> {dispatch(bladeTransitionAsync()); dispatch(navigateTo(4));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                                    <defs>
                                        <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                        <stop offset="0.885417" stop-color="#5B5B5B"/>
                                        <stop offset="0.96875" stop-color="#D3D3D3"/>
                                        <stop offset="1" stop-color="#848484"/>
                                        </radialGradient>
                                    </defs>
                                </svg>


                            </div>
                        </div>
                    </div>
                    <h2 className={styles.sectionHeading}>{formattedContext(current_dashboard_context)}</h2>
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
                        <div className={`${styles.systemTrayContainer} ${!display_tray ? styles.makeTransparent : ''}`}>
                                    <div className={styles.trayEllipse}></div>
                                    <div className={styles.trayRect}></div>
                                    <div className={styles.trayTriangleButton}></div>
                                    <div className={styles.trayRectButton}></div>
                                    <p>Open Tray</p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <div className={`${styles.buttons}`}>
                                <div id={styles["yButton"]} className={styles.buttonStyle}></div>
                                <div id={styles["xButton"]} className={styles.buttonStyle}></div>
                            </div>
                            <div className={`${styles.buttons}`}>
                                <div id={styles["bButton"]} className={styles.buttonStyle}></div>
                                <div id={styles["aButton"]} className={styles.buttonStyle}></div>
                            </div>
                        </div>
                        {/**********************************************************************/}

                        <div id={marketplaceStyles["marketplaceContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>
                            <div id={marketplaceStyles["marketplace"]} className={`${''} ${current_context_index !== 0 ? styles.makeTransparent : ""}`}>
                                <div className={marketplaceStyles.leftContent}>
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
                                <div className={marketplaceStyles.rightContent}>
                                    <div className={marketplaceStyles.imageHeaderContainer}></div>
                                    <div id={itemSelectStyles["marketplaceSection"]} className={itemSelectStyles.selectItemListContainer}>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                    Redeem Code
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                    Active Downloads
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                    Account Management
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id={xboxliveStyles["xboxliveContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 1 ? 1 : -1}`}}>
                            <div id={styles["xboxlive"]} className={`${current_context_index !== 1 ? styles.makeTransparent : ""}`}>
                                <div className={styles.leftContent}>
                                    <div className={styles.profileContainer}>
                                        <p>Epoxi117</p>
                                        <div className={styles.profileImgContainer}>
                                            <div className={styles.profileIcon}></div>
                                        </div>
                                        <div className={styles.profileDescription}>
                                            <p className={styles.repTitle}>Rep</p>
                                            <div className={styles.reputationStars}>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                            </div>
                                            <p className={styles.gamerscoreTitle}>Gamerscore</p>
                                            <p className={styles.gamerscoreValue}>21117</p>
                                            <p className={styles.zoneTitle}>Zone</p>
                                            <div className={styles.zoneStatus}>Pro</div>
                                        </div>
                                    </div>
                                    <div id={itemSelectStyles["xboxliveSection"]} className={itemSelectStyles.selectItemListContainer}>
                                        <div className={itemSelectStyles.boxInsetHighlightContainer}>
                                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                            <div className={isHighlightActive && itemSelectStyles.boxInsetHighlightMaskBottom}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                        </div>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                    Messages
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                    Friends
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                    Chat
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.xboxliveAnimationContainer}>
                                        <div className={styles.circleAnimation}>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 0}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 1}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 2}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 3}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 4}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 5}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 6}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 7}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 8}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 9}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 10}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                            <div className={`${ringAnim.ring}`} style={{"--i": 11}}>
                                                <div className={ringAnim.ringInner}></div>
                                            </div>
                                        </div>
                                        <div className={styles.logoContainer}></div>
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <div className={styles.xboxliveLogo}></div>
                                    <div className={styles.descriptionContainer}>
                                        <div className={styles.descriptionTitle}>Xbox LIVE</div>
                                        <div className={styles.descriptionContent}>
                                            <p>                                        Games. Tournaments. Entertainment. 
                                            All the rewards. Endless possibilities. What are you waiting for?</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div id={gamesStyles["gamesContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 2 ? 1 : -1}`}}>
                            <div id={gamesStyles["games"]} className={`${current_context_index !== 2 ? styles.makeTransparent : ""}`}>
                                <div className={styles.leftContent}>
                                    <div className={styles.profileContainer}>
                                        <p>Epoxi117</p>
                                        <div className={styles.profileImgContainer}>
                                            <div className={styles.profileIcon}></div>
                                        </div>
                                        <div className={styles.profileDescription}>
                                            <p className={styles.repTitle}>Rep</p>
                                            <div className={styles.reputationStars}>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                            </div>
                                            <p className={styles.gamerscoreTitle}>Gamerscore</p>
                                            <p className={styles.gamerscoreValue}>21117</p>
                                            <p className={styles.zoneTitle}>Zone</p>
                                            <div className={styles.zoneStatus}>Pro</div>
                                        </div>
                                    </div>
                                    <div id={itemSelectStyles["gamesSelection"]} className={itemSelectStyles.selectItemListContainer}>
                                        <div className={itemSelectStyles.boxInsetHighlightContainer}>
                                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                        </div>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                    Music
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                    Pictures
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                    Videos
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <div className={gamesStyles.xbox360Logo}></div>
                                    <div className={styles.descriptionContainer}>
                                        <div className={styles.descriptionTitle}>Xbox LIVE</div>
                                        <div className={styles.descriptionContent}>
                                            Games. Tournaments. Entertainment. 
                                            All the rewards. Endless possibilities. What are you waiting for?
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id={mediaStyles["mediaContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 3 ? 1 : -1}`}}>
                            <div id={mediaStyles["media"]} className={`${current_context_index !== 3 ? styles.makeTransparent : ""}`}>
                                <div className={mediaStyles.leftContent}>
                                    <div className={styles.profileContainer}>
                                        <p>Epoxi117</p>
                                        <div className={styles.profileImgContainer}>
                                            <div className={styles.profileIcon}></div>
                                        </div>
                                        <div className={styles.profileDescription}>
                                            <p className={styles.repTitle}>Rep</p>
                                            <div className={styles.reputationStars}>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                                <div className={styles.starIcon}></div>
                                            </div>
                                            <p className={styles.gamerscoreTitle}>Gamerscore</p>
                                            <p className={styles.gamerscoreValue}>21117</p>
                                            <p className={styles.zoneTitle}>Zone</p>
                                            <div className={styles.zoneStatus}>Pro</div>
                                        </div>
                                    </div>
                                    <div id={itemSelectStyles["mediaSelection"]} className={itemSelectStyles.selectItemListContainer}>
                                        <div className={itemSelectStyles.boxInsetHighlightContainer}>
                                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && mediaMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && mediaMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && mediaMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && mediaMenuIndex !== 3 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && mediaMenuIndex !== 4 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && mediaMenuIndex !== 0 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && mediaMenuIndex !== 1 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && mediaMenuIndex !== 2 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && mediaMenuIndex !== 3 ? styles.instantTransparent : ""}`}></div>
                                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && mediaMenuIndex !== 4 ? styles.instantTransparent : ""}`}></div>
                                            </div>
                                        </div>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMediaMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                    Music
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMediaMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                    Pictures
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMediaMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                    Videos
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMediaMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 3 ? styles.makeTransparent : ""}`}></span>
                                                    Video Store
                                                </p>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMediaMenu(4));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 4 ? styles.makeTransparent : ""}`}></span>
                                                    Media Center
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className={gamesStyles.xboxliveAnimationContainer}>
                                        <div className={styles.logoContainer}></div>
                                    </div> */}
                                </div>
                                <div className={styles.rightContent}>
                                    <div className={gamesStyles.xbox360Logo}></div>
                                    <div className={styles.descriptionContainer}>
                                        <div className={styles.descriptionTitle}>Xbox LIVE</div>
                                        <div className={styles.descriptionContent}>
                                            Games. Tournaments. Entertainment. 
                                            All the rewards. Endless possibilities. What are you waiting for?
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id={mediaStyles["systemContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 4 ? 1 : -1}`}} >
                            <div id={systemStyles["system"]} className={`${current_context_index !== 4 ? styles.makeTransparent : ""}`}>

                                <div className={systemStyles.leftContent}>
                                    <div className={systemStyles.selectItemListContainer}>
                                        <div className={systemStyles.boxInsetHighlightContainer}>
                                            <div className={systemStyles.boxInsetHighlightMaskTop}>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 0 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 1 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 2 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 3 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 4 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 5 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 6 ? styles.makeTransparent : ""}`}></div>
                                            </div>
                                            <div className={systemStyles.boxInsetHighlightMaskBottom}>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 0 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 1 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 2 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 3 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 4 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 5 ? styles.makeTransparent : ""}`}></div>
                                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 6 ? styles.makeTransparent : ""}`}></div>
                                            </div>
                                        </div>
                                        <div className={systemStyles.innerListContainer} >
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                    Console Settings
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                    Family Settings
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                    Memory
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 3 ? styles.makeTransparent : ""}`}></span>
                                                    Network Settings
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(4));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 4 ? styles.makeTransparent : ""}`}></span>
                                                    Computers
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(5));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 5 ? styles.makeTransparent : ""}`}></span>
                                                    Xbox Live Vision
                                                </p>
                                            </div>
                                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(6));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                                <p>
                                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 6 ? styles.makeTransparent : ""}`}></span>
                                                    Initial Setup
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={systemStyles.rightContent}>
                                    <div className={systemStyles.containerReset}>
                                        <div id="console-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 0 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descTitle}>
                                                Edit your Xbox 360 system settings, including:
                                            </div>
                                            <div className={systemStyles.descContent}>
                                                <ul>
                                                    <li>Display</li>
                                                    <li>Audio</li>
                                                    <li>Language</li>
                                                    <li>Remote Control</li>
                                                    <li>and more</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div id="family-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 1 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Protect younger family members by customizing content, communications, and online
                                                    interactions. Adjust settings on the console or at the individual profile level.
                                                </p>
                                            </div>
                                        </div>
                                        <div id="memory-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 2 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Move or delete saved games, profiles, and other items on Xbox 360 storage devices.</p>
                                            </div>
                                        </div>
                                        <div id="network-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 3 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Connect your console to your home network or Xbox Live. Set up wireless network connections and test network settings.</p>
                                            </div>
                                        </div>
                                        <div id="computers" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 4 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Manage your connections to Windows XP or Media Center PC.</p>
                                            </div>
                                        </div>
                                        <div id="xboxlive-vision" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 5 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Change the settings for your Xbox Live Vision camera.</p>
                                            </div>
                                        </div>
                                        <div id="initial-setup" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 6 ? styles.makeTransparent : ""}`}>
                                            <div className={systemStyles.descContent}>
                                                <p>Run the system setup that you saw the first time you started the console.</p>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>

                            </div>
                        </div>

                    </section>
                    
                </div>
            </div>

        </div>
    )
}

export default Xbox

