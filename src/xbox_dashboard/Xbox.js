import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import styles from './Dashboard.module.css';
import marketplaceStyles from './Marketplace.module.css';
import gamesStyles from './Games.module.css';
import mediaStyles from './Media.module.css';
import systemStyles from './System.module.css';
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

import { navigateSystemMenu, selectSystemMainMenuIndex } from './systemSlice';

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

    //System state variables
    const systemMenuIndex = useSelector(selectSystemMainMenuIndex);
    

    const background_transition_duration = 0.9;
    const background_transition_delay = 0;
    const blade_transition_duration = 0.9;
    const blade_transition_delay = 0;




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
    }

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
            {left: `-${current_context_index * (blade_size) + 30}`, duration: 0.3})
    },[current_context_index]);


    //Runs on first render to initialize the blades 
    useEffect(()=>{
        bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {left: `-${blade_size}`, duration: blade_transition_duration, delay: blade_transition_delay});
        xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {left: `${xbox_blade_container_width +5}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {left: `${xbox_blade_container_width +5}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {left: `${xbox_blade_container_width +5}`, duration: blade_transition_duration, delay: blade_transition_delay},);
        systemBladeTransition.current = gsap.timeline().to(systemRef.current, {left: `${xbox_blade_container_width +5}`, duration: blade_transition_duration, delay: blade_transition_delay},);
    }, [xbox_blade_container_width]);

    //Runs on first render to initialize background slides
    useEffect(()=> {
        xboxBackgroundTransition.current = gsap.timeline().to(xboxBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        gamesBackgroundTransition.current = gsap.timeline().to(gamesBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        mediaBackgroundTransition.current = gsap.timeline().to(mediaBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        systemBackgroundTransition.current = gsap.timeline().to(systemBackgroundRef.current, {left: `${xbox_blade_container_width}`, duration: background_transition_duration, delay: background_transition_delay});
        
    }, [xboxBackgroundRef.current])


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

        const updateContainerWidth = () => {
            xboxBladeContainerRef && dispatch(updateBladeContainerWidth(xboxBladeContainerRef.current.offsetWidth));
         }

         //TODO: Optimize using debounce.
         window.addEventListener('resize', updateContainerWidth);

        moveBlade();
        updateContainerWidth();
    }, [current_context_index, bladeContainerTransition, xbox_blade_position]);

    return (
        <div>
            <h2>{current_dashboard_context}</h2>
            <h2>{xbox_blade_container_width}</h2>
            <div className={styles.mainContainer}>
                <div className={styles.bladeContainer} ref={xboxBladeContainerRef}>
                    <div id={styles["marketplaceBlade"]} className={`${styles.blade} `}  style={{"--index": 0}} ref={marketplaceRef} onClick={()=> {dispatch(navigateTo("marketplace"));}}><p>marketplace</p></div>
                    <div id={styles["xboxliveBlade"]}    className={`${styles.blade}`}   style={{"--index": 1}} ref={xboxliveRef}    onClick={()=> {dispatch(navigateTo("xboxlive"));}}><p>xbox live</p></div>
                    <div id={styles["gamesBlade"]}       className={`${styles.blade}`}   style={{"--index": 2}} ref={gamesRef}       onClick={()=> dispatch(navigateTo("games"))}><p>games</p></div>
                    <div id={styles["mediaBlade"]}       className={`${styles.blade}`}   style={{"--index": 3}} ref={mediaRef}       onClick={()=> dispatch(navigateTo("media"))}><p>media</p></div>
                    <div id={styles["systemBlade"]}      className={`${styles.blade}`}   style={{"--index": 4}} ref={systemRef}      onClick={()=> dispatch(navigateTo("system"))}><p>system</p></div>
                </div>
                <h2 className={styles.sectionHeading}>{formattedContext(current_dashboard_context)}</h2>
                <section className={styles.gamesContainer}>
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

                    <div className={styles.outerContextContainer}>
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
                                <div className={styles.selectItemListContainer}>
                                    <div className={styles.innerListContainer}>
                                        <div className={styles.listItem}><span className={`${styles.listIcon} ${styles.joinXBL_icon}`}></span><p>Join Xbox LIVE</p></div>
                                        <div className={styles.listItem_2}><span className={`${styles.listIcon} ${styles.person_icon}`}></span><p>Recover Gamertag from Xbox LIVE</p></div>
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
                                        Games. Tournaments. Entertainment. 
                                        All the rewards. Endless possibilities. What are you waiting for?
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className={`${styles.systemTrayContainer} ${current_context_index !== 1 ? styles.makeTransparent : ''}`}>
                                <div className={styles.trayEllipse}></div>
                                <div className={styles.trayRect}></div>
                                <div className={styles.trayTriangleButton}></div>
                                <div className={styles.trayRectButton}></div>
                                <p>Open Tray</p>
                        </div> */}
                    </div>
                    <div className={styles.outerContextContainer}>
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
                                <div className={marketplaceStyles.selectItemListContainer}>
                                    <div className={marketplaceStyles.innerListContainer}>
                                        <div className={marketplaceStyles.listItem}><span className={`${marketplaceStyles.listIcon} ${marketplaceStyles.card_icon}`}></span><p>Redeem Code</p></div>
                                        <div className={marketplaceStyles.listItem}><span className={`${marketplaceStyles.listIcon} ${marketplaceStyles.download_icon}`}></span><p>Active Downloads</p></div>
                                        <div className={marketplaceStyles.listItem}><span className={`${marketplaceStyles.listIcon} ${marketplaceStyles.crown_icon}`}></span><p>Account Management</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.outerContextContainer}>
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
                                <div className={gamesStyles.selectItemListContainer}>
                                    <div className={gamesStyles.innerListContainer}>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.joystick_icon}`}></span><p>Games Library</p></div>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.trophy_icon}`}></span><p>Achievements</p></div>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.controller_icon}`}></span><p>Played Games</p></div>
                                    </div>
                                </div>
                                <div className={gamesStyles.xboxliveAnimationContainer}>
                                    <div className={styles.logoContainer}></div>
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
                        {/* <div className={`${styles.systemTrayContainer} ${current_context_index !== 2 ? styles.makeTransparent : ''}`}>
                                <div className={styles.trayEllipse}></div>
                                <div className={styles.trayRect}></div>
                                <div className={styles.trayTriangleButton}></div>
                                <div className={styles.trayRectButton}></div>
                                <p>Open Tray</p>
                        </div> */}
                    </div>

                    <div className={styles.outerContextContainer}>
                        <div id={gamesStyles["media"]} className={`${current_context_index !== 3 ? styles.makeTransparent : ""}`}>
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
                                <div className={gamesStyles.selectItemListContainer}>
                                    <div className={gamesStyles.innerListContainer}>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.joystick_icon}`}></span><p>Music</p></div>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.trophy_icon}`}></span><p>Pictures</p></div>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.controller_icon}`}></span><p>Videos</p></div>
                                        <div className={gamesStyles.listItem}><span className={`${gamesStyles.listIcon} ${gamesStyles.controller_icon}`}></span><p>Media Center</p></div>
                                    </div>
                                </div>
                                <div className={gamesStyles.xboxliveAnimationContainer}>
                                    <div className={styles.logoContainer}></div>
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
                        {/* <div className={`${styles.systemTrayContainer} ${current_context_index !== 3 ? styles.makeTransparent : ''}`}>
                                <div className={styles.trayEllipse}></div>
                                <div className={styles.trayRect}></div>
                                <div className={styles.trayTriangleButton}></div>
                                <div className={styles.trayRectButton}></div>
                                <p>Open Tray</p>
                        </div> */}
                    </div>

                    <div className={styles.outerContextContainer}>
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
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(0));}}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 0 ? styles.makeTransparent : ""}`}></span>
                                                Console Settings
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(1));}}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 1 ? styles.makeTransparent : ""}`}></span>
                                                Family Settings
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>dispatch(navigateSystemMenu(2))}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 2 ? styles.makeTransparent : ""}`}></span>
                                                Memory
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(3));}}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 3 ? styles.makeTransparent : ""}`}></span>
                                                Network Settings
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(4));}}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 4 ? styles.makeTransparent : ""}`}></span>
                                                Computers
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(5));}}>
                                            <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                            <p>
                                                <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 5 ? styles.makeTransparent : ""}`}></span>
                                                Xbox Live Vision
                                            </p>
                                        </div>
                                        <div className={systemStyles.listItem} onClick={()=>{dispatch(navigateSystemMenu(6));}}>
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
                                <div className={systemStyles.containerHalf}>
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
                        {/* <div className={`${styles.systemTrayContainer} ${current_context_index !== 3 ? styles.makeTransparent : ''}`}>
                                <div className={styles.trayEllipse}></div>
                                <div className={styles.trayRect}></div>
                                <div className={styles.trayTriangleButton}></div>
                                <div className={styles.trayRectButton}></div>
                                <p>Open Tray</p>
                        </div> */}
                    </div>

                </section>
                
            </div>
        </div>
    )
}

export default Xbox

