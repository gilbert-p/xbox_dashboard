import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import styles from './Dashboard.module.css';
import marketplaceStyles from './Marketplace.module.css';
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
import { current } from '@reduxjs/toolkit';

const Xbox = () => {

    const dispatch = useDispatch();
    const [current_context, setCurrentContext] = useState("marketplace");
    const [blade_container_width, setBladeContainerWidth] = useState(0);
    const [xbox_blade_reversed, setXboxBladeReversed] = useState(false);
    const [games_blade_reversed, setGamesBladeReversed] = useState(false);
    const [media_blade_reversed, setMediaBladeReversed] = useState(false);
    const [system_blade_reversed, setSystemBladeReversed] = useState(false);
    const current_dashboard_context = useSelector(selectCurrentContext);
    const current_context_index = useSelector(selectContextIndex);
    const xbox_blade_position = useSelector(selectXboxPos);
    const games_position = useSelector(selectGamesPos);
    const media_position = useSelector(selectMediaPos);
    const system_pos = useSelector(selectSystemPos);
    const display_tray = useSelector(isTrayDisplayed);
    const blade_size = useSelector(selectBladeSize);
    const xbox_blade_container_width = useSelector(selectBladeContainerWidth);

    const transition_duration = 1.2;



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

    const xboxBladeContainerRef = useRef(null);
    const xboxliveRef = useRef(null);
    const marketplaceRef = useRef(null);
    const gamesRef = useRef(null);
    const mediaRef = useRef(null);
    const systemRef = useRef(null);
    const queryRef = useRef(null);

    const gsapQuery = gsap.utils.selector(xboxBladeContainerRef);
    
    const bladeContainerTransition = useRef(null);
    const xboxBladeTransition = useRef();
    const gamesBladeTransition = useRef();
    const mediaBladeTransition = useRef();
    const systemBladeTransition = useRef();


    // xboxBladeTransition.to(xboxliveRef.current, {id:"xboxBlade", x: `${xbox_blade_container_width - blade_size}`, duration: transition_duration});
    // gamesBladeTransition.to(gamesRef.current, {x: `${xbox_blade_container_width - blade_size}`, duration: transition_duration});
    // mediaBladeTransition.to(mediaRef.current, {x: `${xbox_blade_container_width - blade_size}`, duration: transition_duration});
    // systemBladeTransition.to(systemRef.current, {x: `${xbox_blade_container_width - blade_size}`, duration: transition_duration});




    useEffect(()=>{
        bladeContainerTransition.current = gsap.timeline().to(xboxBladeContainerRef.current, {x: `-${blade_size}`});
        xboxBladeTransition.current = gsap.timeline().to(xboxliveRef.current, {x: `${xbox_blade_container_width}`});
        gamesBladeTransition.current = gsap.timeline().to(gamesRef.current, {x: `${xbox_blade_container_width}`}, 0);
        mediaBladeTransition.current = gsap.timeline().to(mediaRef.current, {x: `${xbox_blade_container_width}`}, 0);
        systemBladeTransition.current = gsap.timeline().to(systemRef.current, {x: `${xbox_blade_container_width}`}, 0);
        // .to(xboxliveRef.current, {x: `${xbox_blade_container_width}`}, 0)
        // .to(gamesRef.current, {x: `${xbox_blade_container_width}`}, 0)
        // .to(mediaRef.current, {x: `${xbox_blade_container_width}`}, 0)
        // .to(systemRef.current, {x: `${xbox_blade_container_width}`}, 0);
    }, [xbox_blade_container_width]);


    useEffect(()=> {


        const moveBladeContainer = () => {

            

            // switch(current_context_index) {
            //     case 0:
            //     break;
            //     case 1:
            //     break;
            //     case 2:
            //     break;
            //     case 3:
            //     break;
            //     case 4:
            //     break;
            //     case 5:
            //     break;
            //     default:
            //     break;
            // }
        }

        const moveBlade = () => {
    
            switch(current_context_index) {
                case 0:
                    xboxBladeTransition.current.play();
                    gamesBladeTransition.current.play();
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();
                break;
                case 1:
                    xboxBladeTransition.current.reverse();
                    gamesBladeTransition.current.play();
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();

                break;
                case 2:
                    xboxBladeTransition.current.reverse();
                    gamesBladeTransition.current.reverse();
                    mediaBladeTransition.current.play();
                    systemBladeTransition.current.play();
                break;
                case 3:
                    xboxBladeTransition.current.reverse();
                    gamesBladeTransition.current.reverse();
                    mediaBladeTransition.current.reverse();
                    systemBladeTransition.current.play();

                break;
                case 4:
                    xboxBladeTransition.current.reverse();
                    gamesBladeTransition.current.reverse();
                    mediaBladeTransition.current.reverse();
                    systemBladeTransition.current.reverse();
                    // systemBladeTransition.to(mediaRef.current, {left: `0`, duration: transition_duration, ease: "power2.out"});
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
        moveBladeContainer();
    }, [current_context, current_context_index, xbox_blade_reversed, bladeContainerTransition, xbox_blade_position]);

    return (
        <div>
            <h2>{current_dashboard_context}</h2>
            <h2>{xbox_blade_container_width}</h2>
            <div className={styles.mainContainer}>
                <div className={styles.bladeContainer} ref={xboxBladeContainerRef}>
                    <div id={styles["marketplaceBlade"]} className={`${styles.blade} `}  style={{"--index": 0}} ref={marketplaceRef} onClick={()=> {dispatch(navigateTo("marketplace")); setXboxBladeReversed(false)}}><p>marketplace</p></div>
                    <div id={styles["xboxliveBlade"]}    className={`${styles.blade}`}   style={{"--index": 1}} ref={xboxliveRef}    onClick={()=> {dispatch(navigateTo("xboxlive")); setXboxBladeReversed(!xbox_blade_reversed)}}><p>xbox live</p></div>
                    <div id={styles["gamesBlade"]}       className={`${styles.blade}`}   style={{"--index": 2}} ref={gamesRef}       onClick={()=> dispatch(navigateTo("games"))}><p>games</p></div>
                    <div id={styles["mediaBlade"]}       className={`${styles.blade}`}   style={{"--index": 3}} ref={mediaRef}       onClick={()=> dispatch(navigateTo("media"))}><p>media</p></div>
                    <div id={styles["systemBlade"]}      className={`${styles.blade}`}   style={{"--index": 4}} ref={systemRef}      onClick={()=> dispatch(navigateTo("system"))}><p>system</p></div>
                </div>
                <h2 className={styles.sectionHeading}>{formattedContext(current_dashboard_context)}</h2>
                <section className={styles.gamesContainer}>

                    {/* These elements are consistent across all contexts */}
                    <div className={styles.topBorder}></div>
                    <div className={styles.bottomBorder}></div>
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


                    <div id={styles["xboxlive"]} className={`${""} ${current_dashboard_context !== "xboxlive" ? styles.makeTransparent : ""}`}>
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
                    <div className={`${styles.systemTrayContainer} ${!display_tray ? styles.makeTransparent : ""}`}>
                        <div className={styles.trayEllipse}></div>
                        <div className={styles.trayRect}></div>
                        <div className={styles.trayTriangleButton}></div>
                        <div className={styles.trayRectButton}></div>
                        <p>Open Tray</p>
                    </div>
                    <div className={styles.controllerButtons}></div>
                </section>
                
            </div>
        </div>
    )
}

export default Xbox

