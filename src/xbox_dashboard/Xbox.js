import React, {useRef, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import reactFullscreenStatus from "../custom_hooks/useFullscreenStatus";
import styles from '../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../dashboard_styles/TransitionStyles.module.css';
import useDashboardAnimation from '../custom_hooks/useDashboardBladeAnimation';
import useGuidePanelAnimation from '../custom_hooks/useGuidePanelAnimation';

import { selectContextIndex,
         isTrayDisplayed }
from './xboxSlice';
import NavBladesContainer from "./components/NavBladesContainer";
import MarketplacePage from "./components/MarketplacePage";
import XboxlivePage from './components/XboxlivePage';
import GamesPage from "./components/GamesPage";
import MediaPage from "./components/MediaPage";
import SystemPage from "./components/SystemPage";

import profileCardStyles from "../dashboard_styles/ProfileCard.module.css";


const Xbox = (props) => {


    const bladeContainerRef= useDashboardAnimation();
    const guidePanelAnimation = useGuidePanelAnimation();

    
    
    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const display_tray = useSelector(isTrayDisplayed);



    //Refs for animating elements
    const xboxBladeContainerRef = useRef(null);
    const marketplaceBackgroundRef = useRef(null);


    

      

    return (
        <div className={styles.xboxComponent}>
            {/* <div onClick={()=> {}} className={styles.orientationRequestOverlay}>
            </div> */}

            <div className={styles.arrowContextButtonContainer}>
                    <div className={styles.xboxHomeLogo} onClick={()=>{guidePanelAnimation.openGuideMenu()}}><span className={styles.ellipseGlow}></span></div>
                    <div className={styles.leftArrow} onClick={()=>{bladeContainerRef.shiftLeft()}}></div>
                    <div className={styles.rightArrow} onClick={()=>{bladeContainerRef.shiftRight()}}></div>
            </div>

            <div id={`guideMenuPanel`} className={styles.guideMenuContainer} ref={guidePanelAnimation['guideMenuRef']}>
                    <div  className={styles.guidePanel} ref={guidePanelAnimation['guideBladeRef']}>
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

                            </div>
                            <div className={styles.guidePanelTopBorder}></div>
                            <div className={styles.guidePanelBottomBorder}></div>
                        </div>

                    </div>
                </div>  
         

            {/* Renders the blade components */}
            <div className={styles.bladeMask}>
            {<NavBladesContainer bladeContainerRef={bladeContainerRef['mountRef']} />} 
                {/* <div className={styles.guideMenuContainer} ref={bladeContainerRef['guideMenuRef']}>
                    <div id={`guideMenuPanel`} className={styles.guidePanel} ref={bladeContainerRef['guideBladeRef']}>
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

                            </div>
                            <div className={styles.guidePanelTopBorder}></div>
                            <div className={styles.guidePanelBottomBorder}></div>
                        </div>

                    </div>
                </div>   */}
         
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
}

export default Xbox

