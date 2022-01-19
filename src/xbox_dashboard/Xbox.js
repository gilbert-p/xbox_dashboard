import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
         updateBladeContainerWidth } from './xboxSlice';

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
    const xbox_blade_position = useSelector(selectXboxPos);
    const games_position = useSelector(selectGamesPos);
    const media_position = useSelector(selectMediaPos);
    const system_pos = useSelector(selectSystemPos);
    const display_tray = useSelector(isTrayDisplayed);
    const blade_size = useSelector(selectBladeSize);
    const xbox_blade_container_width = useSelector(selectBladeContainerWidth);

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
        bladeContainerTransition.current = {};
        bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current,
            {left: `-${current_context_index * (blade_size) + 60}`, duration: 0.3})
    },[current_context_index]);


    //Runs on first render to initialize the blades 
    useEffect(()=>{
        bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {left: `${-60}`, duration: blade_transition_duration, delay: blade_transition_delay});
        xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {left: `${xbox_blade_container_width}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {left: `${xbox_blade_container_width}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {left: `${xbox_blade_container_width}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        systemBladeTransition.current = gsap.timeline().to(systemRef.current, {left: `${xbox_blade_container_width}`, duration: blade_transition_duration, delay: blade_transition_delay},);
    }, [xbox_blade_container_width]);

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

    useEffect(()=> {
                 //TODO: Optimize using debounce.
        const updateContainerWidth = () => {
            xboxBladeContainerRef && dispatch(updateBladeContainerWidth(xboxBladeContainerRef.current.offsetWidth));
         }

         window.addEventListener('resize', updateContainerWidth);

         updateContainerWidth();
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

    return (
        <div>
            <h2>{current_dashboard_context}</h2>
            <h2>{xbox_blade_container_width}</h2>
            <div className={styles.mainContainer}>
                <div className={styles.bladeContainer} ref={xboxBladeContainerRef}>
                    <div id={styles["marketplaceBlade"]} className={`${styles.blade} `}  style={{"--index": 0}} ref={marketplaceRef} onClick={()=> {dispatch(navigateTo("marketplace"));}}>
                        <div id={bladeStyles["marketplace_svg_container"]} className={bladeStyles.svgBladeContainer}>
                            {/* <svg className={bladeStyles.bladeBase}  width="88" height="993" viewBox="0 0 88 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M87.0336 222.503L60.5333 1.5L0.5 0.00341797C74.0065 273.739 68.3105 684.35 1 992.003H53.5C53.5 992.003 84.534 776.003 86.534 717.503C87.1341 699.951 88.6623 688.054 82.034 671.503L64.0338 626.003C60.2944 617.171 58.5914 611.735 58.5339 598.503C60.4846 460.501 60.831 383.249 49.0338 247.503C48.3828 237.938 55.2883 237.044 60.5333 237.003H71.0334C81.5173 236.752 88.4083 233.666 87.0336 222.503Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["marketplaceJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 58 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.0337 221.503L12.7121 0.5H19C76.1661 293.177 67.1347 701.06 13 991H1.53418C-0.850259 992.669 35.2546 775.899 38.5342 716.503C39.5024 698.967 40.6624 687.053 34.0342 670.503L16.0342 625.003C12.2947 616.17 10.5917 610.734 10.5342 597.503C12.4849 459.501 12.8312 382.249 1.03405 246.503C0.382984 236.938 7.28865 236.044 12.5336 236.003H23.0337C33.5177 235.752 40.4085 232.666 39.0337 221.503Z"/>
                            </svg> */}

                            <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M86.5336 222.5C74.7057 133.92 62.5691 86.3731 45 0H0C73.5065 273.735 67.8105 684.347 0.5 992H46.5C46.5 992 84.034 776 86.034 717.5C86.6341 699.947 88.1623 688.05 81.534 671.5L63.5338 626C59.7944 617.167 58.0914 611.731 58.0339 598.5C59.9846 460.497 60.331 383.246 48.5338 247.5C47.8828 237.935 54.7883 237.041 60.0333 237H70.5334C81.0173 236.749 87.9083 233.663 86.5336 222.5Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["marketplaceJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 66 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45.5337 222.5C30.3573 132.45 20.4962 83.7244 0.5 0H13C80.509 224.669 82.6299 653.597 18.5 991.997H5.5C3.11556 993.666 41.7546 776.895 45.0342 717.5C46.0024 699.964 47.1624 688.05 40.5342 671.5L22.5342 626C18.7947 617.167 17.0917 611.731 17.0342 598.5C18.9849 460.497 19.3312 383.246 7.53405 247.5C6.88298 237.934 13.7887 237.041 19.0336 237H29.5337C40.0177 236.749 46.9085 233.662 45.5337 222.5Z" fill=""/>
                                <defs>
                                    {/* Active gradient */}
                                    {/* <radialGradient id="paint0_radial_203_178" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(81 -0.000110592) rotate(99.3311) scale(1005.3 262.926)">
                                        <stop offset="0.174693" stopColor="#BF582D"/>
                                        <stop offset="0.359221" stopColor="#FF9B3F"/>
                                        <stop offset="0.694086" stopColor="#BF582D"/>
                                    </radialGradient> */}

                                    {/* Inactive gradient */}
                                    <radialGradient id="paint0_radial_213_161" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1526.5 496) rotate(90) scale(3790 1598.11)">
                                        <stop offset="0.963542" stop-color="#D3D3D3"/>
                                        <stop offset="1" stop-color="#848484"/>
                                    </radialGradient>
                                </defs>
                            </svg>


                        </div>
                    </div>
                    <div id={styles["xboxliveBlade"]}    className={`${styles.blade}`}   style={{"--index": 1}} ref={xboxliveRef}    onClick={()=> {dispatch(navigateTo("xboxlive"));}}>
                        <div className={bladeStyles.svgBladeContainer}>
                            <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M86.5336 222.5C74.7057 133.92 62.5691 86.3731 45 0H0C73.5065 273.735 67.8105 684.347 0.5 992H46.5C46.5 992 84.034 776 86.034 717.5C86.6341 699.947 88.1623 688.05 81.534 671.5L63.5338 626C59.7944 617.167 58.0914 611.731 58.0339 598.5C59.9846 460.497 60.331 383.246 48.5338 247.5C47.8828 237.935 54.7883 237.041 60.0333 237H70.5334C81.0173 236.749 87.9083 233.663 86.5336 222.5Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["xboxliveJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 66 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45.5337 222.5C30.3573 132.45 20.4962 83.7244 0.5 0H13C80.509 224.669 82.6299 653.597 18.5 991.997H5.5C3.11556 993.666 41.7546 776.895 45.0342 717.5C46.0024 699.964 47.1624 688.05 40.5342 671.5L22.5342 626C18.7947 617.167 17.0917 611.731 17.0342 598.5C18.9849 460.497 19.3312 383.246 7.53405 247.5C6.88298 237.934 13.7887 237.041 19.0336 237H29.5337C40.0177 236.749 46.9085 233.662 45.5337 222.5Z"/>
                                <defs>
                                <radialGradient id="paint0_radial_211_77" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(81.1558 -0.000110592) rotate(99.3311) scale(1005.3 262.926)">
                                    <stop offset="0.174693" stop-color="#C38A36"/>
                                    <stop offset="0.359221" stop-color="#E9BC4C"/>
                                    <stop offset="0.694086" stop-color="#C38A36"/>
                                </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_213_161" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1526.5 496) rotate(90) scale(3790 1598.11)">
                                    <stop offset="0.963542" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                    <div id={styles["gamesBlade"]}       className={`${styles.blade}`}   style={{"--index": 2}} ref={gamesRef}       onClick={()=> dispatch(navigateTo("games"))}>
                    <div className={bladeStyles.svgBladeContainer}>
                            <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M86.5336 222.5C74.7057 133.92 62.5691 86.3731 45 0H0C73.5065 273.735 67.8105 684.347 0.5 992H46.5C46.5 992 84.034 776 86.034 717.5C86.6341 699.947 88.1623 688.05 81.534 671.5L63.5338 626C59.7944 617.167 58.0914 611.731 58.0339 598.5C59.9846 460.497 60.331 383.246 48.5338 247.5C47.8828 237.935 54.7883 237.041 60.0333 237H70.5334C81.0173 236.749 87.9083 233.663 86.5336 222.5Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["gamesJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 66 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45.5337 222.5C30.3573 132.45 20.4962 83.7244 0.5 0H13C80.509 224.669 82.6299 653.597 18.5 991.997H5.5C3.11556 993.666 41.7546 776.895 45.0342 717.5C46.0024 699.964 47.1624 688.05 40.5342 671.5L22.5342 626C18.7947 617.167 17.0917 611.731 17.0342 598.5C18.9849 460.497 19.3312 383.246 7.53405 247.5C6.88298 237.934 13.7887 237.041 19.0336 237H29.5337C40.0177 236.749 46.9085 233.662 45.5337 222.5Z"/>
                                <defs>
                                    <radialGradient id="paint0_radial_211_29" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(81.3116 -0.000110592) rotate(99.3311) scale(1005.3 262.926)">
                                        <stop offset="0.174693" stop-color="#448B40"/>
                                        <stop offset="0.359221" stop-color="#5CC548"/>
                                        <stop offset="0.694086" stop-color="#448B40"/>
                                    </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_213_161" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1526.5 496) rotate(90) scale(3790 1598.11)">
                                    <stop offset="0.963542" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                    <div id={styles["mediaBlade"]}       className={`${styles.blade}`}   style={{"--index": 3}} ref={mediaRef}       onClick={()=> dispatch(navigateTo("media"))}>
                    <div className={bladeStyles.svgBladeContainer}>
                            <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M86.5336 222.5C74.7057 133.92 62.5691 86.3731 45 0H0C73.5065 273.735 67.8105 684.347 0.5 992H46.5C46.5 992 84.034 776 86.034 717.5C86.6341 699.947 88.1623 688.05 81.534 671.5L63.5338 626C59.7944 617.167 58.0914 611.731 58.0339 598.5C59.9846 460.497 60.331 383.246 48.5338 247.5C47.8828 237.935 54.7883 237.041 60.0333 237H70.5334C81.0173 236.749 87.9083 233.663 86.5336 222.5Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["mediaJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 66 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45.5337 222.5C30.3573 132.45 20.4962 83.7244 0.5 0H13C80.509 224.669 82.6299 653.597 18.5 991.997H5.5C3.11556 993.666 41.7546 776.895 45.0342 717.5C46.0024 699.964 47.1624 688.05 40.5342 671.5L22.5342 626C18.7947 617.167 17.0917 611.731 17.0342 598.5C18.9849 460.497 19.3312 383.246 7.53405 247.5C6.88298 237.934 13.7887 237.041 19.0336 237H29.5337C40.0177 236.749 46.9085 233.662 45.5337 222.5Z"/>
                                <defs>
                                    <radialGradient id="paint0_radial_211_45" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(81.4673 -0.000110592) rotate(99.3311) scale(1005.3 262.926)">
                                        <stop offset="0.174693" stop-color="#4370A3"/>
                                        <stop offset="0.359221" stop-color="#62A8EA"/>
                                        <stop offset="0.694086" stop-color="#4370A3"/>
                                    </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_213_161" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1526.5 496) rotate(90) scale(3790 1598.11)">
                                    <stop offset="0.963542" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                    <div id={styles["systemBlade"]}      className={`${styles.blade}`}   style={{"--index": 4}} ref={systemRef}      onClick={()=> dispatch(navigateTo("system"))}>
                    <div className={bladeStyles.svgBladeContainer}>
                        <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M86.5336 222.5C74.7057 133.92 62.5691 86.3731 45 0H0C73.5065 273.735 67.8105 684.347 0.5 992H46.5C46.5 992 84.034 776 86.034 717.5C86.6341 699.947 88.1623 688.05 81.534 671.5L63.5338 626C59.7944 617.167 58.0914 611.731 58.0339 598.5C59.9846 460.497 60.331 383.246 48.5338 247.5C47.8828 237.935 54.7883 237.041 60.0333 237H70.5334C81.0173 236.749 87.9083 233.663 86.5336 222.5Z" fill="#EAEAEA"/>
                            </svg>

                            <svg id={bladeStyles["systemJewel"]} className={bladeStyles.bladeJewel} viewBox="0 0 66 993" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M45.5337 222.5C30.3573 132.45 20.4962 83.7244 0.5 0H13C80.509 224.669 82.6299 653.597 18.5 991.997H5.5C3.11556 993.666 41.7546 776.895 45.0342 717.5C46.0024 699.964 47.1624 688.05 40.5342 671.5L22.5342 626C18.7947 617.167 17.0917 611.731 17.0342 598.5C18.9849 460.497 19.3312 383.246 7.53405 247.5C6.88298 237.934 13.7887 237.041 19.0336 237H29.5337C40.0177 236.749 46.9085 233.662 45.5337 222.5Z" />
                                <defs>
                                    <radialGradient id="paint0_radial_211_61" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(81 -0.000110592) rotate(99.3311) scale(1005.3 262.926)">
                                        <stop offset="0.174693" stop-color="#725E9B"/>
                                        <stop offset="0.359221" stop-color="#A882FA"/>
                                        <stop offset="0.694086" stop-color="#725E9B"/>
                                    </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_213_161" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1526.5 496) rotate(90) scale(3790 1598.11)">
                                    <stop offset="0.963542" stop-color="#D3D3D3"/>
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


                    {/* These elements are consistent across all contexts */}
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
                    {/* These elements are consistent across all contexts */}

                    <div id={marketplaceStyles["marketplaceContextContainer"]} className={styles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>
                        <div id={marketplaceStyles["marketplace"]} className={`${''} ${current_dashboard_context !== "marketplace" ? styles.makeTransparent : ""}`}>
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
    )
}

export default Xbox

