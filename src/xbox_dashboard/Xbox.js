import React, {useRef, useState, forwardRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reactFullscreenStatus from "../custom_hooks/useFullscreenStatus";
import useSound from 'use-sound';
import styles from '../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';

import iconLibrary from "../dashboard_styles/IconStyling.module.css";

import useDashboardAnimation from '../custom_hooks/useDashboardBladeAnimation';
import useGuidePanelAnimation from '../custom_hooks/useGuidePanelAnimation';
import useCurrentTime from '../custom_hooks/useCurrentTime';

import { selectContextIndex,
         isTrayDisplayed,
         updateGuideMenuState,
         isGuideOpen,}
from './xboxSlice';

import {updateSelectionHighlight,
        navigateGuideMenu,
        selectGuideMenuIndex,
        selectHighlightState}
from './menuSlice';

import NavBladesContainer from "./components/NavBladesContainer";
import MarketplacePage from "./components/MarketplacePage";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";

import itemSelectStyles from "../dashboard_styles/ItemSelect.module.css";

import blade_sound_sfx from "../assets/audio/blade_sound_sfx.mp3";
import utility_sound_sfx from "../assets/audio/utility_sfx.mp3";

import useAudioSound from "../custom_hooks/useAudioSound";
import { debounce } from "lodash";



const GuidePanelClock = () => {
    const currentTime = useCurrentTime();

    const hours = currentTime.getHours() % 12 || 12;
    const minutes = currentTime.getMinutes();
    const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
          <span>{ampm}</span>
        </>
      );
};




const Xbox = (props) => {

    const bladeContainerRef= useDashboardAnimation();

    const guideMenuRef = useRef(null);
    const guidePanelRef = useRef(null);
    const guidePanelAnimation = useGuidePanelAnimation();


    const currentTime = useCurrentTime();

    
    
    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const display_tray = useSelector(isTrayDisplayed);
    const is_guide_open = useSelector(isGuideOpen);


    const guideMenuIndex = useSelector(selectGuideMenuIndex);
    const isHighlightActive = useSelector(selectHighlightState);



    //Refs for animating elements
    const xboxBladeContainerRef = useRef(null);
    const marketplaceBackgroundRef = useRef(null);

    const [isMenuOpen, setXboxMenuState] = useState(false);

    const panelref = useRef(null);


    const bladeSfxSprite = {
        xbl_shift: [0,500],
        games_shift: [600, 450],
        media_shift: [1100, 450],
        system_shift: [1500, 450]
    };


    const utilitySfxSprite = {
        std_button_press:[0,500],
        open_guide_sfx: [600, 500],
        close_guide_sfx: [1200, 500],
    }

    const bladeSFX = useAudioSound(blade_sound_sfx, bladeSfxSprite);

    const utilitySFX = useAudioSound(utility_sound_sfx, utilitySfxSprite);

    const dispatch = useDispatch();

    const delayInput = useCallback(
        debounce((fn) => {
            dispatch(fn);
            }, 700),
            []
    );


    const shiftBladeLeft = () => {
        switch(current_context_index) {
            case 1 :
                bladeSFX['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 2:
                bladeSFX['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 3:
                bladeSFX['play']({id: 'games_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 4:
                bladeSFX['play']({id: 'media_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 'default': break;
        }
    };

    const shiftBladeRight = () => {
        switch(current_context_index) {
            case 0 :
                bladeSFX['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 1:
                bladeSFX['play']({id: 'games_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 2:
                bladeSFX['play']({id: 'media_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 3:
                bladeSFX['play']({id: 'system_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 'default': break;
        }

    };

    const openGuideSfx = async () => {
        const playButtonSfx = async () => {
            utilitySFX['play']({id:'std_button_press'});
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        const playGuideOpenSfx = async () => {
            utilitySFX['play']({id:'open_guide_sfx'});
            await new Promise((resolve) => setTimeout(resolve, 0));
        };

        await playButtonSfx();
        await playGuideOpenSfx();

    }

    const closeGuideSfx = () => {
        utilitySFX['play']({id:'close_guide_sfx'});
    }


    const openGuideMenus = () => {
        guidePanelAnimation.openGuideMenu();
        openGuideSfx();
        // updateGuideMenuState();
    }

      

    return (
        <div className={styles.xboxComponent}>
            {/* <div onClick={()=> {}} className={styles.orientationRequestOverlay}>
            </div> */}

            <div className={styles.arrowContextButtonContainer}>
                    <div className={styles.xboxHomeLogo} onClick={()=>{openGuideMenus()}}><span className={styles.ellipseGlow}></span></div>
                    <div className={styles.leftArrow} onClick={()=>{shiftBladeLeft()}}></div>
                    <div className={styles.rightArrow} onClick={()=>{shiftBladeRight()}}>

                    

                    </div>
            </div>

            <div id={styles['guideMenuPanel']} className={styles.guideMenuContainer} ref={guidePanelAnimation['guideMenuRef']}>
                    <div  className={styles.guidePanel} ref = {guidePanelAnimation['guidePanelRef']}>
                        <div className={styles.nameplateEdge}></div>
                        <div className={styles.guidePanelMask}>
                            <div className={styles.guidePanelBackground}>
                                    


                                    <div className={styles.profileContainer}>
                                        <div className={styles.profileImgContainer}>
                                            <div className={styles.profileIcon}>
                                                <div className={styles.iconGloss}></div>
                                            </div>
                                        </div>
                                        <div className={styles.profileDescription}>
                                            <p className={styles.gamerscoreTitle}>Gamerscore</p>
                                            <p className={styles.gamerscoreValue}>21117</p>
                                            <p className={styles.zoneTitle}>Status</p>
                                            <div className={styles.zoneStatus}>Online</div>
                                        </div>
                                    </div>

                                    <div className={styles.multiButtonListContainer}>
                                        <p className={styles.multiButtonTitle}>About</p>
                                        <div className={styles.buttonGroup}>
                                            <button className={styles.skewmorphButton}></button>
                                            <button className={styles.skewmorphButton}></button>
                                            <button className={styles.skewmorphButton}></button>
                                        </div>
                                    </div>

                                    <div id={itemSelectStyles["guideSelectList"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                                        <div className={itemSelectStyles.innerListContainer} >
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGuideMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.card_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Redeem Code
                                                </p>
                                                <div className={itemSelectStyles.listItemBorder}></div>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGuideMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.download_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Active Downloads
                                                </p>
                                                <div className={itemSelectStyles.listItemBorder}></div>
                                            </div>
                                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGuideMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.crown_icon}`}></span>
                                                <p>
                                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                                    Account Management
                                                </p>
                                                <div className={itemSelectStyles.listItemBorder}></div>
                                            </div>
                                        </div>
                    </div>



                            </div>
                            <div className={styles.guidePanelTopBorder}>
                                <div className={styles.guidePanelClockContainer}>
                                    <GuidePanelClock/>
                                </div>
                            </div>
                            <div className={styles.guidePanelBottomBorder}></div>
                        </div>

                    </div>
            </div>  
         

            {/* Renders the blade components */}
            <div className={styles.bladeMask}>
            {<NavBladesContainer bladeContainerRef={bladeContainerRef['mountRef']} />} 
            </div>

            {/* Provides a mask to prevent overflow from the page content */}
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

                        <div className={`${styles.systemTrayContainer} ${!display_tray ? transitionStyles.makeTransparent : undefined}`}>
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
};

export default Xbox;

