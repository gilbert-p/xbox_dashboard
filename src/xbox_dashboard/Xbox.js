import React, {useRef, useMemo, useState, forwardRef, useLayoutEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';
import backgroundAnimation from "../dashboard_styles/BackgroundPulse.module.css";
import useDashboardAnimation from '../custom_hooks/useDashboardBladeAnimation';
import useGuidePanelAnimation from '../custom_hooks/useGuidePanelAnimation';

import { selectContextIndex,
         isTrayDisplayed,}
from './xboxSlice';

import { updateGuideActiveState,
         updateNavigateContext,} 
from './menuSlice';


import GuideMenu from "./components/GuideMenu";
import NavBladesContainer from "./components/NavBladesContainer";
import MarketplacePage from "./components/MarketplacePage";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";


import blade_sound_sfx from "../assets/audio/blade_sound_sfx.mp3";
import utility_sound_sfx from "../assets/audio/utility_sfx.mp3";

import useAudioSound from "../custom_hooks/useAudioSound";



const Xbox = (props) => {

    const dispatch = useDispatch();

    const bladeContainerRef= useDashboardAnimation();
    const guidePanelAnimation = useGuidePanelAnimation();
    
    
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
            await new Promise((resolve) => setTimeout(resolve, 50));
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



    //Foreign extension
    const foreignExtendGamerProfile = () => {
        dispatch(updateNavigateContext('foreign_extension'));
        dispatch(updateGuideActiveState('foreign_gamer_profile'));
        guidePanelAnimation.extendRevealContent('foreign_gamer_profile');
    }

    const foreignExtendCommunityPage = () => {
        dispatch(updateNavigateContext('foreign_extension'));
        dispatch(updateGuideActiveState('foreign_community_profile'));
        guidePanelAnimation.extendRevealContent('foreign_community_profile');
    }

    function slideBladesAway () {

        bladeContainerRef.slideBladesOut();
    }

    function slideBladesBack () {
        bladeContainerRef.slideBladesBack();
    }
    
      

    return (
        <div className={styles.xboxComponent}>

            <div className={styles.arrowContextButtonContainer}  >
                <div className={styles.xboxHomeLogo} onClick={()=>{showGuideSettings()}}><span className={styles.ellipseGlow}></span></div>
                <div className={styles.leftArrow} onClick={()=>{shiftBladeLeft()}}></div>
                <div className={styles.rightArrow} onClick={()=>{shiftBladeRight()}}></div>
                {/* onClick={()=>{foreignExtendGamerProfile()}} */}
            </div>

            <GuideMenu guideAnimationRef={guidePanelAnimation} />
         

            {/* Renders the blade components */}
            <div className={styles.bladeMask}>
            {<NavBladesContainer bladeContainerRef={bladeContainerRef['mountRef']} 
                                 centerBoxAnimateRef={bladeContainerRef['centerBlockExpandRef']}
                                 dashboardUnderlayRef={bladeContainerRef['dashboardUnderlayRef']}
                                 leftBladeGroupRef={bladeContainerRef['leftBladeGroupRef']}
                                 rightBladeGroupRef={bladeContainerRef['rightBladeGroupRef']}
                                 l_marketplaceBladeInactiveRef={bladeContainerRef['l_marketplaceBladeInactiveRef']}
                                 l_xboxliveBladeInactiveRef={bladeContainerRef['l_xboxliveBladeInactiveRef']}
                                 l_gamesBladeInactiveRef={bladeContainerRef['l_gamesBladeInactiveRef']}
                                 l_mediaBladeActiveRef={bladeContainerRef['l_mediaBladeActiveRef']}
                                 l_gamesBladeActiveRef={bladeContainerRef['l_gamesBladeActiveRef']}
                                 r_mediaBladeInactiveRef={bladeContainerRef['r_mediaBladeInactiveRef']}
                                 r_systemBladeInactiveRef={bladeContainerRef['r_systemBladeInactiveRef']} />} 
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


                        {/* <div className={styles.dashboardWhiteUnderlay}></div> */}
                        <MarketplacePage slideBladesAway={slideBladesAway} slideBladesBack={slideBladesBack} guideAnimationRef={guidePanelAnimation}/>
                        <XboxlivePage    foreignExtendGamerProfile={foreignExtendGamerProfile} foreignExtendCommunityPage={foreignExtendCommunityPage}   current_context_index={current_context_index}    guideAnimationRef={guidePanelAnimation}/>
                        <GamesPage       foreignExtendGamerProfile={foreignExtendGamerProfile} gamesSubPageExit={bladeContainerRef['gamesSubPageExit']} gamesSubPageAnimation={bladeContainerRef['gamesSubPageAnimation']} slideBladesAway={slideBladesAway} slideBladesBack={slideBladesBack} current_context_index={current_context_index}    guideAnimationRef={guidePanelAnimation}/>
                        <MediaPage       foreignExtendGamerProfile={foreignExtendGamerProfile} mediaSubPageExit={bladeContainerRef['mediaSubPageExit']} mediaSubPageAnimation={bladeContainerRef['mediaSubPageAnimation']} current_context_index={current_context_index}    guideAnimationRef={guidePanelAnimation}/>
                        <SystemPage      current_context_index={current_context_index}    guideAnimationRef={guidePanelAnimation}/>

                        {/* Buttons, System Tray */}
                        <div className={styles.staticContent}>

                            

                            {/* <div className={styles.leftEdge}></div>
                            <div className={styles.rightEdge}></div> */}

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

