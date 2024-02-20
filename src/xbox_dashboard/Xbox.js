import React, {useRef, useState, forwardRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';

import backgroundAnimation from "../dashboard_styles/BackgroundPulse.module.css";

import iconLibrary from "../dashboard_styles/IconStyling.module.css";

import useDashboardAnimation from '../custom_hooks/useDashboardBladeAnimation';
import useGuidePanelAnimation from '../custom_hooks/useGuidePanelAnimation';
import useCurrentTime from '../custom_hooks/useCurrentTime';

import { selectContextIndex,
         isTrayDisplayed,
         isGuideOpen,}
from './xboxSlice';

import { selectGuideActiveState,
         updateGuideActiveState,
         updateShowBlades } 
from './menuSlice';


import GuideMenu from "./components/GuideMenu";
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



const Xbox = (props) => {

    const dispatch = useDispatch();

    const bladeContainerRef= useDashboardAnimation();
    const guidePanelAnimation = useGuidePanelAnimation();

    const guideActiveState = useSelector(selectGuideActiveState);

    
    
    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const display_tray = useSelector(isTrayDisplayed);


    //Refs for animating elements
    const xboxBladeContainerRef = useRef(null);



    //Sound Variables
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



    const shiftBladeLeft = () => {
        switch(current_context_index) {
            case 1 :
                bladeSFX.current['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 2:
                bladeSFX.current['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 3:
                bladeSFX.current['play']({id: 'games_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 4:
                bladeSFX.current['play']({id: 'media_shift'});
                bladeContainerRef.shiftLeft();
                break;
            case 'default': break;
        }
    };

    const shiftBladeRight = () => {
        switch(current_context_index) {
            case 0 :
                bladeSFX.current['play']({id: 'xbl_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 1:
                bladeSFX.current['play']({id: 'games_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 2:
                bladeSFX.current['play']({id: 'media_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 3:
                bladeSFX.current['play']({id: 'system_shift'});
                bladeContainerRef.shiftRight();
                break;
            case 'default': break;
        }

    };

    const openGuideSfx = async () => {
        const playButtonSfx = async () => {
            utilitySFX.current['play']({id:'std_button_press'});
            await new Promise((resolve) => setTimeout(resolve, 150));
        }

        const playGuideOpenSfx = async () => {
            utilitySFX.current['play']({id:'open_guide_sfx'});
            await new Promise((resolve) => setTimeout(resolve, 0));
        };

        await playButtonSfx();
        await playGuideOpenSfx();

    }

    const showGuideSettings = () => {
        openGuideSfx();
        guidePanelAnimation.showGuideSettings();
    }


    const selectBackgroundAnimation = () => {
        let backgroundPulseType = "";
        switch(current_context_index){
            case 0: backgroundPulseType = "marketplaceBackgroundStatic";break;
            case 1: backgroundPulseType = "xboxlivePulse";break;
            case 2: backgroundPulseType = "gamesPulse";break;
            case 3: backgroundPulseType = "mediaPulse";break;
            case 4: backgroundPulseType = "systemPulse";break;
            default: break;
        }
        return backgroundPulseType;
    }

    const selectBackgroundDrop = () => {
        let backgroundDrop = "";
        switch(current_context_index){
            case 1: backgroundDrop = styles.xboxliveBackground;break;
            case 2: backgroundDrop = styles.gamesBackground;break;
            case 3: backgroundDrop = styles.mediaBackground;break;
            case 4: backgroundDrop = styles.systemBackground;break;
            default: break;
        }
        return backgroundDrop;
    }
      

    return (
        <div className={styles.xboxComponent}>

            <div className={styles.arrowContextButtonContainer}>
                <div className={styles.xboxHomeLogo} onClick={()=>{showGuideSettings()}}><span className={styles.ellipseGlow}></span></div>
                <div className={styles.leftArrow} onClick={()=>{shiftBladeLeft()}}></div>
                <div className={styles.rightArrow} onClick={()=>{shiftBladeRight()}}></div>
            </div>

            <GuideMenu guideAnimationRef={guidePanelAnimation}/>
         

            {/* Renders the blade components */}
            <div className={styles.bladeMask}>
            {<NavBladesContainer bladeContainerRef={bladeContainerRef['mountRef']} />} 
            </div>

            {/* Provides a mask to prevent overflow from the page content */}
            <div className={styles.bladeContainerMask}>
                <div className={styles.mainContainer}>

                    {/* Safe Viewing area */}
                    <div className={styles.pageContentArea} ref={xboxBladeContainerRef}>


                    <div id={backgroundAnimation[`${selectBackgroundAnimation()}`]} className={`${selectBackgroundDrop()}`} >
                        <div className={`${backgroundAnimation.pulseContainer}`}>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 1}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 2}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 3}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 4}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 5}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 6}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 7}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 8}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 9}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 10}}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                        </div>
                    </div>


                        <div className={styles.dashboardWhiteUnderlay}></div>
                        <MarketplacePage/>
                        <XboxlivePage current_context_index={current_context_index}/>
                        <GamesPage current_context_index={current_context_index}/>
                        <MediaPage current_context_index={current_context_index}/>
                        <SystemPage current_context_index={current_context_index}/>

                        {/* Buttons, System Tray */}
                        <div className={styles.staticContent}>


                            <div className={styles.leftEdge}></div>
                            <div className={styles.rightEdge}></div>

                            <div className={`${styles.systemTrayContainer} ${!display_tray ? transitionStyles.makeTransparent : undefined}`}>
                                <div className={styles.trayEllipse}></div>
                                <div className={styles.trayRect}></div>
                                <div className={styles.trayTriangleButton}></div>
                                <div className={styles.trayRectButton}></div>
                                <p>Play Halo 3</p>
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

