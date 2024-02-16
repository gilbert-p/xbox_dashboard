import React, { useLayoutEffect,  useCallback, useRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { 
    selectContextIndex,
    updateBladeSize
} from '../xboxSlice';
import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';

const NavBladesContainer = (props) => {

    const { isMobileView, bladeContainerRef } = props;
    
    const dispatch = useDispatch();


    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex) || 0;



    // dispatch(setBladeAnimationRef(bladeContainerRef));
    const bladeRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceBladeResize = useCallback(
        debounce((fn) => {
            dispatch(fn);
            }, 1000),
            []
    );


    //Blade Resizing
    useLayoutEffect(()=>{

        const updateBlade = ()=> {
            if(bladeRef) {
                debounceBladeResize((updateBladeSize(Math.ceil(bladeRef.current.offsetWidth))));
            }
        }

        window.addEventListener("resize", updateBlade);

        // updateBlade();

        return ()=> {
            window.removeEventListener("resize", updateBlade);
        }
    });   


  return <>
        <div className={bladeStyles.centeredMask}>

            <div className={bladeStyles.bladeContainer} ref={bladeContainerRef}>
                <div className={bladeStyles.centeredContent}>
                <div className={bladeStyles.leftGroup}>


                    <div id={bladeStyles["marketplaceBlade-left"]} className={`${bladeStyles.blade} `}  >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div id={bladeStyles["marketplaceBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 0 ? bladeStyles.marketplaceActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}> 
                            </div>
                            <h3 className={`${bladeStyles.bladeTitle} ${current_context_index === 0 ? '' : transitionStyles.instantTransparent}`} ref={bladeRef}>marketplace</h3>


                            <div id={bladeStyles["marketplaceBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index !== 0 ? bladeStyles.leftBladeInactive : transitionStyles.instantTransparent}`} ref={bladeRef}> 
                            </div>

                        </div>
                    </div>

                    <div id={bladeStyles["xboxliveBlade-left"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div id={bladeStyles["xboxliveBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 1 ? transitionStyles.instantTransparent :  bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                            </div>
                            <h3 className={`${bladeStyles.bladeTitle} ${current_context_index !== 1 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>xbox live</h3>


                            <div id={bladeStyles["xboxliveBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 1 ? bladeStyles.xboxliveActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                            </div>

                        </div>
                    </div>

                    <div id={bladeStyles["gamesBlade-left"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div id={bladeStyles["gamesBladeLeftInactive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 2 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                            </div>
                            <h3 className={`${bladeStyles.bladeTitle} ${current_context_index !== 2 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>games</h3>
                            
                            <div id={bladeStyles["gamesBladeLeftActive"]}  className={`${bladeStyles.bladeImgContainer} ${current_context_index === 2 ? bladeStyles.gamesActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                            </div>

                        </div>
                    </div>

                    <div id={bladeStyles["mediaBlade-left"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div id={bladeStyles["mediaBladeLeftInactive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 3 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                            </div>
                            <h3 className={`${bladeStyles.bladeTitle} ${current_context_index !== 3 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>media</h3>

                            <div id={bladeStyles["mediaBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 3 ? bladeStyles.mediaActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                            </div>

                        </div>
                    </div>

                    <div id={bladeStyles["systemBlade-left"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index <= 4 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                            </div>
                            <h3 className={`${bladeStyles.bladeTitle} ${current_context_index !== 4 ? transitionStyles.instantTransparent :  ''}`} ref={bladeRef}>system</h3>
                            <div id={bladeStyles["systemBladeLeftActive"]} className={`${bladeStyles.bladeImgContainer} ${current_context_index === 4 ? bladeStyles.systemActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                            </div>

                        </div>
                    </div>    
                </div>
                <div className={bladeStyles.rightGroup}>
                <div id={bladeStyles["xboxliveBlade-right"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 1 ? transitionStyles.instantTransparent : bladeStyles.rightBladeInactive}`} ref={bladeRef}>
                        </div>

                        </div>
                    </div>

                    <div id={bladeStyles["gamesBlade-right"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 2 ? transitionStyles.instantTransparent : bladeStyles.rightBladeInactive}`} ref={bladeRef}>
                        </div>

                        </div>
                    </div>

                    <div id={bladeStyles["mediaBlade-right"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 3 ? transitionStyles.instantTransparent : bladeStyles.rightBladeInactive}`} ref={bladeRef}>
                        </div>

                        </div>
                    </div>

                    <div id={bladeStyles["systemBlade-right"]} className={`${bladeStyles.blade} `} >
                        <div className={`${bladeStyles.bladeGroup}`}>
                            <div className={`${bladeStyles.bladeImgContainer} ${current_context_index >= 4 ? transitionStyles.instantTransparent : bladeStyles.rightBladeInactive}`} ref={bladeRef}>
                        </div>

                        </div>
                    </div>
                </div>
                </div>

            

            </div>


        </div>

  </>;
};

export default NavBladesContainer;


