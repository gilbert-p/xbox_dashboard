import React, { CSSProperties, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';
import backgroundAnimation from "../dashboard_styles/BackgroundPulse.module.css";
import useDashboardAnimation from '../custom_hooks/useDashboardBladeAnimation';
import useGuidePanelAnimation from '../custom_hooks/useGuidePanelAnimation';

import { selectContextIndex,
         isTrayDisplayed,
        }
from '../redux_slices/xboxSlice';

import { updateGuideActiveState,
         updateNavigateContext,
         selectNavigationContext,
        } 
from '../redux_slices/menuSlice';


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

import { OrganizedData } from 'src/ts_types/apiDataTypes';
import { GuidePanelAnimation } from '../custom_types/utilityTypes';




interface CustomCSSProperties extends CSSProperties {
  '--ring-index'?: number;
}

interface XboxDataProps {
  mockDbData: OrganizedData;
}

const Xbox: React.FC<XboxDataProps> = ({ mockDbData }) => {
    const dispatch = useDispatch();
  
    const guidePanelAnimation: GuidePanelAnimation  = useGuidePanelAnimation();
    const dashboardAnimationState = useDashboardAnimation();
  
    const current_context_index = useSelector(selectContextIndex);
    const display_tray = useSelector(isTrayDisplayed);
    const navigationContext = useSelector(selectNavigationContext);
  
    const xboxBladeContainerRef = useRef<HTMLDivElement>(null);
  
    const bladeSfxSprite = {
      xbl_shift: [0, 500],
      games_shift: [600, 450],
      media_shift: [1100, 450],
      system_shift: [1500, 450],
    };
  
    const utilitySfxSprite = {
      std_button_press: [0, 500],
      open_guide_sfx: [600, 500],
      close_guide_sfx: [1200, 500],
    };
  
    const bladeSFX = useAudioSound(blade_sound_sfx, bladeSfxSprite);
    const utilitySFX = useAudioSound(utility_sound_sfx, utilitySfxSprite);
  
    function contextShiftBoundary(navigate_context: string) {
      const regexPattern = /main_menu/i;
      return regexPattern.test(navigate_context);
    }
  
    function shiftBladeLeft() {
      if (!contextShiftBoundary(navigationContext)) {
        return;
      }
  
      switch (current_context_index) {
        case 1:
        case 2:
          bladeSFX.current?.play({ id: 'xbl_shift' });
          dashboardAnimationState.shiftLeft();
          break;
        case 3:
          bladeSFX.current?.play({ id: 'games_shift' });
          dashboardAnimationState.shiftLeft();
          break;
        case 4:
          bladeSFX.current?.play({ id: 'media_shift' });
          dashboardAnimationState.shiftLeft();
          break;
        default:
          break;
      }
    }
  
    function shiftBladeRight() {
      if (!contextShiftBoundary(navigationContext)) {
        return;
      }
  
      switch (current_context_index) {
        case 0:
          bladeSFX.current?.play({ id: 'xbl_shift' });
          dashboardAnimationState.shiftRight();
          break;
        case 1:
          bladeSFX.current?.play({ id: 'games_shift' });
          dashboardAnimationState.shiftRight();
          break;
        case 2:
          bladeSFX.current?.play({ id: 'media_shift' });
          dashboardAnimationState.shiftRight();
          break;
        case 3:
          bladeSFX.current?.play({ id: 'system_shift' });
          dashboardAnimationState.shiftRight();
          break;
        default:
          break;
      }
    }
  
    const openGuideSfx = async () => {
      const playButtonSfx = async () => {
        utilitySFX.current?.play({ id: 'std_button_press' });
        await new Promise((resolve) => setTimeout(resolve, 50));
      };
  
      const playGuideOpenSfx = async () => {
        utilitySFX.current?.play({ id: 'open_guide_sfx' });
        await new Promise((resolve) => setTimeout(resolve, 0));
      };
  
      await playButtonSfx();
      await playGuideOpenSfx();
    };
  
    const showGuideSettings = () => {
      openGuideSfx();
      guidePanelAnimation.showGuideSettings();
    };
  
    const selectBackgroundAnimation = () => {
      let backgroundPulseType = '';
      switch (current_context_index) {
        case 0:
          backgroundPulseType = 'marketplaceBackgroundStatic';
          break;
        case 1:
          backgroundPulseType = 'xboxlivePulse';
          break;
        case 2:
          backgroundPulseType = 'gamesPulse';
          break;
        case 3:
          backgroundPulseType = 'mediaPulse';
          break;
        case 4:
          backgroundPulseType = 'systemPulse';
          break;
        default:
          break;
      }
      return backgroundPulseType;
    };
  
    const selectBackgroundDrop = () => {
      let backgroundDrop = '';
      switch (current_context_index) {
        case 1:
          backgroundDrop = styles.xboxliveBackground;
          break;
        case 2:
          backgroundDrop = styles.gamesBackground;
          break;
        case 3:
          backgroundDrop = styles.mediaBackground;
          break;
        case 4:
          backgroundDrop = styles.systemBackground;
          break;
        default:
          break;
      }
      return backgroundDrop;
    };
  
    const foreignExtendGamerProfile = () => {
      dispatch(updateNavigateContext('foreign_extension'));
      dispatch(updateGuideActiveState('foreign_gamer_profile'));
      guidePanelAnimation.extendRevealContent('foreign_gamer_profile');
    };
  
    const foreignExtendCommunityPage = () => {
      dispatch(updateNavigateContext('foreign_extension'));
      dispatch(updateGuideActiveState('foreign_community_profile'));
      guidePanelAnimation.extendRevealContent('foreign_community_profile');
    };
  
    function slideBladesAway() {
      dashboardAnimationState.slideBladesOut();
    }
  
    function slideBladesBack() {
      dashboardAnimationState.slideBladesBack();
    }
  
    function LoadPageContext() {
      switch (current_context_index) {
        case 0:
          return (
            <MarketplacePage
              mockDbData={mockDbData}
              slideBladesAway={slideBladesAway}
              slideBladesBack={slideBladesBack}
              guideAnimationRef={guidePanelAnimation}
            />
          );
        case 1:
          return (
            <XboxlivePage
              foreignExtendGamerProfile={foreignExtendGamerProfile}
              foreignExtendCommunityPage={foreignExtendCommunityPage}
              current_context_index={current_context_index}
              guideAnimationRef={guidePanelAnimation}
            />
          );
        case 2:
          return (
            <GamesPage
              foreignExtendGamerProfile={foreignExtendGamerProfile}
              gamesSubPageExit={dashboardAnimationState['gamesSubPageExit']}
              gamesSubPageAnimation={dashboardAnimationState['gamesSubPageAnimation']}
              slideBladesAway={slideBladesAway}
              slideBladesBack={slideBladesBack}
              current_context_index={current_context_index}
              guideAnimationRef={guidePanelAnimation}
            />
          );
        case 3:
          return (
            <MediaPage
              foreignExtendGamerProfile={foreignExtendGamerProfile}
              mediaSubPageExit={dashboardAnimationState['mediaSubPageExit']}
              mediaSubPageAnimation={dashboardAnimationState['mediaSubPageAnimation']}
              current_context_index={current_context_index}
              guideAnimationRef={guidePanelAnimation}
            />
          );
        case 4:
          return <SystemPage current_context_index={current_context_index} guideAnimationRef={guidePanelAnimation} />;
        default:
          return null;
      }
    }


    


    return (
        <div className={styles.xboxComponent}>

                
                <div className={styles.arrowContextButtonContainer}  >
                <div className={styles.xboxHomeLogo} onClick={()=>{showGuideSettings()}}><span className={styles.ellipseGlow}></span></div>
                <div className={styles.leftArrow} onClick={()=>{shiftBladeLeft()}}></div>
                <div className={styles.rightArrow} onClick={()=>{shiftBladeRight()}}></div>
                {/* onClick={()=>{foreignExtendGamerProfile()}} */}
            </div>

            <GuideMenu mockDbData={mockDbData} guideAnimationRef={guidePanelAnimation} />
         

            {/* Renders the blade components */}
            <div className={styles.bladeMask}>

                <NavBladesContainer dashboardAnimationState={dashboardAnimationState}/>
            </div>

            {/* Provides a mask to prevent overflow from the page content */}
            <div className={styles.bladeContainerMask}>

                <div className={styles.mainContainer}>

                    {/* Safe Viewing area */}
                    <div className={styles.pageContentArea} ref={xboxBladeContainerRef}>


                    <div id={backgroundAnimation[`${selectBackgroundAnimation()}`]} className={`${selectBackgroundDrop()}`} >
                        <div className={`${backgroundAnimation.pulseContainer}`}>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 1} as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 2}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 3}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 4}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 5}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 6}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 7}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 8}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 9}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                            <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 10}  as CustomCSSProperties}>
                                <div className={backgroundAnimation.pulseRingInner}></div>
                            </div>
                        </div>
                    </div>

                    <LoadPageContext/>

                    {/* Buttons, System Tray */}
                    <div className={styles.staticContent}>
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

