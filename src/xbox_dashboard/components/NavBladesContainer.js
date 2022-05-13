import React, { useState, useEffect, useLayoutEffect,  useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import { useSwipeable } from 'react-swipeable';
import { navigateTo, 
    selectContextIndex,
    selectXboxPos,
    selectGamesPos,
    selectMediaPos,
    selectSystemPos,
    selectBladeContainerHeight,
    selectBladeSize, 
    updateBladeSize
} from '../xboxSlice';
    
import bladeStyles from "../../styles/BladeStyling.module.css";
import transitionStyles from '../../styles/TransitionStyles.module.css';

const NavBladesContainer = (props) => {

    const { isMobileView } = props;
    
    const dispatch = useDispatch();


    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex) || 0;
    const is_xboxlive_rightside = useSelector(selectXboxPos);
    const is_games_rightside = useSelector(selectGamesPos);
    const is_media_rightside = useSelector(selectMediaPos);
    const is_system_rightside = useSelector(selectSystemPos);

    const container_height = useSelector(selectBladeContainerHeight) || 0;
    const blade_size = useSelector(selectBladeSize) || 0;


    const bladeContainerRef = useRef(null);
    const bladeRef = useRef(null);

    // GSAP Instance Refs
    const bladeContainerTransition = useRef(null);
    const shiftRightTransition = useRef(null);
    const shiftLeftTransition = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceBladeResize = useCallback(
        debounce((fn) => {
            dispatch(fn);
            }, 1000),
            []
    );

    useLayoutEffect(()=>{

        const updateBlade = ()=> {
            if(bladeRef) {
                debounceBladeResize((updateBladeSize(Math.ceil(bladeRef.current.offsetWidth))));
            }
        }

        window.addEventListener("resize", updateBlade);

        updateBlade();

        return ()=> {
            window.removeEventListener("resize", updateBlade);
        }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDispatchInput = useCallback(
        debounce((fn) => {
            dispatch(fn);
        }, 200),
        []
    );

    if(isMobileView) {
        shiftRightTransition.current = gsap.timeline().to(bladeContainerRef.current, {x: "-=17px", duration: 0.3}).pause();
        shiftLeftTransition.current = gsap.timeline().to(bladeContainerRef.current, {x: "+=17px", duration: 0.3}).pause();
    }
    else {
        shiftRightTransition.current = gsap.timeline().to(bladeContainerRef.current, {x: "-=40px", duration: 0.3}).pause();
        shiftLeftTransition.current = gsap.timeline().to(bladeContainerRef.current, {x: "+=40px", duration: 0.3}).pause();
    }



    const shiftRight = () => {
        // bladeContainerTransition.current = {};

        shiftRightTransition.current.play();
    }

    const shiftLeft = () => {
        shiftLeftTransition.current.play();
    }

    const handlers = useSwipeable({
        onSwiped: (eventData) => console.log("User Swiped!", eventData),
      });


    // useLayoutEffect((e)=> {
    //     const navigateUsingSwipe = (e) => {

    //     }
    // });
          


    //Keyboard event listeners
    useLayoutEffect((e)=> {
        const navigateUsingKeys = (e) => {
            if(e !== undefined) {
                switch(e.key) {
                    case "ArrowUp":
                    break;
                    case "ArrowRight":
                        if((current_context_index + 1) < 5) {
                            debounceDispatchInput(shiftRight());
                        }
                    break;
                    case "ArrowDown":
                    break;
                    case "ArrowLeft":
                        if((current_context_index - 1) >= 0) {
                            debounceDispatchInput(shiftLeft());
                        }
                    break;
                    default:
                    break;
                }
            }
        }
        navigateUsingKeys(e);

        window.addEventListener("keydown", navigateUsingKeys);


        return () => {
            window.removeEventListener("keydown", navigateUsingKeys);
        }


    }, [current_context_index, debounceDispatchInput])



  return <>
        <div className={bladeStyles.bladeContainer} {...handlers} ref={bladeContainerRef} >
            <div className={bladeStyles.centeredContent}>
            <div className={bladeStyles.leftGroup}>
                <div id={bladeStyles["marketplaceBlade-left"]} className={`${bladeStyles.blade} `}  >
                    <div className={`${bladeStyles.bladeGroup}`}>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index === 0 ? bladeStyles.marketplaceActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}> 
                        </div>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index !== 0 ? bladeStyles.leftBladeInactive : transitionStyles.instantTransparent}`} ref={bladeRef}> 
                        </div>

                    </div>
                </div>

                <div id={bladeStyles["xboxliveBlade-left"]} className={`${bladeStyles.blade} `} >
                    <div className={`${bladeStyles.bladeGroup}`}>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index < 1 ? transitionStyles.instantTransparent :  bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                        </div>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index === 1 ? bladeStyles.xboxliveActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                        </div>

                    </div>
                </div>

                <div id={bladeStyles["gamesBlade-left"]} className={`${bladeStyles.blade} `} >
                    <div className={`${bladeStyles.bladeGroup}`}>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index < 2 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                        </div>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index === 2 ? bladeStyles.gamesActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                        </div>

                    </div>
                </div>

                <div id={bladeStyles["mediaBlade-left"]} className={`${bladeStyles.blade} `} >
                    <div className={`${bladeStyles.bladeGroup}`}>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index < 3 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                        </div>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index === 3 ? bladeStyles.mediaActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
                        </div>

                    </div>
                </div>

                <div id={bladeStyles["systemBlade-left"]} className={`${bladeStyles.blade} `} >
                    <div className={`${bladeStyles.bladeGroup}`}>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index < 4 ? transitionStyles.instantTransparent : bladeStyles.leftBladeInactive}`} ref={bladeRef}>
                        </div>
                        <div className={`${bladeStyles.bladeImgContainer} ${current_context_index === 4 ? bladeStyles.systemActiveBlade : transitionStyles.instantTransparent}`} ref={bladeRef}>
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
  </>;
};

export default NavBladesContainer;


