import React, {useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";

import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';

import { 
    selectContextIndex,
    selectTransitionState,
} from '../../redux_slices/xboxSlice';

import {
    selectShowBladeState,
    selectThemeSelection,
    } from '../../redux_slices/menuSlice';

import { NavBladesContainerProps } from 'src/custom_types/utilityTypes';

const NavBladesContainer: React.FC<NavBladesContainerProps> = (props) => {

    const { mountRef, 
            centerBlockExpandRef, 
            leftBladeGroupRef,
            rightBladeGroupRef,
            l_marketplaceBladeInactiveRef,
            l_xboxliveBladeInactiveRef,
            l_gamesBladeInactiveRef,

            l_gamesBladeActiveRef,
            l_mediaBladeActiveRef,
            
            r_mediaBladeInactiveRef,
            r_systemBladeInactiveRef, } = props['dashboardAnimationState'];

    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex) || 0;

    const show_blade_state = useSelector(selectShowBladeState);

    const selected_theme = useSelector(selectThemeSelection);

    const is_transitioning = useSelector(selectTransitionState);

    // dispatch(setBladeAnimationRef(bladeContainerRef));
    const bladeRef = useRef<HTMLDivElement | null>(null);





  return <>
        <div className={bladeStyles.centeredMask}>


        <div className={bladeStyles.animateTransparentOpeningContainer}>

            <div ref={centerBlockExpandRef} className={bladeStyles.centerBlockExpand}></div>

        </div>

            <div className={`${bladeStyles.bladeContainer}  ${show_blade_state ? '' : transitionStyles.instantTransparent}`} ref={mountRef}>
                <div className={bladeStyles.centeredContent}>

                    <div className={bladeStyles.leftGroup} ref={leftBladeGroupRef}>

                        <div  id={bladeStyles["marketplaceBlade-left"]} className={`${bladeStyles.blade}`}  >

                            <div id={bladeStyles["marketplaceBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 0 ? bladeStyles[`${'marketplaceActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} > 
                                <h3 id={bladeStyles["marketplaceTitle"]} className={`${bladeStyles.bladeTitle}`} ref={bladeRef}>marketplace</h3>
                            </div>


                            <div ref={l_marketplaceBladeInactiveRef} id={bladeStyles["marketplaceBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index !== 0 ? bladeStyles[`${'leftBladeInactive' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["marketplaceTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>marketplace</h3> 
                            </div>

                        </div>

                        <div  id={bladeStyles["xboxliveBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div ref={l_xboxliveBladeInactiveRef} id={bladeStyles["xboxliveBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 1 ? transitionStyles.instantTransparent :  bladeStyles[`${'leftBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["xboxliveTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>xbox live</h3> 
                            </div>

                            <div id={bladeStyles["xboxliveBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 1 ? bladeStyles[`${'xboxliveActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["xboxliveTitle"]} className={`${bladeStyles.bladeTitle} ${current_context_index !== 1 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>xbox live</h3>
                            </div>

                        </div>

                        <div  id={bladeStyles["gamesBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div ref={l_gamesBladeInactiveRef} id={bladeStyles["gamesBladeLeftInactive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 2 ? transitionStyles.instantTransparent : bladeStyles[`${'leftBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["gamesTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>games</h3> 
                            </div>
                            
                            <div ref={l_gamesBladeActiveRef} id={bladeStyles["gamesBladeLeftActive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index === 2 ? bladeStyles[`${'gamesActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["gamesTitle"]} className={`${bladeStyles.bladeTitle} ${current_context_index !== 2 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>games</h3>
                            </div>

                        </div>

                        <div  id={bladeStyles["mediaBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div id={bladeStyles["mediaBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 3 ? transitionStyles.instantTransparent : bladeStyles[`${'leftBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["mediaTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>media</h3> 
                            </div>
                            

                            <div ref={l_mediaBladeActiveRef} id={bladeStyles["mediaBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 3 ? bladeStyles[`${'mediaActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["mediaTitle"]} className={`${bladeStyles.bladeTitle} ${current_context_index !== 3 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>media</h3>
                            </div>

                        </div>

                        <div  id={bladeStyles["systemBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div  className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 4 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}></div>
                            
                            <div id={bladeStyles["systemBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 4 ? bladeStyles[`${'systemActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["systemTitle"]} className={`${bladeStyles.bladeTitle} ${current_context_index !== 4 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>system</h3>
                            </div>

                        </div>    
                    </div>

                    <div className={bladeStyles.rightGroup} ref={rightBladeGroupRef}>

                        <div id={bladeStyles["xboxliveBlade-right"]} className={`${bladeStyles.blade} `} >

                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 1 ? transitionStyles.instantTransparent : bladeStyles[`${'rightBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["xboxliveTitleInactiveRight"]} className={`${bladeStyles.bladeTitle}`}>xbox live</h3>
                            </div>
                                
                        </div>

                        <div id={bladeStyles["gamesBlade-right"]} className={`${bladeStyles.blade} `} >

                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 2 ? transitionStyles.instantTransparent : bladeStyles[`${'rightBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["gamesTitleInactiveRight"]} className={`${bladeStyles.bladeTitle}`}>games</h3>
                            </div>

                        </div>

                        <div id={bladeStyles["mediaBlade-right"]} className={`${bladeStyles.blade} `} >

                            <div ref={r_mediaBladeInactiveRef}  className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 3 ? transitionStyles.instantTransparent : bladeStyles[`${'rightBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["mediaTitleInactiveRight"]} className={`${bladeStyles.bladeTitle}`}>media</h3>
                            </div>

                        </div>

                        <div id={bladeStyles["systemBlade-right"]} className={`${bladeStyles.blade} `} >

                            <div ref={r_systemBladeInactiveRef} className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 4 ? transitionStyles.instantTransparent : bladeStyles[`${'rightBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["systemTitleInactiveRight"]} className={`${bladeStyles.bladeTitle}`}>system</h3>
                            </div>

                        </div>
                    </div>
                </div>

            

            </div>


        </div>

  </>;
};

export default NavBladesContainer;


