import React, { useLayoutEffect,  useCallback, useRef, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { 
    selectContextIndex,
    updateBladeSize,
    selectTransitionState,
} from '../xboxSlice';

import {
    selectShowBladeState,
    selectThemeSelection,
    
    selectNavigationContext,
} from '../menuSlice';

import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';

const NavBladesContainer = (props) => {

    const { isMobileView, 
            bladeContainerRef, 
            centerBoxAnimateRef, 
            dashboardUnderlayRef,
            leftBladeGroupRef,
            rightBladeGroupRef,
            l_marketplaceBladeInactiveRef,
            l_xboxliveBladeInactiveRef,
            l_gamesBladeActiveRef,
            r_mediaBladeInactiveRef,
            r_systemBladeInactiveRef, } = props;
    
    const dispatch = useDispatch();


    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex) || 0;

    const show_blade_state = useSelector(selectShowBladeState);

    const selected_theme = useSelector(selectThemeSelection);

    const is_transitioning = useSelector(selectTransitionState);

    const isContextMain = useSelector(selectNavigationContext);



    // dispatch(setBladeAnimationRef(bladeContainerRef));
    const bladeRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceBladeResize = useCallback(
        debounce((fn) => {
            dispatch(fn);
            }, 1000),
            []
    );


    useEffect(()=>{
        // console.log("transition", is_transitioning);
    }, [is_transitioning]);


    const DashboardSelectUnderlay = () => {
        switch(current_context_index) {
            case 0:
                return <div id={bladeStyles['marketplaceUnderlay']}  className={` ${bladeStyles.dashboardWhiteUnderlay}   ${current_context_index === 0 ? bladeStyles.dashboardUnderlayActive : '' }`} ></div>;
            case 1:
                return <div id={bladeStyles['xboxliveUnderlay']}  className={` ${bladeStyles.dashboardWhiteUnderlay}   ${current_context_index === 1 ? bladeStyles.dashboardUnderlayActive : '' }`} ></div>;
            case 'default':
                return <></>
        }
    }

  return <>
        <div className={bladeStyles.centeredMask}>


        <div className={bladeStyles.animateTransparentOpeningContainer}>

            <div ref={centerBoxAnimateRef} className={bladeStyles.centerBlockExpand}></div>

            {/* <div id={bladeStyles['marketplaceUnderlay']}  className={` ${bladeStyles.dashboardWhiteUnderlay} ${bladeStyles.marketplaceWhiteUnderlay}  ${current_context_index === 0 ? (bladeStyles.marketplaceWhiteUnderlay + ' ' + bladeStyles.dashboardUnderlayActive) : '' }`} ></div>
            <div id={bladeStyles['xboxliveUnderlay']} className={` ${bladeStyles.dashboardWhiteUnderlay} ${bladeStyles.xboxliveWhiteUnderlay}   ${current_context_index === 1 ? (bladeStyles.xboxliveWhiteUnderlay + ' ' + bladeStyles.dashboardUnderlayActive) : '' }`}></div> */}

            {/* <DashboardSelectUnderlay/>             */}

            {/* <div className={`${(isContextMain =="main_menu") ? bladeStyles.leftEdge : ''}`}></div>
            <div className={`${(isContextMain =="main_menu")  ? bladeStyles.rightEdge : ''}`}></div> */}

        </div>

            <div className={`${bladeStyles.bladeContainer}  ${show_blade_state ? '' : transitionStyles.instantTransparent}`} ref={bladeContainerRef}>
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

                        <div ref={l_gamesBladeActiveRef} id={bladeStyles["gamesBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div id={bladeStyles["gamesBladeLeftInactive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 2 ? transitionStyles.instantTransparent : bladeStyles[`${'leftBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["gamesTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>games</h3> 
                            </div>
                            
                            <div id={bladeStyles["gamesBladeLeftActive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index === 2 ? bladeStyles[`${'gamesActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
                                <h3 id={bladeStyles["gamesTitle"]} className={`${bladeStyles.bladeTitle} ${current_context_index !== 2 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>games</h3>
                            </div>

                        </div>

                        <div  id={bladeStyles["mediaBlade-left"]} className={`${bladeStyles.blade} `} >

                            <div id={bladeStyles["mediaBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 3 ? transitionStyles.instantTransparent : bladeStyles[`${'leftBladeInactive' + selected_theme}`]}`} >
                                <h3 id={bladeStyles["mediaTitleInactiveLeft"]} className={`${bladeStyles.bladeTitle}`}>media</h3> 
                            </div>
                            

                            <div id={bladeStyles["mediaBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 3 ? bladeStyles[`${'mediaActiveBlade' + selected_theme}`] : transitionStyles.instantTransparent}`} >
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


